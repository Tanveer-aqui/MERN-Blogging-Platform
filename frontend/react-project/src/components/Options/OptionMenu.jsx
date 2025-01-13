import React from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const OptionsMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute top-0 -right-[7.5rem] mt-2 w-32 bg-zinc-800 rounded-md shadow-lg z-10 text-white text-sm border border-zinc-700">
      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-zinc-700 transition-all rounded-t-md"
      >
        <CiEdit className="text-xl text-sky-400" />
        <span>Edit</span>
      </button>
      
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-zinc-700 transition-all rounded-b-md"
      >
        <MdDeleteOutline className="text-xl text-red-400" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default OptionsMenu;
