import { Routes, Route } from 'react-router-dom'
import './App.css'
//import IncomePieChart from './components/features/dashboard/charts/IncomePieChart'
//import MonthlyBarChart from './components/features/dashboard/charts/MonthlyBarChart'

import HomePage from './pages/HomePage'
import Login from './components/features/auth/Login'
import Register from './components/features/auth/Register'
import DashboardPage from './pages/DashboardPage'
import InvoiceManagementPage from './pages/InvoiceManagementPage'
import QuoteInvoicePage from './pages/QuoteInvoicePage'
import DocumentManagementPage from './pages/DocumentManagement'
import Logout from './components/features/auth/Logout'
import FeaturesPage from './pages/FeaturesPage'
import ProtectedRoute from './components/features/ProtectedRoute'


function App() {
  

  return (
    <>
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
        <DashboardPage />
        </ProtectedRoute>} />

      <Route path="/invoice-management" element={
        <ProtectedRoute>
        <InvoiceManagementPage />
        </ProtectedRoute>
        } />

      <Route path="/quote-invoice" element={
        <ProtectedRoute>
        <QuoteInvoicePage />
        </ProtectedRoute>
        } />
      
      <Route path="/doc-management" element={
        <ProtectedRoute>
        <DocumentManagementPage />
        </ProtectedRoute>} />

      <Route path="/features" element={
       
        <FeaturesPage />
       
        } />

      <Route path="/logout" element={
        
        <Logout />
        
       } />


     
    </Routes>
    </>
  )
}

export default App
