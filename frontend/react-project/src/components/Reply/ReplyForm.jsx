import React, { useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder';

const ReplyForm = ({ onSubmit, replyContent, setReplyContent, onCancel, formClassName, inputRef }) => {
  const textareaRef = useRef(null);
  const { user }  = useUser();

  useEffect(() => {
    if(textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [replyContent])

  useEffect(() => {
    if(inputRef) {
      inputRef.current = textareaRef.current;
    }
  }, [inputRef])

  return (
      <form onSubmit={onSubmit} className={`reply-form text-black reply-form flex flex-col items-center mt-3 ms-12 mr-6 ${formClassName}`}>
        <div className='w-full flex gap-3'>
          <ProfilePlaceholder username={user?.username || ''} className='w-5 h-5 p-4'/>
          <textarea
            type="text"
            placeholder="Add a reply..."
            className="reply-input w-full text-base bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none resize-none overflow-hidden"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            ref={textareaRef}
            rows={1}
          />
        </div>
        <div className="w-full flex justify-end space-x-3 text-sm mt-3">
          <button 
            type="button" 
            onClick={onCancel} 
            className="text-white text-sm hover:bg-zinc-600 rounded-lg px-3 py-1 hover:text-white font-medium"
            >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={!replyContent} 
            className={`px-4 py-1 text-sm font-semibold rounded-lg ${replyContent ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 cursor-not-allowed'}`}
          >
            Reply
          </button>
        </div>
        </form>
  )
};

export default ReplyForm;

