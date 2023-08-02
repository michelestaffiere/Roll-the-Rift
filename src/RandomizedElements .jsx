import { useState, useEffect } from "react";


const RandomizedElements  = () =>{

  //  intial fetch results 
    const [champions , setChampions] = useState([]);
    const [championLoading, setChampionLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);

    const [runes, setRunes] = useState ([]);
    const [runesLoading, setRunesLoading] = useState(true);

    const [version , setVersion] = useState("");
    const [versionLoading, setVersionLoading] = useState(true);

    // filtered fetch results
    const getLatestVersion = async () =>{
      const versionFetch = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      if (versionFetch.ok){
        const versionData = await versionFetch.json();
        const latestVersion = versionData[0];
        setVersion(latestVersion);
      } else{
        alert("Failed to connect to riot servers, please try again later.")
      }
      setVersionLoading(false);
    };
 
    const championsFetch = async () => {
        const dataFetch = await fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json");
        if(dataFetch.ok){
          const response = await dataFetch.json();
          console.log(response);
          const championObejct = response.data;
          setChampions(championObejct);
        } else {
          alert('Failed to connect to riot servers, please try again later.')
        }
        setChampionLoading(false);
      };

      const runesFetch = async () => {
        const dataFetch =  await fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/runesReforged.json");
        if(dataFetch.ok){
          const response = await dataFetch.json();
          const championObejct = response;
          setRunes(championObejct);
        } else{
          alert("Failed to connect to riot server, please try again later.")
        }
        setRunesLoading(false);
      };

      const itemsFetch = async () => {
        const dataFetch =  await fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/item.json");
        if(dataFetch.ok){
          const response = await dataFetch.json();
          console.log(response)
          const itemObject = response;
          setItems(itemObject);
        }
        setItemsLoading(false);
      };

    // getting the latest version and setting state.
      useEffect(()=>{
       getLatestVersion();
      },[])

    // once version is aquired, grab latest info on items,champions and runes.
    useEffect(()=>{
      if(version !== ""){
       itemsFetch();
       runesFetch();
       championsFetch();
      }
    },[version])

  // once all data collected parse it to make it useable
    useEffect(()=>{
      let allItems = [];
      for (const itemID in items.data){
        //console.log(itemID);
        const item = items.data[itemID];
        // actual buildable items in normal and ranked games

        if( 
            item.hasOwnProperty('requiredAlly') === false &&
            item.hasOwnProperty('requiredChampion') === false &&
            item.maps[11] && 
            (item.hasOwnProperty("inStore") === false) &&
            (item.tags.includes("Consumable") === false) &&
            (item.tags.includes("Trinket") === false) &&
            (item.tags.includes("Lane") === false) &&
            (item.tags.includes("Jungle") === false)
            )
            {
        allItems.push(item);
        };
      }
      //console.log(allItems); 

      // these item arrays might have to be stored in state. 

      let mythicItems = [];
      let boots = [];
      let regularItems = [];

      // boots
      for(let item in allItems){
        const focusedItem = allItems[item];
        const tags = focusedItem.tags;
        //console.log(tags);
        if(tags.includes('Boots')){
          boots.push(focusedItem);
        }
      }

      // mythicItems

      // regularItems
    },[champions,items,runes])

  return null;
}

export  default RandomizedElements 