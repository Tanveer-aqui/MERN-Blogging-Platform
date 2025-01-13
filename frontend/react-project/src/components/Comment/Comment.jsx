import React, { useEffect, useRef, useState } from 'react';
import CommentActions from './CommentAction';
import Reply from '../Reply/Reply';
import ReplyForm from '../Reply/ReplyForm';
import OptionsMenu from '../Options/OptionMenu';
import EditableInput from '../Edit/EditableInput';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useUser } from '../../context/UserContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ModalOptionMenu from '../Options/ModalOptionMenu';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder';


const Comment = ({ comment, handleReplyEdit, handleReplyDelete, handleReplySubmit, handleCommentEdit, handleDeleteComment }) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyingToComment, setReplyingToComment] = useState(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [ifReplies, setIfReplies] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const replyRef = useRef(null);
  const commentRef = useRef(null);
  const textRef = useRef(null);  

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
  }, [comment.content, isExpanded]);


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

  const handleIfReplies = async () => {
    setIfReplies((prev) => !prev);
  };
  
  const saveEdit = () => {
    handleCommentEdit(editContent);
    setIsEditing(false);
  };

  const handleReplyClick = (commentId) => {
    if(!user) {
      navigate('/signup', {state: {from: location.pathname}});
    } else {
      setReplyingToComment(commentId);
      setTimeout(() => {
        replyRef.current?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    if(isEditing) {
      commentRef.current?.focus();
    }
  }, [isEditing]);
  
  useEffect(() => {
      if (showOptionsModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [showOptionsModal]);
    

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
    <div className="comment mb-3 relative ml-4">
      <div className='flex gap-2'>
        <ProfilePlaceholder username={comment.author?.username || ''}/>
        <div className='flex gap-2'>
          <h4 className="font-semibold">@{comment.author.username.charAt(0).toUpperCase() + comment.author.username.slice(1).toLowerCase()}</h4>
          <span className='text-sm text-gray-300 mt-[.2rem]'>{timeAgo(comment.createdAt)}</span>
        </div>
      </div>

      
      <div className="pr-12">
        {isEditing ? (
            <EditableInput 
              value={editContent}
              onChange={setEditContent}
              onCancel={() => setIsEditing(false)}
              onSave={saveEdit}
              isDisabled={!editContent}
              reference={commentRef}
              textareaClassName='ms-12 -mt-4'
            />
      ) : (
        <div className="relative ms-12 -mt-4">
            <p
              ref={textRef}
              className={`${
                !isExpanded ? 'line-clamp-2' : ''
              } whitespace-pre-wrap break-words me-8`}
            >
              {comment.content}
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

      <CommentActions
        isReplying={replyingToComment === comment._id}
        onReply={() => handleReplyClick(comment._id)}
        menuOption={handleMenuClick}
        comment={comment}
      />

      {showOptions && window.innerWidth > 768 && (
        <div ref={menuRef}>
          <OptionsMenu
            onEdit={() => {
              setIsEditing(true);
              setShowOptions(false);
          }}
          onDelete={handleDeleteComment}
        />
        </div>
      )}

      {showOptionsModal && (
        <ModalOptionMenu
          onEdit={() => {
              setIsEditing(true);
              setShowOptionsModal(false);
          }}
          onDelete={handleDeleteComment}
          onClose={() => setShowOptionsModal(false)}
        />
      )}

      {replyingToComment === comment._id && (
        <ReplyForm
          onSubmit={(e) => {
            handleReplySubmit(e, comment._id, replyContent, setReplyContent);
            setReplyingToComment(null)
          }}
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          onCancel={() => {
            setReplyingToComment(null);
            setReplyContent('');
          }}
          inputRef={replyRef}
        />
      )}

      {
        comment.replies.length > 0 && (
          <button 
            className='flex items-center gap-1 hover:bg-zinc-700 px-4 py-1 justify-center text-sky-400 rounded-3xl mt-2 ms-9' 
            onClick={handleIfReplies}
          >
            {ifReplies ? <IoIosArrowUp className='text-lg'/> : <IoIosArrowDown className='text-lg'/>}
            <p>{comment.replies.length}</p>
            {comment.replies.length === 1 ? 'Reply' : 'Replies'}
          </button>
        )
      }

      { ifReplies && comment.replies.filter(Boolean).map((reply) => (
        <Reply
          key={reply._id}
          commentId={comment._id}
          reply={reply}
          handleReplyEdit={handleReplyEdit}
          handleReplyDelete={handleReplyDelete}
        />
      ))}
    </div>
  );
};

export default Comment;
