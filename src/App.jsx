import { useState, useEffect } from 'react'
import CharacterRandomizer from './ChampionRandomizer'
import RandomizedElements  from './RandomizedElements '
import './App.css'

function App() {
//   const [count, setCount] = useState(0)
//   const [champions , setChampions] = useState([]);
//   const [runes , setRunes] = useState([]);
//   const [loadingData , setLoading] = useState(true);
  

//   // break this into component? 
// // grabs all champions 
// const championFetch = async () => {
//   const dataFetch = await fetch("https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json");
//   const championJson = await dataFetch.json();
//  return championJson.data
// };

// //grabs all runes
// const runeFetch = async () =>{
//   const dataFetch =  await fetch("https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/runesReforged.json");
//   const runesJson = await dataFetch.json();
//   return runesJson
// }


// // updates the states of the runes and champions array.
// useEffect(() =>{
//   const fetchData = async () =>{
//     const fetchedChampions = await championFetch();
//     const fetchedRunes = await runeFetch();
//     setChampions(fetchedChampions);
//     setRunes(fetchedRunes);
//     setLoading(false);
//   };
//   fetchData();
// },[]);
// // -----------------------------------------

// // mocking up how to access the data from the runes object.
// useEffect(()=>{
//   if (!loadingData){
//     let ranNum = Math.floor(Math.random()*5);
//     let ranKeyRune = runes[ranNum].slots; // placeholder of randomly selected rune
//     const storedRunes = [];
//     ranKeyRune.forEach((slot)=>{
//       //console.log(slot.runes.length);
//       let randomRuneIndex = (Math.floor(Math.random()* slot.runes.length));
//       let randomRune = slot.runes[randomRuneIndex];
//       // To properly access the random rune from each slot,  first access the runes array within the slot and then get the random rune using the randomRune index. 
//       storedRunes.push(randomRune);
//     });
//     console.log(storedRunes);
//   }
// },[loadingData,runes]);

// console.log(champions);


// // STACK OVER FLOW LINK FOR RUNE ICON IMGS : https://stackoverflow.com/questions/68467800/how-to-request-rune-png-from-riot-api


// //todo
// // MVP: create a component that takes care of the initial api call and stores data.
//   // exports data to be taken as props elsewhere?

// // MVP: create a component that handles selecting a random champion and runeset and item set.
//     // randomizer -> takes in api return as props?

// // MVP: create a component keeps track of last randomized setup (sidebar?)
//     // takes the last randomized setup as props?

// // Stretch: create a component that handles preference filtering
//   // only return champions that have matching tags (fighter,tank etc.).
//   // cant have the same champion back to back. 
//   // Win Lose trackers (manual +/- button) -> WR% of session.












 return (
    <>
    {/* <CharacterRandomizer />  */}
    <RandomizedElements  />
    </>
  )
}

export default App
