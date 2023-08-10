import { useState, useEffect } from "react";
import DragonCall from "./DataDragonHandling";

const ChampionSelector= ({setState}) =>{
    
    //getting champion and version information.
    const [champions, items, version] = DragonCall();
    // states
    const [champs,setChampions] = useState([]);
    const [championNames, setNames] = useState([]);
    const [ver, setVersion] = useState([]);
    const [filteredChampions , setFilter] =useState([]);




    useEffect(()=>{
        if(Object.keys(champions).length > 0){
            setChampions(champions);
            setVersion(version);
        }
    },[champions,])

    useEffect(()=>{
        let championNames = [];
        if(Object.keys(champs).length > 0){
        const champKeys = Object.keys(champs);
        champKeys.forEach((key)=>{
            const champion = champs[key];
            const data = {
                'name': `${champion.id}`,
                'title': `${champion.title}`,
                'key': `${champion.key}`,
                'img' : `${champion.image.full}`
            }
            championNames.push(data);
        });
        }
        setNames(championNames);
    },[champs]);

    useEffect(()=>{
        setState(filteredChampions);
    },[filteredChampions])

    const handleClick = (filteredChampions , setFilter, champion) =>{
        const cloneFilteredChampions = [...filteredChampions];
        const isSelected = cloneFilteredChampions.includes(champion)

        if(!isSelected){
            cloneFilteredChampions.push(champion)
            setFilter(cloneFilteredChampions);
        } else{
            const index = cloneFilteredChampions.indexOf(champion);
            cloneFilteredChampions.splice(index,1);
            setFilter(cloneFilteredChampions);
        }
    };


    return(
      <>
      {
        championNames.length === 0 ? 
        (null) :
        (
            <>
            <ul className="championSelection">
                {championNames.map((champion)=>{
                    const isSelected = filteredChampions.includes(champion);
                    let imgEndPoint = `https://ddragon.leagueoflegends.com/cdn/${ver}/img/champion/`;
                    return(
                    <li key={champion.key}>
                        <img src={imgEndPoint + champion.img} alt={champion} className={isSelected ? "selected" : ""} onClick={()=>{handleClick(filteredChampions , setFilter, champion)}} />
                    </li>
                    )
                })}    
            </ul>
            </>
        )
      }
      </>
    )
}
export default ChampionSelector