import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

const Homelayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Homelayout