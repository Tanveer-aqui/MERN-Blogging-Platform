import React from 'react';
import { FaHome, FaFacebook, FaInstagram, FaBookmark } from 'react-icons/fa';
import { FaDiscord, FaGithub, FaTwitch, FaXTwitter } from 'react-icons/fa6';
import ListItem from '../Items/ListItem';
import { MdOutlinePolicy, MdOutlineContactSupport } from 'react-icons/md';
import { PiCirclesThree } from "react-icons/pi";
import { IoPricetagOutline } from 'react-icons/io5';
import { RiContactsLine } from 'react-icons/ri';
import { CgProfile } from "react-icons/cg";
import {useUser} from '../../context/UserContext.jsx'



function SideContainer() {
  const {user} = useUser();
  return (
    <div className="bg-zinc-800 p-4 rounded-md shadow-sm hidden lg:block">
      <ul className="text-zinc-300 space-y-2">
        <ListItem icon={FaHome} label="Home" to="/" />
        <ListItem icon={IoPricetagOutline} label="Popular Tags" to="/tags" />
        {user && (
          <>
            <ListItem icon={FaBookmark} label="Bookmarks" to="/bookmarks" />
            <ListItem icon={CgProfile} label="Profile" to="/profile" />
          </>
        )}
        <ListItem icon={RiContactsLine} label="Contacts" to="/contact" />
        <ListItem icon={MdOutlinePolicy} label="Privacy Policy" to="/privacy-policy" />
        <ListItem icon={PiCirclesThree} label="Terms of use" to="/terms" />
        <ListItem icon={MdOutlineContactSupport} label="Help" to="/help" />
      </ul>

      <div className="mt-6 border-zinc-700 flex flex-wrap">
        <div className="flex space-x-4 text-zinc-400 items-center">
          <a className="hover:text-white">
            <FaFacebook size={25}/>
          </a>
          <a className="hover:text-white">
            <FaInstagram size={25} />
          </a>
          <a className="hover:text-white">
            <FaXTwitter size={25} />
          </a>
          <a className="hover:text-white">
            <FaDiscord size={25} />
          </a>
          <a className="hover:text-white">
            <FaGithub size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideContainer;