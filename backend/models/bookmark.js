import mongoose, { Schema } from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogId : {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
}, { timestamps: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
