import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
});


commentSchema.post("findOneAndDelete", async function (comment) {
    if (comment) {
        await Comment.deleteMany({ _id: { $in: comment.replies } });            
    }
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment