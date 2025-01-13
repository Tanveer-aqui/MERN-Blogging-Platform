import express from "express";
import wrapAsync from "../utils/wrapAsync.js"
import { 
      isLoggedIn, 
      isOwner, 
      validateBlog, 
      validateBlogBody 
} from "../middleware.js";
import { upload } from "../cloudinary.js";
import { 
      createBlog, 
      deleteBlog, 
      getAllBlogs, 
      getBlogById, 
      getBlogByTag, 
      searchBlogs, 
      updateBlog, 
      uploadImage 
} from '../controllers/blog.js'

const router = express.Router();


// Blogs Routes
router.route("/")
      .get(wrapAsync(getAllBlogs))
      .post(isLoggedIn, validateBlogBody,wrapAsync(createBlog));

// Image Upload
router.post("/upload", isLoggedIn, upload.single("image"), uploadImage);

// Search Blogs
router.get("/search", wrapAsync(searchBlogs));
  
// Blog by ID Routes
router.route("/:id")
      .get(validateBlog, wrapAsync(getBlogById))
      .patch(validateBlog, isLoggedIn,isOwner, validateBlogBody, upload.single('image'), wrapAsync(updateBlog))
      .delete(validateBlog, isLoggedIn, isOwner, wrapAsync(deleteBlog));

// Blogs by Tag
router.get('/tag/:tagName', wrapAsync(getBlogByTag));

export default router;