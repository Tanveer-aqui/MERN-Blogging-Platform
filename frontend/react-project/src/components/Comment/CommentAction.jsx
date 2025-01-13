import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { useUser } from '../../context/UserContext';


const CommentActions = ({ comment, isReplying, onReply, className, menuOption }) => {
  const { user } = useUser();
  return (
    <div className={`flex gap-3 ${className}`}>
      {isReplying ? null : (
            <button onClick={onReply} className='text-sm flex gap-1 items-center mt-2 ms-12 text-zinc-100'>
          <FaReply className='text-base rotate-180'/>
          Reply
        </button>
      )}      

      {user && comment.author && user.userId === comment.author._id && (
        <BsThreeDotsVertical className='absolute top-3 right-3' onClick={menuOption} />
      )}
    </div>
  );
};

export default CommentActions;
