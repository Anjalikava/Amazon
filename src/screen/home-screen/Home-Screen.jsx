import React from 'react'
import './Home-Screen.css'
import HomeBanner from './home-banner/Home-Banner'
import { HomeDetails } from './home-details/Home-Details'
import Footer from '../../modules/footer/Footer'



export const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <HomeBanner/>
      <HomeDetails/>
      <Footer/>
  </div>
  )
}
