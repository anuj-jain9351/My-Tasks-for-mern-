import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div >
      <Navbar/>
      
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
</Routes>
    </div>
  )
}

export default App
