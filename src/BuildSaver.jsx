import { useEffect,useState } from 'react';
import {collection, addDoc, getDocs,doc } from '@firebase/firestore'
import db from "./Firebase"


const savedBuildsDuringSession = [];
const BuildSaver = ({savedChamp, savedItems,ver}) =>{
    // states
    const [userReference, setRef]=useState("");
    const [collectionReference, setCollection]=useState("");
    

    const savedLoadoutCollectionName = "builds";
    const dbRootName = "users";

    // create reference to users database paths
    const handleCreatingFirestoreReference = async () => {
        if(userReference===""){
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

    const handleSaveToFirestore = async () =>{  
        //get most recent loadOut 
        let mostRecentSave = savedBuildsDuringSession[savedBuildsDuringSession.length -1];
        let savesInFirestore = await handleGetData();

         // compare entries in db to sessions saved array to avoid saving duplicates to the db.

         const mostRecentExistsInDb = savesInFirestore.some(existingSave =>{
            return Object.keys(mostRecentSave).every(
                key => mostRecentSave[key] === existingSave[key]
            );
         });
         if(!mostRecentExistsInDb){
             try{
                 await addDoc(collectionReference,mostRecentSave);
     
             }catch(error){
                 console.log('error encounterd: ',error);
             }
         } else{
            alert('You already saved this build! Go forth summoner!')
         }
     
    };
    const handleGetData = async () =>{
        if(!userReference){
           return null
        }

        const buildsCollection = collection(userReference,'builds');
        const buildDocuments = await getDocs(buildsCollection);
        const builds = []
        buildDocuments.forEach(async (doc)=>{
            let data =  await doc.data()
            if(!builds.includes(data.key)){
                builds.push(data);
            }
        });
        return builds
       }

 
    // saves the loadOut to an array and updates savedBuilds State
    const handleSaveClick = () =>{
        let savedLoadout = {
            champion:`${savedChamp[0].id}`,
            championImg:`${savedChamp[0].img}`,
            item1:`${savedItems[0].image.full}`,
            item2:`${savedItems[1].image.full}`,
            item3:`${savedItems[2].image.full}`,
            item4:`${savedItems[3].image.full}`,
            item5:`${savedItems[4].image.full}`,
            item6:`${savedItems[5].image.full}`
        }
        const isDuplicate =  savedBuildsDuringSession.some(build =>
                Object.keys(build).every(key =>
                    build[key] === savedLoadout[key]
                )
            );
        if(!isDuplicate){
            savedBuildsDuringSession.push(savedLoadout);
            console.log('not a duplicated, added to array')
            }
            handleSaveToFirestore();
            handleGetData();
        };    

        useEffect(()=>{
            handleCreatingFirestoreReference();
        },[])

    return(
        <>
            <button onClick={handleSaveClick}>Save Build</button>
        </>
    
    )
};

export default BuildSaver