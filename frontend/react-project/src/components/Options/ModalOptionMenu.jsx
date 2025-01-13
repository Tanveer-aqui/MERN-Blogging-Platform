import React from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const ModalOptionMenu = ({ onEdit, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 w-80 rounded-lg shadow-lg text-white relative">
        {/* Close Icon */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <div className="text-center p-4 border-b border-zinc-700">
          <h3 className="text-lg font-semibold">Choose an Action</h3>
        </div>

        {/* Options */}
        <button 
          onClick={() => {
            onEdit();
            onClose();
          }} 
          className="w-full px-5 py-3 flex items-center gap-3 hover:bg-zinc-700 text-left transition-all"
        >
          <CiEdit className="text-2xl text-sky-400" />
          <span className="text-sm">Edit</span>
        </button>
        <button 
          onClick={() => {
            onDelete();
            onClose();
          }} 
          className="w-full px-5 py-3 flex items-center gap-3 hover:bg-zinc-700 text-left transition-all"
        >
          <MdDeleteOutline className="text-2xl text-red-400" />
          <span className="text-sm">Delete</span>
        </button>

        {/* Cancel Button */}
        <button 
          onClick={onClose} 
          className="w-full px-4 py-3 text-center text-red-400 font-semibold hover:bg-zinc-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalOptionMenu;
