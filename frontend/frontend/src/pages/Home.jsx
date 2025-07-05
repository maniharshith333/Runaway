import React from 'react'
import NewCollection from '../components/NewCollection'
import Oversized from '../components/Oversized'
import Hoddie from '../components/Hoddie'
import Vest from '../components/Vest'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <NewCollection/>
      <Oversized/>
      <Hoddie/>
      <Vest/>
    </div>
  )
}

export default Home