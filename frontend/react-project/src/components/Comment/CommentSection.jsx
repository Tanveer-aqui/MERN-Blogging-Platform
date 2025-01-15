import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useUser } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/blogs`;

function CommentSection({ blogId, initialComments, initialReplies }) {
  const [comments, setComments] = useState(initialComments);
  const [commentContent, setCommentContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);  
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleCommentEdit = (commentId, updatedContent) => {
    axios.patch(`${API_URL}/${blogId}/comments/${commentId}`, { content: updatedContent }, {withCredentials: true})
      .then(() => {
        const updatedComments = comments.map((c) =>
          c._id === commentId ? { ...c, content: updatedContent } : c
        );
        setComments(updatedComments);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const handleDeleteComment = (commentId) => {
    axios.delete(`${API_URL}/${blogId}/comments/${commentId}`, {withCredentials: true})
      .then(() => {
        setComments(comments.filter((c) => c._id !== commentId));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleReplySubmit = (e, parentId, replyContent, setReplyContent) => {
    e.preventDefault();
    axios.post(`${API_URL}/${blogId}/comments/${parentId}/reply`, { content: replyContent }, {withCredentials: true})
      .then((response) => {
        const newReply = response.data.data;        
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === parentId
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment
          )
        );
        setReplyContent('');
      })
      .catch((error) => {
        console.error("Error adding reply:", error);
      });
  };
  
  const handleReplyEdit = (commentId, replyId, updatedContent) => {
    axios.patch(`${API_URL}/${blogId}/comments/${commentId}/reply/${replyId}`, { content: updatedContent }, {withCredentials: true})
      .then(() => {
        setComments((prevComments) =>
          prevComments.map((comment) => ({
            ...comment,
            replies: comment._id === commentId
              ? comment.replies.map((reply) =>
                  reply._id === replyId ? { ...reply, content: updatedContent } : reply
                )
              : comment.replies,
          }))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleReplyDelete = (commentId, replyId) => {
    axios.delete(`${API_URL}/${blogId}/comments/${commentId}/reply/${replyId}`, {withCredentials: true})
    .then(() => {
      setComments((prevComments) => 
        prevComments.map((comment) => ({
          ...comment,
          replies: comment._id === commentId 
            ? comment.replies.filter((reply) => reply._id !== replyId)
            : comment.replies
        }))
      )
    })
    .catch((e) => {
      console.log("Error while deleting", e);
    })
  }
  
  const handleFocus = () => {
    if (!user) {
      navigate('/signup', {state: {from: location.pathname}});      
    } else {
      setIsFocused(true)    
    }
  };

  return (
    <div className="comments-section lg:w-[70%] rounded-md p-2 mr-3 lg:p-4 bg-zinc-900">
      <h2 className='font-semibold text-xl ml-2 mt-4'>
        {comments.length} Comments
      </h2>
      <CommentForm
        onSubmit={(e) => {
          e.preventDefault();
          axios.post(`${API_URL}/${blogId}/comments`, { content: commentContent }, {withCredentials: true})
            .then((res) => {
              const newComment = res.data.data;
              setComments((prevComments) => [...prevComments, newComment]);                
              setCommentContent('');
              setIsFocused(false);
            })
            .catch((e) => console.error("Error submitting comment:", e));
        }}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        onCancel={() => {
          setCommentContent('');
          setIsFocused(false);
        }}
        isFocused={isFocused}
        onFocus={handleFocus}
      />
      {comments.filter(Boolean).map((comment) => (
        <Comment
          key={comment._id}
          blogId={blogId}
          comment={comment}
          initialReplies={initialReplies}
          handleReplySubmit={(e, parentId, replyContent, setReplyContent) =>
            handleReplySubmit(e, parentId, replyContent, setReplyContent)
          }
          handleReplyEdit={handleReplyEdit}
          handleReplyDelete={handleReplyDelete}
          handleCommentEdit={(updatedContent) => handleCommentEdit(comment._id, updatedContent)}
          handleDeleteComment={() => handleDeleteComment(comment._id)}
        />
      ))}
    </div>
  );
}

export default CommentSection;
