import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { 
    isCommentAuthor, 
    isLoggedIn, 
    isReplyAuthor, 
    validateBlog, 
    validateComment, 
    validateCommentBody, 
    validateReply 
} from '../middleware.js';
import { 
    createComment, 
    createReply, 
    deleteComment, 
    deleteReply, 
    getReplies, 
    updateComment, 
    updateReply 
} from '../controllers/comment.js';

const router = express.Router({mergeParams: true});

// create comment
router.post("/", validateBlog, isLoggedIn, validateCommentBody, wrapAsync(createComment));

// update & delete comment
router.route("/:commentId")
    .patch( validateBlog, validateComment, isLoggedIn, isCommentAuthor, validateCommentBody, wrapAsync(updateComment))
    .delete( validateBlog, validateComment, isLoggedIn, isCommentAuthor, wrapAsync(deleteComment));

//create & fetching reply
router.route("/:commentId/reply")
    .post( validateBlog, validateComment, isLoggedIn, validateCommentBody, wrapAsync(createReply))
    .get( validateBlog, validateComment, wrapAsync(getReplies));

//update & delete reply
router.route("/:commentId/reply/:replyId")
    .patch( validateBlog, validateComment, validateReply, isLoggedIn, isReplyAuthor, validateCommentBody, wrapAsync(updateReply))
    .delete( validateBlog, validateComment, validateReply, isLoggedIn, isReplyAuthor, wrapAsync(deleteReply));


export default router;