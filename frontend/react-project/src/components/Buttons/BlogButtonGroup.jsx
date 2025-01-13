import React from 'react'
import { Link } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from 'react-icons/bs';

function BlogButtonGroup({isOpenMenu, handleIsOpenMenu, blogId, handleModal}) {
  return (
    <div className="button-group absolute top-6 right-5">
      <BsThreeDotsVertical 
        className="cursor-pointer text-xl text-white"
        onClick={handleIsOpenMenu}
      />
      {
        isOpenMenu && (
          <div className="flex flex-col gap-2 absolute top-5 -right-4 p-2 rounded-lg shadow-lg">

          {/* Edit Button */}
          <Link to={`/blogs/edit/${blogId}`}>
            <button
              className="bg-blue-600 text-white rounded-full p-2 transition duration-300 ease-in-out 
                hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform hover:scale-105 w-full text-center"
            >
              <TbEdit className="text-xl" />
            </button>
          </Link>

          {/* Delete Button */}
          <button
            className="bg-red-600 text-white rounded-full p-2 transition duration-300 ease-in-out 
              hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg transform hover:scale-105 w-full text-center"
            onClick={handleModal}
          >
            <RiDeleteBin6Line className="text-xl" />
          </button>
        </div>
        )
      }
    </div>
  )
}

export default BlogButtonGroup