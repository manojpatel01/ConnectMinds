import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Auth({ user,setUser }) {
    let navigate = useNavigate();

    useEffect(()=>{
      if(user)
      {
        setUser(user);
        navigate("/profile"

        );
      }
    },[user])

  async function handleSubmit(e) {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    let res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    console.log(res.data);
    if (res.data.userData) {
      setUser(res.data.userData);
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    } else {
      alert(res.data.message);
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      avatar: e.target.avatar.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    let res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
    console.log(res.data);
    if (res.data.userData) {
      setUser(res.data.userData);
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    } else {
      alert(res.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">

        {/* Login Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input type="email" id="email" placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <input type="password" id="password" placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200">
              Login
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
              <input type="text" id="name" placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label htmlFor="avatar" className="block font-medium text-gray-700">Avatar URL</label>
              <input type="text" id="avatar" placeholder="Enter your avatar URL"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input type="email" id="email" placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <input type="password" id="password" placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200">
              Register
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
