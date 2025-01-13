import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ icon: Icon, label, to, className, onClick }) => {
  return (
    <Link to={to} onClick={onClick}>
      <li className={`flex items-center hover:bg-zinc-950 rounded-md py-3 px-2 cursor-pointer ${className}`}>
        <Icon className="mr-2 font-semibold text-xl" />
          <span className="hover:text-white text-md font-semibold">{label}</span>
      </li>
    </Link>
  );
};

export default ListItem;
