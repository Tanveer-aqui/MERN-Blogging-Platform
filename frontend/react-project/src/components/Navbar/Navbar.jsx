import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdLogout, MdOutlineEdit } from "react-icons/md";
import logo from '../../assets/blog_logo.png'
import { HiMenuAlt3 } from "react-icons/hi";
import HamburgerContainer from '../Containers/HamburgerContainer';
import { useUser } from '../../context/UserContext';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineAddBox } from "react-icons/md";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;


const Navbar = ({visibility = true}) => {
  const {user, logoutUser} = useUser();  
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    if(menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen])

  const handleLogout = () => {
    axios.get(`${API_URL}/logout`)
    .then(() => {
      logoutUser();
      navigate(location.pathname);
      toast.success("You're logged out!");
    })
    .catch((e) => {
      console.log("Error while logging out...", e);  
    })
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/blogs/search?search=${(searchQuery.trim())}`);
    }
  };
  
  if(!visibility) return null;

  return (
    <>
      <nav className="w-full bg-zinc-900 flex flex-col lg:flex-row justify-between items-center box-border h-28 lg:h-14 px-4 py-4 lg:px-20 sticky top-0 z-50">
      <div className="lg:flex gap-2 hidden ">
          <HiMenuAlt3 className='block lg:hidden text-white text-2xl cursor-pointer' onClick={handleMenuOpen}/>
          <Link to='/blogs'>
            <img src={logo} alt="My Logo" className="h-7 lg:h-9" />
          </Link>
      </div>

      {/* Responsive Design */}
      <div className='w-full flex items-center justify-between lg:hidden'>
        <div className="flex gap-2">
            <HiMenuAlt3 className='block lg:hidden text-white text-2xl cursor-pointer' onClick={handleMenuOpen}/>
            <Link to='/blogs'>
              <img src={logo} alt="My Logo" className="h-7 lg:h-9" />
            </Link>
        </div>
        <div className='flex items-center justify-end lg:hidden'>
        {user ? (
          <div className='w-full flex items-center justify-between font-semibold gap-3'>
             <Link to='/blogs/create'>
              <button className="flex items-center justify-center p-2 lg:px-5 text-white border-none rounded-md text-[0.9rem] bg-blue-600 cursor-pointer">
                <MdOutlineAddBox className="text-lg" />
              </button>
            </Link>
              <button className="flex items-center justify-center p-2 text-white border-none rounded-md text-[0.9rem] bg-red-500 cursor-pointer" onClick={handleLogout}>
                <MdLogout className="text-lg" />
              </button>
          </div>
        ) : (
          <div className='flex items-center justify-end gap-3'>
            <Link 
              to='/login'
              state={{from: location.pathname}}
            >
              <button className='py-1 px-4 text-sm text-white rounded-md font-semibold border-2 cursor-pointer bg-blue-500 border-blue-500'>Login</button>
            </Link>
            <Link 
              to='/signup'
              state={{from: location.pathname}}
            >
              <button className='py-1 px-4 text-sm  rounded-md cursor-pointer font-semibold border-2 border-blue-500 text-blue-400'>Sign up</button>
            </Link>
          </div>
        )}
        </div>
      </div>

        {/* Responsive search bar */}
      <div className=" lg:hidden w-full flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className='w-full px-4 py-2 text-white rounded-s-md focus:outline-none bg-zinc-700'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
          className='text-gray-100 p-2 rounded-e-md focus:outline-none bg-zinc-600'
          onClick={handleSearch}
          >
            <IoMdSearch className="text-2xl" />
          </button>
      </div>
        {/* ---till here--- */}

      <div className="hidden lg:flex items-center justify-center focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-80 px-4 py-2 bg-zinc-700 text-white rounded-s-md focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
          className="text-gray-100 bg-zinc-600 p-2 rounded-e-md focus:outline-none"
          onClick={handleSearch}
          >
            <IoMdSearch className="text-2xl" />
          </button>
      </div>
      <div className="gap-4 items-center justify-between lg:block hidden ">
        {user ? (
          <div className='w-full flex items-center justify-between font-semibold gap-3'>
             <Link to='/blogs/create'>
              <button className="flex items-center justify-center gap-1 px-4 py-1 lg:py-1.5 lg:px-5 text-white border-none rounded-md text-[0.95rem] bg-blue-600 hover:bg-[#007bffd0] cursor-pointer">
                <MdOutlineEdit className="text-lg" />
                Create post
              </button>
            </Link>
              <button className="flex items-center justify-center gap-1 px-4 py-1 lg:py-1.5 lg:px-5 text-white border-none rounded-md text-[0.95rem] bg-red-600 hover:bg-red-700 cursor-pointer" onClick={handleLogout}>
                Logout
                <MdLogout className="text-lg" />
              </button>
          </div>
        ) : (
          <div className='flex items-center justify-end gap-3'>
            <Link 
              to='/login'
              state={{from: location.pathname}}
            >
              <button className="py-1.5 px-5 text-white rounded-md cursor-pointer h-[30%] font-semibold bg-blue-500">Login</button>
            </Link>
            <Link 
              to='/signup'
              state={{from: location.pathname}}
            >
              <button className="py-1 px-5 text-blue-400 rounded-md cursor-pointer h-[30%] font-semibold border-2 border-blue-500">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>

    {menuOpen && (
      <>
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <HamburgerContainer isOpen={menuOpen} onClose={handleMenuOpen}/>
      </>
    )}
    </>
  );
}

export default Navbar;