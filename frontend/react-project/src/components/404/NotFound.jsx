import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className=" flex flex-col items-center min-h-screen bg-zinc-900 mt-32">
      <p className='text-6xl lg:text-8xl md:text-7xl font-extrabold'>404</p>
      <p className='text-xl font-medium'>Page not found!</p>
      <p className="mt-4 text-lg md:text-xl text-gray-300 text-center">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/blogs">
        <button
          className="mt-6 flex font-medium items-center px-5 py-2 border-2 border-white text-white rounded-3xl hover:bg-white hover:text-black transition duration-200"
        >
          <FaHome className="mr-2" />
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
