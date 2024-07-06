import Home from '../src/markup/pages/Home'
import About from './markup/pages/About'
import Services from './markup/pages/Services'
import Contact from './markup/pages/Contact'
import Login from './markup/pages/Login'
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

// admin pages
import Dashboard from './markup/pages/admin/Dashboard'
import Orders from './markup/pages/admin/Orders'
import Employees from './markup/pages/admin/Employees'
import AddEmployee from './markup/pages/admin/AddEmployee'
import Customers from './markup/pages/admin/Customers'
import AddCustomers from './markup/pages/admin/AddCustomers'
import CustomerPage from './markup/pages/admin/CustomerPage'
import Update from './markup/pages/admin/UpdateEmployee'
import UpdateCustomer from './markup/pages/admin/UpdateCustomer'
import AdminService from './markup/pages/admin/AdminService'
import AddNewOrder from './markup/pages/admin/AddNewOrder'
// import private route wrapper 
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute'

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      transition: 'opacity 0.3s, transform 0.3s'
    });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin route */}
        <Route path="/admin" element={<PrivateAuthRoute roles={[2, 3]}><Dashboard /></PrivateAuthRoute>} />
        <Route path="/admin/orders" element={<PrivateAuthRoute roles={[1, 2, 3]}><Orders /></PrivateAuthRoute>} />
        <Route path="/admin/order" element={<PrivateAuthRoute roles={[3]}><AddNewOrder /></PrivateAuthRoute>} />
        {/* <Route path='/admin/customers' element={<PrivateAuthRoute roles={[ 2, 3]}><Customers /></PrivateAuthRoute>} /> */}
        <Route path='/admin/employees' element={<PrivateAuthRoute roles={[3]}><Employees /></PrivateAuthRoute>} />
        <Route path="/admin/add-employee" element={<PrivateAuthRoute roles={[3]}><AddEmployee /></PrivateAuthRoute>} />
        <Route path="/admin/employee/update/:employeeId" element={<PrivateAuthRoute roles={[3]}><Update /></PrivateAuthRoute>} />
        
        {/* Customers route */}
        <Route path="/admin/customers" element={<PrivateAuthRoute roles={[3]}><Customers /></PrivateAuthRoute>} />
        <Route path="/admin/customer/detail/:customerId" element={<PrivateAuthRoute roles={[3]}><CustomerPage /></PrivateAuthRoute>} />
        <Route path="/admin/add-customer" element={<PrivateAuthRoute roles={[3]}><AddCustomers /></PrivateAuthRoute>} />
        <Route path="/admin/customer/update/:customerId" element={<PrivateAuthRoute roles={[3]}><UpdateCustomer /></PrivateAuthRoute>} />

        {/* service route */}
        <Route path="/admin/services" element={<PrivateAuthRoute roles={[3]}><AdminService /></PrivateAuthRoute>} />

        <Route path='/unauthorized' element={<Unauthorized />} />
      </Routes>
      <Footer />
      <div className="scroll-to-top scroll-to-target" data-target="html" onClick={scrollToTop}>
        <span className="flaticon-right-arrow"></span>
      </div>
    </>
  );
}

export default App;
