import express from 'express'
import Bookmark from "../models/bookmark.js";
import SuccessRes from "../utils/SuccessRes.js";
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.post('/', wrapAsync(async(req, res) => {
    const { userId, blogId } = req.body;

    const exixtingBookmark = await Bookmark.findOne({ userId, blogId });
    if(exixtingBookmark) {
        return SuccessRes(res, "Blog alreasy bookmarked!", {data: exixtingBookmark});
    }
    const bookmark = new Bookmark({userId, blogId});
    await bookmark.save();
    SuccessRes(res, "Blog bookmarked!");
}))

router.get('/:userId', wrapAsync(async(req, res) => {
    const { userId } = req.params;
    const bookmarks = await Bookmark.find({userId}).populate('blogId');
    SuccessRes(res, "Bookmarked posts!", {data: bookmarks})
}))

router.delete('/:id', wrapAsync(async(req, res) => {
    await Bookmark.findByIdAndDelete(req.params.id);
    SuccessRes(res, "Bookmark removed!");
}))

router.delete('/:userId/:blogId', wrapAsync(async(req, res) => {
    const { userId, blogId } = req.params;
    const deletedBookmark = await Bookmark.findOneAndDelete({userId, blogId});
    if (!deletedBookmark) {
        return res.status(404).json({message: "Bookmark not found" });
    }
    SuccessRes(res, "Bookmark removed!");
}))

export default router;