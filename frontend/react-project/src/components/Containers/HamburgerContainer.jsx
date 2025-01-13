import React from 'react';
import { FaHome, FaFacebook, FaInstagram, FaBookmark } from 'react-icons/fa';
import { FaDiscord, FaGithub, FaTwitch, FaXTwitter } from 'react-icons/fa6';
import { IoPricetagOutline } from 'react-icons/io5';
import { MdOutlinePolicy, MdOutlineContactSupport } from 'react-icons/md';
import { PiCirclesThree } from 'react-icons/pi';
import { RiContactsLine } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';
import ListItem from '../Items/ListItem';
import { CgProfile } from 'react-icons/cg';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

const HamburgerContainer = ({ isOpen, onClose }) => {
  const { user } = useUser();

  const containerVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  return (
    <div className="lg:hidden">
      {isOpen && (
        <motion.div
          key="hamburger"
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-4/5 h-screen bg-zinc-800 p-4 shadow-lg z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
        >
          <div className="flex items-center justify-between px-2 mb-4">
            <h1 className="text-3xl font-extrabold text-white ">Osuus</h1>
            <button
              onClick={onClose}
              className="text-zinc-300 hover:text-white p-2 focus:outline-none"
              aria-label="Close Menu"
            >
              <HiX size={25} />
            </button>
          </div>
          <ul className="text-zinc-300 space-y-4">
            <ListItem icon={FaHome} label="Home" to="/" onClick={onClose} />
            <ListItem icon={IoPricetagOutline} label="Popular Tags" to="/tags" onClick={onClose} />
            {user && (
              <>
                <ListItem icon={FaBookmark} label="Bookmarks" to="/bookmarks" onClick={onClose} />
                <ListItem icon={CgProfile} label="Profile" to="/profile" onClick={onClose} />
              </>
            )}
            <ListItem icon={RiContactsLine} label="Contacts" to="/contact" onClick={onClose} />
            <ListItem icon={MdOutlinePolicy} label="Privacy Policy" to="/privacy-policy" onClick={onClose} />
            <ListItem icon={PiCirclesThree} label="Terms of Use" to="/terms" onClick={onClose} />
            <ListItem icon={MdOutlineContactSupport} label="Help" to="/help" onClick={onClose} />
          </ul>
          <div className="mt-6 border-t border-zinc-700 pt-4">
            <div className="flex justify-around text-zinc-400">
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Instagram">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitter">
                <FaXTwitter size={22} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Discord">
                <FaDiscord size={22} />
              </a>
              <a href="#" className="hover:text-white" aria-label="GitHub">
                <FaGithub size={22} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitch">
                <FaTwitch size={22} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HamburgerContainer;
