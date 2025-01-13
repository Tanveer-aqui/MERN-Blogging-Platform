import mongoose from "mongoose";
import Comment from "./comment.js";

const Schema = mongoose.Schema;
const Model = mongoose.model;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image : {
        type: String,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    tags: [
        {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

blogSchema.index({title: 'text'});

blogSchema.post("findOneAndDelete", async function(blog) {
    if(blog) {
        await Comment.deleteMany({_id: {$in: blog.comments}})
    }
})

const Blog = Model("Blog", blogSchema);

export default Blog;