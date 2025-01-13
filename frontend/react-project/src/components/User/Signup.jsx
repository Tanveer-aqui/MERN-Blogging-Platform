import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import GoogleLogo from '../../assets/Google_logo.webp'

const Signup = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser()
  const location = useLocation();
  const redirectUrl = location.state?.from || '/';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        username: formData.username, 
        email: formData.email, 
        password: formData.password
    }
    axios.post(`http://localhost:5000/signup`, data, {withCredentials: true})
    .then((res) => {
        const user = res.data;              
        updateUser(user);
        setFormData({
            username: '',
            email: '',
            password: '',
          });
        navigate(redirectUrl)
    })
    .catch((err) => {
        console.error("SignUp failed",err);
    })
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:5000/auth/google`;
  };

  return (
    <div className=" w-[85%] lg:w-[30%] md:w-[50%] px-6 py-10 border border-zinc-700 rounded-lg shadow-lg bg-zinc-900 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-300">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md shadow-sm bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md shadow-sm bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md shadow-sm bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your password"
              onClick={() => setShowPasswordHint(true)}
              onBlur={() => setShowPasswordHint(false)}
            />
            <button
              type="button"
              className="absolute top-4 right-4 text-zinc-200 hover:text-gray-300 text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
            </button>
          </div>
          {showPasswordHint && formData.password.length < 8 && <p className="text-sm text-red-400 mt-2">Password must be at least 8 characters long.</p>
          }
        </div>
        

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${(!formData.username || !formData.password || formData.password.length < 8 || !formData.email) 
              ? 'bg-sky-500/50 cursor-not-allowed' 
            : 'focus:ring-sky-500  bg-sky-600 hover:bg-sky-700'
            }`}
          disabled={!formData.username || !formData.password || formData.password < 8 || !formData.email}
        >
          Sign Up
        </button>
      </form>
      <div className="flex items-center w-full py-4">
        <div className="flex-grow border-t border-zinc-700"></div>
        <p className="mx-4 font-bold text-zinc-300">OR</p>
        <div className="flex-grow border-t border-zinc-700"></div>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center py-1.5 px-4 text-white font-semibold rounded-md bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-600 "
      >
        <img src={GoogleLogo} alt="google-logo" className='h-7 w-7 mr-1'/>
        Continue with Google
      </button>
      <div className='py-3 flex items-center justify-center gap-1'>
        <p className='text-gray-300'>
          Already have an account? 
        </p>
        <Link 
          to='/login' 
          state= {{ from: redirectUrl }} 
          className='text-sky-400 hover:underline' 
        >
            Log in
        </Link> 
      </div>
    </div>
  );
};

export default Signup;
