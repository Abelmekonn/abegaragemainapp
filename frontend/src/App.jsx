import Home from '../src/markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/admin/AddEmployee'
import { Route, Routes } from 'react-router'

import './assets/template_asset/css/color.css'
import './assets/template_asset/css/style.css'
import './assets/template_asset/css/bootstrap.css'
import './assets/template_asset/css/responsive.css'

// import custom css
import './assets/style/custom.css'

// import Header and footer
import Footer from './markup/components/Footer/Footer'
import Header from './markup/components/Header/Header'
import Unauthorized from './markup/pages/Unauthorized'
import Orders from './markup/pages/admin/Orders'
import Customers from './markup/pages/admin/Customers'
import Employees from './markup/pages/admin/Employees'
// import private route wrapper 
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/orders" element={<PrivateAuthRoute roles={[1, 2, 3]}>
          <Orders />
        </PrivateAuthRoute>} />
        <Route path='/admin/customers' element={<PrivateAuthRoute roles={[ 2, 3]}>
          <Customers />
        </PrivateAuthRoute>} />
        <Route path='/admin/employees' element={<PrivateAuthRoute roles={[3]}>
          <Employees/>
        </PrivateAuthRoute>}/>
        <Route path="/admin/add-employee" element={<PrivateAuthRoute roles={[ 3 ]}>
        <AddEmployee />
        </PrivateAuthRoute>} />

        <Route path='/unauthorized' element={<Unauthorized />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
