import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import LatestProducts from './Pages/LatestProducts/LatestProducts'
import OurWebsite from './Pages/OurWebsite/OurWebsite'
import OurCompany from './Pages/OurCompany/OurCompany'
import ContactPage from './Pages/ContactPage/ContactPage'
import Footer from './Pages/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home />
      <LatestProducts />
      <OurWebsite />
      <OurCompany />
      <ContactPage />
      <Footer />
    </div>
  )
}

export default App