import { useState } from 'react'
import Home from '../src/markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/admin/AddEmployee'
import {Route,Routes} from 'react-router'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/add-employee" element={<AddEmployee />} />
    </Routes>
    </>
  )
}

export default App
