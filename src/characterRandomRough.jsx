import { useState, useEffect } from 'react'

const Randomizer = () =>{
    const [champions, setChampions] = useState([]);
    const [randomChamp, setRandom] = useState("");
    const [loading , setLoading] = useState(true);

    const championFetch = async () => {
      const dataFetch = await fetch("https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json");
      const championJson = await dataFetch.json();
      const championObejct = championJson.data;
      setChampions(championObejct);
      setLoading(false);
    };
    
    const randomNumberGenerator = (array) =>{
      const randomInt = Math.floor(Math.random() * array.length);
      return randomInt;
    }
    
    useEffect(() =>{
      championFetch();
      },[]);
      
      const randomChampion = () =>{
        if(loading === false){
          const championNames = Object.keys(champions);
          const randomKey = Math.floor(Math.random()* championNames.length)
          const randomChampion = championNames[randomKey];
          setRandom(randomChampion);
        }
      };

  return(

    <>
     <div className='characterBox'>
      <button onClick={randomChampion}>Roll the Dice!</button>
      <p>{randomChamp}</p>
      <img src={` https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${randomChamp}.png`}  alt={`${randomChamp}`} />
     </div>
    </>
  )
};




export default Randomizer;