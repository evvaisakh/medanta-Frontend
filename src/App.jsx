import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Appointment from './pages/Appointment'
import Dashboard from './pages/Dashboard'
import DoctorsList from './pages/DoctorsList'
import AboutUs from './pages/AboutUs'
import CommonDash from './pages/CommonDash'
import ContactUs from './pages/ContactUs'
import Review from './pages/Review'
import ScrollToTop from 'react-scroll-to-top'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/commondash' element={<CommonDash />} />
        <Route path='/doctorslist' element={<DoctorsList />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/messages' element={<Review />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <ScrollToTop smooth color='white' style={{ background: '#00CED1' }} />
    </>
  )
}

export default App
