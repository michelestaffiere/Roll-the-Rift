import { useState, useEffect } from 'react'

import './App.css'
import Header from './Header'
import Randomizer from './Randomizer'
import ChampionSelector from './ChampionSelctor'
import BuildSaver from './BuildSaver'


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
