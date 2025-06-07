import { Routes, Route } from 'react-router-dom'
import './App.css'
//import IncomePieChart from './components/features/dashboard/charts/IncomePieChart'
//import MonthlyBarChart from './components/features/dashboard/charts/MonthlyBarChart'

import HomePage from './pages/HomePage'
import Login from './components/features/login/Login'


function App() {
  

  return (
    <>
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
     
    </Routes>
    </>
  )
}

export default App
