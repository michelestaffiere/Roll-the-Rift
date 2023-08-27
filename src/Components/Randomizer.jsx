import React, { useState, useEffect, cloneElement } from "react";
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
          'img' : `${champion.image.full}`,
          'id' : `${champion.id}`
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
const rtd = (champArray, itemArray, setRanChamp , setRanItems, userSelection) => {
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
    // checking for dupes.
    if(!hasInto && !hasBootsTag && !hasMythicDecsirption && !items.includes(randomItem)){
      items.push(randomItem);
    }
  }
  setRanChamp(champion);
  setRanItems(items);

};


const Randomizer = ({userChoice, children}) => {
  const [c, i, v] = DataParser();
  const userSelectedChampions = userChoice;
  const [champs, setChamps] = useState([]);
  const [items, setItems] = useState([]);
  const [version, setVersion] = useState([]);
  const [randomChamp, setRanChamp] = useState([]);
  const [randomItems, setRanItems] = useState([]);
  const [phrase,setPhrase] = useState("");
  

  useEffect(() => {
    setChamps(c);
    setItems(i);
    setVersion(v)
  }, [c, i, v]);

  const phrases = [
      "Good luck... you'll need a miracle",
      "oof, tough roll, like getting Sion support",
      "Well, it could have been worse! You could've been autofilled jungle",
      "LMAO, get ready to lose LP, like a Yasuo on your team",
      "That's a rough one, your KDA will make Teemo proud",
      "This looks fun... for the enemy team",
      "Try not to smash your keyboard, they're not cheap",
      "May the odds be ever in your favor, unlikely though",
      "Here comes the challenge, as if facing Darius wasn't enough",
      "Buckle up, it's gonna be a wild feed",
      "Prepare for battle! Or just embrace defeat",
      "You've been warned, but you'll probably still int",
      "Show your skills, or lack thereof",
      "Let the chaos begin, watch your team's positioning crumble",
      "Incoming chaos! Get ready for pings galore",
      "Hold on tight! You'll need a grip stronger than Darius' grip on Noxus",
      "Get ready for some intense disappointment",
      "This one's gonna test your limits, mostly your patience",
      "Time to shine or crumble under pressure, let's be honest, it's the latter",
      "Good luck with that, like expecting teammates to peel",
      "Hope you've been practicing! Or don't, it won't matter",
      "Anticipate the inevitable, like a Yasuo diving turret",
      "Show 'em what you've got, or what you don't got",
      "Just try not to embarrass yourself, or do, it's amusing",
      "Don't let the tilt consume you! Or do, it's entertaining",
      "It's all about the mental game now, too bad your mental is weaker than a caster minion's",
      "Remember, it's just a game, but you're probably gonna lose",
      "Time to channel your inner Faker, or feed like a Bronzodia",
      "Victory or defeat, either way, it won't be your doing",
      "You may as well dodge this game",
      "Just do your best to not run it down okay?",
      "LOL",
      "They don't know you son! they don't know you!",
      "If a full crit Garen is considered meta than this should be fine",
      "if full tank J4 top can work then so should this right?",
      "-13LP"

    ];
    const randomPhraseHandling = (array) =>{
      const randomIndex = Math.floor(Math.random() * array.length)
      const randomPhrase = array[randomIndex];
      setPhrase(randomPhrase);
    }
  const handleRollClick = () => {
    if (userSelectedChampions.length === 0){
      rtd(champs, items, setRanChamp, setRanItems);
      randomPhraseHandling(phrases)
    } else{
      rtd(userSelectedChampions, items, setRanChamp, setRanItems);
      randomPhraseHandling(phrases)
    }
  };

  const handleRandomDisplay = (randomChamp,randomItems,version) =>{
  let champ = randomChamp;
  let items = randomItems;
  let imgEndPoint = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/`;
    return(
      <div className="randomizedData">
        <div className="grid1">
          <div className="championInfo">
              <div className="championImg">
                <img src={imgEndPoint + champ[0].id +`_0.jpg`} alt={`${champ[0].name} has been rolled`}/>
              </div>
              <div className="championDetails">
                <h2>{champ[0].name}</h2>
              </div>
          </div>
          <div className="items">
              <p>{phrase}</p>
              <ul>
                {
                  items.map((item)=>{
                    let endpoint = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                    return(
                        <li key={item.name}>
                          <img src={endpoint} alt={item.name} />
                        </li>
                      )
                    })
                  }
                </ul>
          </div>
        </div>
          <div className="grid2">
            <div className="buildSaver">
              {React.cloneElement(children, { savedChamp: champ, savedItems: items, ver:version})}
              {/* to pass down props to this child component i needed to clone it then pass it the props declared. */}
            </div>
        </div>
      </div>
    )
  };


  return (
    <>
      {champs.length === 0 ? (
        <div className="loadingStartUp">
          <h2>Loading the rift!</h2>
          <img src="/loading-app.gif" alt="Loading Walk" />
        </div>
      ) : (
        <>
        <div className="randomizerContainer">
        <button onClick={handleRollClick}>Roll the dice!</button>
          { 
          randomChamp.length ===  0 ? 
          (
            <div className="greeting">
              <h1>Welcome to <span className="header">Roll The Rift!</span></h1>
              <p>RTR is a true random load out randomizer for Leauge of legends</p>
              <p>No one is safe and you will most certainly get a very wacky build, but thats the whole point!</p>
              <p>RTR will generate for you a item set and champion to play, by default all champions will be thrown into the pool of possible outcomes. If you dont have all champions unlocked or only want to randomly generate loadouts for a select few champions then click on their portraits on the left. to narrow down who gets thrown into the mix. </p>

              <p>unlike other randomizers you dont get to pick which lane you are playing and by default you will be given a random jungle item to start with if are looking to play jungle or get filled into that role - if you arent playing jungle then you can ignore said item</p>
            </div>
          ) :
          (
            <> 
            {handleRandomDisplay(randomChamp,randomItems,version)}
            </>
          )}
        </div>
        </>
      )}
    </>
  );
};
export default Randomizer