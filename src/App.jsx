import { useState, useEffect } from 'react'

import './App.css'
import Header from './Components/Header'
import Randomizer from './Components/Randomizer'
import ChampionSelector from './Components/ChampionSelctor'
import BuildSaver from './Components/BuildSaver'


function App() {
const [selectedChampions,setSelectedChampions] = useState([]);
 return (
    <>
      <Header />
      <section className='main'>
      <ChampionSelector  setState={setSelectedChampions} />
      <Randomizer userChoice={selectedChampions}>
        <BuildSaver />
      </Randomizer>
      </section>
    </>
  )
}

export default App
