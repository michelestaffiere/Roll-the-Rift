import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from '@firebase/firestore';
import db from "./Firebase";

const savedBuildsDuringSession = [];

const BuildSaver = ({ savedChamp, savedItems, ver }) => {
  //states
  const [userReference, setRef] = useState("");
  const [collectionReference, setCollection] = useState("");
  const [dataFromFirestore, setFirestore] = useState([]);
  const [buildsFlag, setFlag] = useState(0);

  // variables 
  const savedLoadoutCollectionName = "builds";
  const dbRootName = "users";
  let championImgEndpoint = `https://ddragon.leagueoflegends.com/cdn/${ver}/img/champion/`;
  let itemImgEndpoint = `https://ddragon.leagueoflegends.com/cdn/${ver}/img/item/`;

  const handleCreatingFirestoreReference = async () => {
    if (userReference === "") {
      try {
        const userPathway = await addDoc(collection(db, dbRootName), {});
        setRef(userPathway);

        const userBuildCollection = collection(userPathway, savedLoadoutCollectionName);
        setCollection(userBuildCollection);

      } catch (error) {
        console.error('Error creating user reference:', error);
      }
    }
  };

  const handleSaveToFirestore = async () => {
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
    if (!userReference) {
      return [];
    }

    const buildsCollection = collection(userReference, 'builds');
    const buildDocuments = await getDocs(buildsCollection);
    const builds = [];

    buildDocuments.forEach(doc => {
      builds.push(doc.data());
    });

    console.log('data retrieved');
    return builds;
  };

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
    const updatedData = await handleGetData();
    setFirestore(updatedData);
    setFlag(buildsFlag + 1);
  };

  useEffect(() => {
    handleCreatingFirestoreReference();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetData();
      setFirestore(data);
      console.log('state updated');
    };

    fetchData();
    console.log('firestore updated.');
  }, [buildsFlag]);

  
    return( 
        <>
        <button onClick={handleSaveClick}>Save Build</button>
        {dataFromFirestore === null ? <h2>Nothing saved!</h2> : (
        <div className='savedBuilds'>
            {dataFromFirestore.map((item, index) => (
                <div key={index}>
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
        )}
    </>
    );
};

export default BuildSaver;


