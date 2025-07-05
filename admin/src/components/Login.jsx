import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const onSubmitHandler = async(e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            
            if(response.data.success){
              setToken(response.data.token)
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(response.error.message)            
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email Address</label>
            <input
              onChange={(e) =>{setEmail(e.target.value)}}
              value={email}
              type="email"
              placeholder="Enter Email "
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              onChange={(e) =>{setPassword(e.target.value)}}
              value={password}
              type="password"
              placeholder="Enter Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
