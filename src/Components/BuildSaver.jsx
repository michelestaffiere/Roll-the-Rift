import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc } from '@firebase/firestore';
import db from "./Firebase";

const savedBuildsDuringSession = [];

const BuildSaver = ({ savedChamp, savedItems, ver }) => {
  //states
  const [userReference, setRef] = useState("");
  const [collectionReference, setCollection] = useState("");
  const [dataFromFirestore, setFirestore] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  
  // Component scope variables 
  const savedLoadoutCollectionName = "builds";
  const dbRootName = "users";
  let championImgEndpoint = `https://ddragon.leagueoflegends.com/cdn/${ver}/img/champion/`;
  let itemImgEndpoint = `https://ddragon.leagueoflegends.com/cdn/${ver}/img/item/`;
  
 


  const handleCreatingFirestoreReference = async () => {
    // creates the users reference to firestore if none exists.
    if (userReference === "") {
      try {
        const userPathway = await addDoc(collection(db, dbRootName), {});
        const userDoc = userPathway._key.path.segments[1];
        const userDocRef = doc(db,dbRootName,userDoc);
        setRef(userDocRef);

        const userCollection = collection(userDocRef,savedLoadoutCollectionName);

        setCollection(userCollection);

      } catch (error) {
        console.error('Error creating user reference:', error);
      }
    }
  };

  // create a function that stores userDoc to local storage so we can look for it later on to make the connection to the database.

  const stateToLocalStorage = () =>{
      const userDoc = userReference._key.path.segments[1];
      localStorage.setItem("userKey",userDoc);
  };

  // create a function that reads local storage
  // gets the object from local storage and uses it to create a db reference to the users id
  // sets sessions states to the users firestore reference

  const localStorageToState = () =>{
    // gets localstorage object and builds connection to firestore.
    const userDoc = localStorage.getItem("userKey");
    const userDocRef = doc(db,dbRootName,userDoc);
    setRef(userDocRef);

    const userCollection = collection(userDocRef,savedLoadoutCollectionName);

    setCollection(userCollection);
  };

  const handleSaveToFirestore = async () => {
    // Saves to the users point in the database.
    let mostRecentSave = savedBuildsDuringSession[savedBuildsDuringSession.length - 1];

    let savesInFirestore = await handleGetData();

    const mostRecentExistsInDb = savesInFirestore.some(existingSave =>
      Object.keys(mostRecentSave).every(
        key => mostRecentSave[key] === existingSave[key]
      )
    );

    if (!mostRecentExistsInDb) {
      try {
        await addDoc(collectionReference, mostRecentSave);
        setFirestore([...dataFromFirestore, mostRecentSave]);
      } catch (error) {
        console.log('error encounterd: ', error);
      }
    } else {
      alert('You already saved this build! Go forth summoner!');
    }
  };

  const handleGetData = async () => {
    //helper function that retrieves the data from the users point in the database
    if (!userReference) {
      return [];
    }

    const buildsCollection = collection(userReference, 'builds');
    const buildDocuments = await getDocs(buildsCollection);
    const builds = [];

    buildDocuments.forEach(doc => {
      builds.push(doc.data());
    });
    return builds;
  };
  const handleFindingSavedBuildsFromFireStore = async () =>{
    const updatedData = await handleGetData();
    setFirestore(updatedData);
  }

  const handleSaveClick = async () => {
    let savedLoadout = {
      champion: `${savedChamp[0].id}`,
      championImg: `${savedChamp[0].img}`,
      item1: `${savedItems[0].image.full}`,
      item2: `${savedItems[1].image.full}`,
      item3: `${savedItems[2].image.full}`,
      item4: `${savedItems[3].image.full}`,
      item5: `${savedItems[4].image.full}`,
      item6: `${savedItems[5].image.full}`
    };

    const isDuplicate = savedBuildsDuringSession.some(build =>
      Object.keys(build).every(key =>
        build[key] === savedLoadout[key]
      )
    );

    if (!isDuplicate) {
      savedBuildsDuringSession.push(savedLoadout);
      console.log('not a duplicate, added to array');
    }

    await handleSaveToFirestore();
    handleFindingSavedBuildsFromFireStore();
  };

//Run on Mount
  useEffect(() => {
    if(userReference === "" && localStorage.getItem("userKey") === null ){
      handleCreatingFirestoreReference();
    } else if(userReference === "" && localStorage.getItem("userKey") !== null){
      localStorageToState();
    }
    setPageLoad(false);
  }, []);

//Run after initial mount
useEffect(()=>{
  if(userReference !== "" && localStorage.getItem("userKey") === null){
    stateToLocalStorage();
  }else{
    handleFindingSavedBuildsFromFireStore();
  }
},[userReference])


  
    return( 
        <>
        <button onClick={handleSaveClick}>Save Build</button>
        {dataFromFirestore === null ? <h2>Nothing saved!</h2> : (
          <>
          <h2>SAVED BUILDS</h2>
          <div className='savedBuilds'>
              {dataFromFirestore.map((item, index) => (
                  <div className='loadOut' key={index}>
                      <div className='savedChampion'>
                          <img src={championImgEndpoint+item.championImg} alt={item.champion}/>
                      </div>
                      <div className='savedItemSet'>
                          <ul>
                              <li>
                                  <img src={itemImgEndpoint+item.item1} alt={"img code "+item.item1} />
                              </li>
                              <li>
                                  <img src={itemImgEndpoint+item.item2} alt={"img code "+item.item2} />
                              </li>
                              <li>
                                  <img src={itemImgEndpoint+item.item3} alt={"img code "+item.item3} />
                              </li>
                              <li>
                                  <img src={itemImgEndpoint+item.item4} alt={"img code "+item.item4} />
                              </li>
                              <li>
                                  <img src={itemImgEndpoint+item.item5} alt={"img code "+item.item5} />
                              </li>
                              <li>
                                  <img src={itemImgEndpoint+item.item6} alt={"img code "+item.item6} />
                              </li>
                          </ul>
                      </div>
                  </div>
              ))}
          </div>
        </>
        )}
    </>
    );
};

export default BuildSaver;


