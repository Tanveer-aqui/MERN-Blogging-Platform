import Comment from '../models/comment.js';
import ExpressError from '../utils/ExpressError.js';
import Blog from '../models/blog.js';
import SuccessRes from '../utils/SuccessRes.js';


export const createComment = async(req, res, next) => {    
        let { id } = req.params;
        const { content } = req.body;

        const comment = new Comment({
            content,
            author: req.user._id
        });
        const blog = await Blog.findById(id);
        blog.comments.push(comment)
        await blog.save();

        await comment.save();
        const populatedComment = await comment.populate('author', "username");

        return SuccessRes(res, "Comment is uploaded", populatedComment)
};

export const updateComment = async(req, res,next) => {
        let { commentId } = req.params;
        let { content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {content}, {new : true});
        if (!updatedComment) {
            return next(new ExpressError(404, "Comment not found"));
        }
        return SuccessRes(res, "Comment edited successfully!", updatedComment)
};

export const deleteComment = async(req, res) => {
        let { id, commentId} = req.params;

        await Blog.findByIdAndUpdate(id, {$pull: {comments: commentId}}, {new: true});
        await Comment.findByIdAndDelete(commentId);

        return SuccessRes(res, "Comment deleted successfully")
};

export const createReply = async(req, res, next) => {
        const { commentId } = req.params;
        const { content } = req.body;

        const parentComment = await Comment.findById(commentId);
        const replyComment = new Comment({ 
            content,
            author: req.user._id
        });
        parentComment.replies.push(replyComment);

        await replyComment.save();
        await parentComment.save();

        const populatedReply = await replyComment.populate('author', "username");

        return SuccessRes(res, "Reply added successfully!", populatedReply);
};

export const getReplies = async (req, res) => {
        const { commentId } = req.params;
        const parentComment = await Comment.findById(commentId);

        return SuccessRes(res, "Replies fetched successfully!", parentComment.replies);
};

export const updateReply =async (req, res, next) => {
        const { replyId } = req.params;
        const { content } = req.body;

        const updatedReply = await Comment.findByIdAndUpdate(replyId, { content }, {new: true});
        if (!updatedReply) {
            return next(new ExpressError(404, "Reply not found"));
        }

        return SuccessRes(res, "Reply updated successfully!", updatedReply);
};

export const deleteReply = async (req, res) => {
        const { commentId, replyId } = req.params;

        const parentComment = await Comment.findById(commentId);
        parentComment.replies.pull(replyId);

        await parentComment.save();
        await Comment.findByIdAndDelete(replyId);

        return SuccessRes(res, "Reply deleted successfully!");
};
