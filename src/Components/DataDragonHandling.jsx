import { useState, useEffect } from "react";
// note, api is called Data dragon so instead of ApiCall -> DragonCall 😎
const DragonCall = () =>{
    // states
     const [champions,setChampions] = useState([]);
     const [items,setItems] = useState([]);
     const [version,setVersion] = useState([]);
     const [versionStatus , setVersionStatus] = useState(true);
     
     // latestVersion - gets the most recent patch from data dragon
     const latestVersion = async () =>{
        const versionFetch = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
        if (versionFetch.ok){
          const versionData = await versionFetch.json();
          const latestVersion = versionData[0];
          setVersion(latestVersion);
        } else{
          alert("Failed to connect to riot servers, please try again later.")
        }
        setVersionStatus(false);
      };
    
    // championFetch - gets the entire champion Object from data dragon
      const championFetch = async () => {
        const dataFetch = await fetch("https://ddragon.leagueoflegends.com/cdn/"+ version + "/data/en_US/champion.json");
        if(dataFetch.ok){
            const championJson = await dataFetch.json();
            const championObejct = championJson.data;
            setChampions(championObejct);
        } else{
            alert("Failed to connect to riot servers, please try again later.")
        }
       
      };
    // ItemFetch - gets the entire item object from data dragon
      const itemsFetch = async () => {
        const dataFetch =  await fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/item.json");
        if(dataFetch.ok){
          const response = await dataFetch.json();
          const itemObject = response;
          setItems(itemObject);
        } else{
            alert('Failed to connect to riot servers, please try again later.')
        }
      };
      // getting the latest patch first and foremost.
    useEffect(()=>{
        latestVersion();
    },[]);
    // once versionStatus changes and is properly set to false, get latest champion and item object.
    useEffect(()=>{
        if(!versionStatus){
            championFetch();
            itemsFetch();
        }
    },[versionStatus])
    return [champions, items, version]
};
export default DragonCall;