import { useState } from 'react'
import Home from '../src/markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/admin/AddEmployee'
import {Route,Routes} from 'react-router'
import './assets/template_asset/css/color.css'
import './assets/template_asset/css/style.css'
import './assets/template_asset/css/bootstrap.css'
import './assets/template_asset/css/responsive.css'

// import custom css
import './assets/style/custom.css'

// import Header and footer
import Footer from './markup/components/Footer/Footer'
import Header from './markup/components/Header/Header'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/add-employee" element={<AddEmployee />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
