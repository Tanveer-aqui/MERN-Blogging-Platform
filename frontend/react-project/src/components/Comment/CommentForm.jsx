import React, { useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder';

const CommentForm = ({ onSubmit, commentContent, setCommentContent, onCancel, isFocused, formClassName, onFocus }) => {
  const textareaRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentContent]);

  return (
    <form 
      onSubmit={onSubmit} 
      className={`comment-form flex flex-col items-start my-10 ml-4 lg:w-[90%] relative ${formClassName}`}
    >
    <div className='w-full flex gap-3'>
      <ProfilePlaceholder username={user?.username || ''} className='w-5 h-5 p-5'/>
      <textarea
        ref={textareaRef}
        placeholder="Add a comment..."
        aria-label="Comment input field"
        className="comment-input w-full text-base bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none resize-none overflow-hidden mt-2"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        onFocus={onFocus}
        rows={1}
      />
    </div>
      {isFocused && (
        <div className="w-full justify-end flex space-x-2 mt-3 text-sm">
          <button 
            type="button" 
            onClick={onCancel} 
            className="text-white hover:bg-gray-500 px-4 rounded-full" 
            aria-label="Cancel comment"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={!commentContent} 
            className={`px-4 py-1.5 font-medium rounded-full ${commentContent ? 'bg-blue-600 text-slate-100' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} 
            aria-label="Submit comment"
          >
            Comment
          </button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
