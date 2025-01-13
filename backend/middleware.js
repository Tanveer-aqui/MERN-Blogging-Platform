import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import Blog from "./models/blog.js";
import Comment from "./models/comment.js";
import { blogSchema, commentSchema } from "./schema.js";

export const validateBlog = async(req, res, next) => {
    let { id } = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ExpressError(400, "Blog ID not valid"))
    }
  
    const blog = await Blog.findById(id);
    if(!blog) {
        return next(new ExpressError(404, "Blog not found"));
    }
  
    next()
}  

export const validateComment = async(req, res, next) => {
    let { commentId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return next(new ExpressError(400, "Comment ID not valid"))
    }

    const comment = await Comment.findById(commentId);
    if(!comment) {
        return next(new ExpressError(404, "Comment not found"));
    }
    next();
}

export const validateReply = async(req, res, next) => {
    let { replyId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(replyId)) {
        return next(new ExpressError(400, "Reply ID not valid"))
    }

    const reply = await Comment.findById(replyId);
    if(!reply) {
        return next(new ExpressError(404, "Reply not found"));
    }
    next();
}

export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({message: "Unauthorized! Please log in."})
}   

export const validateBlogBody = (req, res, next) => {
    const {error} = blogSchema.validate(req.body, {abortEarly: false});
    if(error) {
        const errorMessage = error.details
            .map((err) => err.message)
            .join(", ");
        return next(new ExpressError(400, errorMessage));
    }
    next();
}

export const validateCommentBody = (req, res, next) => {
    const {error} = commentSchema.validate(req.body, {abortEarly: false});
    if(error) {
        const errorMessage = error.details
            .map((err) => err.message)
            .join(", ");
        return next(new ExpressError(400, errorMessage));
    }
    next();
}

export const isOwner = async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if(!blog.owner.equals(req.user._id)) {
        return next(new ExpressError(403, "You are not authorized to perform this action."))
    }

    next();
}


export const isCommentAuthor = async(req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if(!comment.author.equals(req.user._id)) {
        return next(new ExpressError(403, "You are not authorized to perform this action."))
    }

    next();
}

export const isReplyAuthor = async(req, res, next) => {
    const { replyId } = req.params;
    const reply = await Comment.findById(replyId);

    if(!reply.author.equals(req.user._id)) {
        return next(new ExpressError(403, "You are not authorized to perform this action."))
    }

    next();
}