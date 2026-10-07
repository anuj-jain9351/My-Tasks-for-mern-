import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Navbar = () => {
     const naviagte =  useNavigate()
    const handleLogout = ()=>{
     localStorage.removeItem("token")
     naviagte("/")
    }
  return (
<nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
  <h1 className="text-2xl font-bold">Task Manager</h1>

  <div className="flex items-center gap-6">
    <Link to="/tasks" className="hover:text-blue-400">
      Tasks
    </Link>

    <Link to="/register" className="hover:text-blue-400">
      Register
    </Link>

    <Link to="/" className="hover:text-blue-400">
      Login
    </Link>

    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  </div>
</nav>  )
}

export default Navbar
