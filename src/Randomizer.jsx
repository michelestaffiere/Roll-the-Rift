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
          'title': `${champion.title}`,S
          'key': `${champion.key}`,
          'img' : `${champion.image.full}`
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
 return [champFinal,itemsFinal,versionNumber]
};


// actual randomizer function - takes in two arrays and returns a random champion and 6 random items.
const rtd = (champArray, itemArray, setRanChamp , setRanItems) => {
  const items = [];
  const champion = [];
  // Random Champion
  let randomIndex = Math.floor(Math.random() * champArray.length);
  champion.push(champArray[randomIndex]);

  
  //Random Boots
  const bootsItems = itemArray.filter(item => item.tags.includes('Boots') && !Object.prototype.hasOwnProperty.call(item, 'into'));
  let randomBootIndex =  Math.floor(Math.random() * bootsItems.length);
  let randomBoot = bootsItems[randomBootIndex];
  items.push(randomBoot);

  // Random Mythics
  const mythicItems = itemArray.filter(item => 
    item.description.includes('Mythic') ||
    item.description.includes('mythic') ||
    item.description.includes('Mythic passive') ||
    item.description.includes('Mythic Passive'));
  let randomMythicIndex = Math.floor(Math.random() * mythicItems.length);
  let randomMythic = mythicItems[randomMythicIndex];
  items.push(randomMythic);
  // Random legendary Items
  while (items.length < 6) {
    randomIndex = Math.floor(Math.random() * itemArray.length);
    const randomItem = itemArray[randomIndex];
    const hasInto = Object.prototype.hasOwnProperty.call(randomItem, 'into');
    const hasBootsTag = randomItem.tags.includes('Boots');
    const hasMythicDecsirption =  
    randomItem.description.includes('Mythic') ||
    randomItem.description.includes('mythic') ||
    randomItem.description.includes('Mythic passive') ||
    randomItem.description.includes('Mythic Passive');

    if(!hasInto && !hasBootsTag && !hasMythicDecsirption){
      items.push(randomItem);
    }
  }
  setRanChamp(champion);
  setRanItems(items);
  // console.log(champion)
  // console.log(items);
};


const Randomizer = () => {
  const [c, i, v] = DataParser();
  const [champs, setChamps] = useState([]);
  const [items, setItems] = useState([]);
  const [version, setVersion] = useState([]);
  const [randomChamp, setRanChamp] = useState([]);
  const [randomItems, setRanItems] = useState([]);
  

  useEffect(() => {
    setChamps(c);
    setItems(i);
    setVersion(v)
  }, [c, i, v]);

  const handleRollClick = () => {
    rtd(champs, items, setRanChamp, setRanItems);
  };

  const handleRandomDisplay = (randomChamp,randomItems) =>{
  let champ = randomChamp;
  let items = randomItems;
  let imgEndPoint = "https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/" ;
    return(
      <div className="randomizedData">
            <div className="championImg">

            </div>
            <div className="championInfo">
              <h2>{champ[0].name}</h2>
              <p>{champ[0].title}</p>
              <img src={imgEndPoint + champ[0].img} alt={`${champ[0].name} has been rolled`}/>
            </div>
            <div className="items">
              <ul>
                {
                  items.map((item)=>{
                    let endpoint = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                    return(
                        <li>
                          <img src={endpoint} alt={item.name} />
                        </li>
                    )
                  })
                }
              </ul>
              </div>
          </div>
    )
  };
  return (
    <>
      {champs.length === 0 ? (
        <div>
          <h2>Loading the rift!</h2>
          <img src="/src/assets/loading-app.gif" alt="Loading Walk" />
        </div>
      ) : (
        <section className="randomizerContainer">
          <button onClick={handleRollClick}>Roll the dice!</button>
          { randomChamp.length ===  0 ? (
            <h2>Getting Spicy</h2>
          ) : (
            <> 
            {handleRandomDisplay(randomChamp,randomItems)}
            </>
          )}
        </section>
      )}
    </>
  );
};
export default Randomizer