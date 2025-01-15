import React, { useRef, useState, useEffect } from 'react';
import OptionsMenu from '../Options/OptionMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import EditableInput from '../Edit/EditableInput';
import { useUser } from '../../context/UserContext';
import ModalOptionMenu from '../Options/ModalOptionMenu';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder';

const Reply = ({  commentId, reply, handleReplyEdit, handleReplyDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [replyContent, setReplyContent] = useState(reply.content);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const {user} = useUser();
  
  const replyRef = useRef(null);
  const textRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
        setShowMoreButton(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [reply.content, isExpanded]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowOptions(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleMenuClick = () => {
      if (window.innerWidth <= 768) {
        setShowOptionsModal(true);
      } else {
        setShowOptions((prev) => !prev);
      }
    };

  const saveEditReply = () => {
    handleReplyEdit(commentId, reply._id, replyContent);
    setIsEditingReply(false);
  };

  const handleEditReply = () => {
    setIsEditingReply(true)
    setShowOptions(false)
  }

  const handleDeleteReply = () => {
    handleReplyDelete(commentId, reply._id);
  }

  useEffect(()=> {
    if(isEditingReply) {
      replyRef.current?.focus();
    }
  }, [isEditingReply])

  useEffect(() => {
    if (showOptionsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOptionsModal])

  function timeAgo(dateString) {
    const diff = Math.floor((new Date() - new Date(dateString)) / 1000);
    
    if (diff < 60) return `${diff} sec${diff !== 1 ? 's' : ''} ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} month${Math.floor(diff / 2592000) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 31536000)} year${Math.floor(diff / 31536000) !== 1 ? 's' : ''} ago`;
  }

  return (
    <div className="ml-6 mt-2 bg-zinc-900 p-2 rounded relative">
      <div className='flex gap-2 ms-4'>
          <ProfilePlaceholder username={reply.author?.username || ''} className='w-5 h-5 p-4'/>          
        <h4 className="font-semibold">@ {reply?.author?.username && reply.author?.username.charAt(0).toUpperCase() + reply.author?.username.slice(1).toLowerCase()}</h4>
        <span className='text-sm text-gray-300 mt-[.2rem]'>{timeAgo(reply.createdAt)}</span>

      </div>
      
      <div className='pr-6'>
        {isEditingReply ? (
            <EditableInput
              value={replyContent}
              onChange={setReplyContent}
              onCancel={() => setIsEditingReply(false)}
              onSave={saveEditReply}
              isDisabled={!replyContent}
              reference={replyRef}
              textareaClassName='ms-16 -mt-3'
            />         
        ) : (
          <div className="relative ms-14 -mt-2.5">
            <p
              ref={textRef}
              className={`${
                !isExpanded ? 'line-clamp-2' : ''
              } whitespace-pre-wrap break-words`}
            >
              {reply.content}
            </p>
            {!isExpanded && showMoreButton && (
              <button
              onClick={() => setIsExpanded(true)}
              className="text-sky-500 hover:text-sky-600 mt-1 text-sm"
            >
              Show more
            </button>
            )}
            {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sky-500 hover:text-sky-600 mt-1 text-sm"
            >
              Show less
            </button>
            )}
          </div>
        )}
      </div>

      {user && reply.author && user.userId === reply.author._id && (
        <BsThreeDotsVertical className='absolute top-3 right-3' onClick={handleMenuClick} />
      )}

      {showOptions && window.innerWidth > 768 && (
        <div ref={menuRef}>
           <OptionsMenu
            onEdit={handleEditReply}
            onDelete={handleDeleteReply}
          />
        </div>
      )}

      {showOptionsModal && (
        <ModalOptionMenu
        onEdit={handleEditReply}
        onDelete={handleDeleteReply}
          onClose={() => setShowOptionsModal(false)}
        />
      )}
    </div>
  );
};

export default Reply;

