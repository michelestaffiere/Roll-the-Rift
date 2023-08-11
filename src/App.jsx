import { useState,useEffect } from 'react'
import './App.css'
import Header from './Header'
import Randomizer from './Randomizer'
import ChampionSelector from './championSelctorForm'

function App() {
const [selectedChampions,setSelectedChampions] = useState([]);
 return (
    <>
      <Header />
      <section className='main'>
      <ChampionSelector  setState={setSelectedChampions} />
      <Randomizer userChoice={selectedChampions}  />
      </section>
    </>
  )
}

export default App
