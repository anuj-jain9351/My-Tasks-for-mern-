import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const [message,setMessage] = useState("")
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
            e.preventDefault();
             
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                loginData
            )

            console.log(response.data)

                        localStorage.setItem("token", response.data?.token)
                        navigate("/tasks")

        } catch (error) {
            setMessage(error.response.data.message)
            navigate('/register')
            console.log(error.response?.data || error.message)
        }
    }
return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-gray-500 text-center mb-8">
        Login to your account
      </p>

      {message && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>

      </form>

      <div className="text-center mt-6 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Create Account
        </Link>
      </div>

    </div>

  </div>
)
}

export default Login
