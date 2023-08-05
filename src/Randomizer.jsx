import { useState, useEffect } from "react";
import DragonCall from "./DataDragonHandling";

const DataParser = () =>{
    //states
    const [champions, setChamps] = useState([]);
    const [items, setItems] = useState([]);
    const [ver, setVer] = useState("");
    const [loadingAPI, setApiLoading] = useState(true);
    const [loadingParsedData , setParsedData] = useState(true);


    const [champFinal , setChampFinal] = useState([]);
    const [itemsFinal, setItemsFinal] = useState([]);

    // destruct Api Call.
    const [champData , itemData, versionNumber] = DragonCall();

  useEffect(()=>{
    if(Object.keys(champData).length > 0 && Object.keys(itemData).length > 0 && versionNumber !== ""){
        setChamps(champData);
        setItems(itemData);
        setVer(versionNumber);
        setApiLoading(false);
    }
   
  },[champData,itemData,versionNumber]);

  useEffect(()=>{
    if(!loadingAPI){
      // getting needed champion data from api object
      const parsedChampions = [];

      const champKeys = Object.keys(champions);
      champKeys.forEach((key)=>{
        const champion = champions[key];
        const data ={
          'name': `${champion.name}`,
          'title': `${champion.title}`,
          'key': `${champion.key}`,
        }
        parsedChampions.push(data);
      });

      // getting needed item data from api object
      const parsedItems = [];

      const itemKeys = Object.keys(items.data);
      itemKeys.forEach((key)=>{
        const item = items.data[key];
        if(
          (Object.prototype.hasOwnProperty.call(item, 'requiredAlly') === false) &&
          (Object.prototype.hasOwnProperty.call(item, 'requiredChampion') === false) &&
          (Object.prototype.hasOwnProperty.call(item, 'inStore') === false) &&  
          (item.maps[11] == true) &&
          (item.tags.includes("Consumable") === false) &&
          (item.tags.includes("Trinket") === false) &&
          (item.tags.includes("Lane") === false) &&
          (item.tags.includes("Jungle") === false)
          )
          {
           parsedItems.push(item);
        }
      });
    setChampFinal(parsedChampions);
    setItemsFinal(parsedItems);
    setParsedData(false);
    }
  },[loadingAPI]);
 return [champFinal,itemsFinal]
};


// actual randomizer function - takes in two arrays and returns a random champion and 6 random items.
const rtd = (champArray,itemArray) =>{
  const items = [];
  const champion = [];
  let mythic = false;
  let boots = false;

 //WORKS RANDOM CHAMPION//
  let randomIndex = Math.floor(Math.random()*champArray.length);
  champion.push(champArray[randomIndex]);


 //RANDOM ITEMS

 while (items.length < 6) {
   let randomIndex = Math.floor(Math.random() * itemArray.length);
   let randomItem = itemArray[randomIndex];
  
   if(
    !boots && 
    Object.prototype.hasOwnProperty.call(randomItem.tags,'Boots') &&
    !Object.prototype.hasOwnProperty.call(randomItem, 'Into')
    ){
    items.push(randomItem);
    boots = true;
   } else if(
    boots === true &&
    !mythic &&
    !Object.prototype.hasOwnProperty.call(randomItem.tags, 'Boots') &&
    randomItem.description.indexOf('Mythic') !== -1 ||
    randomItem.description.indexOf('Mythic Passive') !== -1 
   ){
    items.push(randomItem);
   } else if(
    !Object.prototype.hasOwnProperty.call(randomItem, 'Into')
   ){
    items.push(randomItem);
   }
 }
 console.log(items);
};


const Randomizer = () =>{
  const [c,i] = DataParser();
  const [champs,setChamps] = useState([]);
  const [items, setItems] = useState([]);


  useEffect(()=>{
  setChamps(c);
  setItems(i)
  },[c,i]);

return (
  <>
 {champs.length === 0 ? <div><p>Loading the rift!</p><img src="/src/assets/loading-app.gif" alt="Loading Walk" /></div>:
 
 <section className="randomizerContainer">
      <button onClick={()=>{rtd(champs,items)}}>Roll the dice!</button>




      <div className="randomizedData">
        <div className="championImg">
          <img src="" alt="" />
        </div>
        <img src="" alt="" />
        <div className="championInfo">
          <h2>{}</h2>
          <p>{}</p>
        </div>
        <div className="items">
          {/* map through the items array here to display to page. */}
        </div>
      </div>
    </section>
    }
  </>
)
};
export default Randomizer