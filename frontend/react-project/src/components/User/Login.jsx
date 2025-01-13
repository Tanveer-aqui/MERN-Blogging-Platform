import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import GoogleLogo from '../../assets/Google_logo.webp'

const Login = () =>  {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  const {updateUser} = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const redirectUrl = location.state?.from || '/';

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); 
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: formData.username, 
      password: formData.password,
      redirectUrl
    }    
    axios.post(`http://localhost:5000/login`, data, {withCredentials: true})
    .then((res) => {
        const user = res.data;                        
        updateUser(user);
        navigate(redirectUrl)
    })
    .catch((err) => {
        console.error("Login failed", err.response.data.message);
        setError(err.response.data.message);
    })
  };

  const handleGoogleLogin = () => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://ossus-one.vercel.app/"
        : "http://localhost:5000";
  
    window.location.href = `${baseUrl}/auth/google`;
  };
  

  return (
    <>
      {error && (
        <div
          className="w-[70%] lg:w-1/3 absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-900/50 border border-red-800 text-red-100 text-xl font-medium py-4 rounded-md shadow-lg text-center ease-in-out z-20"
        >
          {error}
        </div>
      )}
      <div className=" w-[85%] lg:w-[30%] px-6 py-16 border border-zinc-700 rounded-lg shadow-lg bg-zinc-900 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
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
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md shadow-sm bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your password"
            />
            <button
                type="button"
                className="absolute top-4 right-4 text-zinc-200 hover:text-gray-300 text-2xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
              </button>
            </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2
            ${(!formData.username || !formData.password || formData.password.length < 8) ? 
                'bg-sky-500/50 cursor-not-allowed' 
                : 'focus:ring-sky-500  bg-sky-600 hover:bg-sky-700'
            }`}
          disabled={!formData.username || !formData.password || formData.password < 8}
        >
          Log in
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
          Don't have an account? 
        </p>
        <Link 
          to='/signup'
          state= {{ from: redirectUrl }} 
          className='text-sky-400 hover:underline'>
            Sign up
        </Link> 
      </div>
    </div>
    </>
  )
}

export default Login;