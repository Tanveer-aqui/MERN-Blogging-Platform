import Blog from "../models/blog.js"
import ExpressError from "../utils/ExpressError.js";
import SuccessRes from "../utils/SuccessRes.js"


export const getAllBlogs = async(req, res) => {
            const { tag } = req.query;
            let filter = {};
            if (tag) {
                  filter.tags = tag.toLowerCase().trim();
            }
            
            const blogs = await Blog.find({})
            .select('title content tags createdAt')
            .populate('owner', 'username -_id');
            const blogCount = blogs.length;
            res.status(200).json({
            blogCount: blogCount,
            data: blogs,
            });
};

export const createBlog = async(req, res, next) => {            
            const {title, content, image, tags} = req.body;

            const processedTags = tags ? tags.map(tag => tag.replace(/^#/, '').toLowerCase().trim()) : [];
            const newBlog = new Blog({
                  title, 
                  content, 
                  image, 
                  tags : processedTags,
                  owner: req.user._id
            });      
            
            await newBlog.save();
            return res.status(201).json({message: "Blog created successfully", data: newBlog});      
};

export const uploadImage =  (req, res) => {
      try {
            const imageUrl = req.file.path;
            res.status(200).json({ imageUrl });
      } catch(err) {
            console.error("Error uploading image", err)
            return res.status(400).json({ message: "No file uploaded" });
      }
};


export const searchBlogs = async (req, res) => {
            const { search } = req.query;
      
            if (!search || search.trim() === "") {
            return res.status(400).json({ message: "Search query is required" });
            }
      
            const searchRegex = new RegExp(search, "i");
            const filter = {
            $or: [
                  { title: { $regex: searchRegex } },
            ]
            };
      
            const blogs = await Blog.find(filter)
            .select("title content tags createdAt")
            .populate('owner', "username -_id");
            const blogCount = blogs.length;
            return SuccessRes(res, `Blogs based on search ${search}`, {blogCount, data: blogs})
};
  
export const getBlogById = async(req, res) => {
            const {id} = req.params;
            const blog = await Blog.findById(id)
            .select('title content image tags createdAt updatedAt')
            .populate({
                  path: 'comments',
                  select: 'content author createdAt likes',
                  populate: [
                        { 
                              path: 'author',
                              select: 'username'
                        },
                        { 
                              path: 'replies', 
                              select: 'content author createdAt',
                              populate: { 
                                    path: 'author',
                                    select: 'username'
                              } 
                        } 
                  ]
            }).populate("owner", 'username');
            return res.status(200).json({blog});
};


export const updateBlog = async(req, res, next) => {
            const { id } = req.params;
            const { title, content, image, tags } = req.body;

            const processedTags = tags ? tags.map(tag => tag.replace(/^#/, '').toLowerCase().trim()) : [];
            const updatedFields = {
                  title, 
                  content, 
                  image,
                  tags : processedTags
            };

            if(req.file) {
                  updatedFields.image = `/upload/${req.file.filename}`;
            }

            const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields);
            if(!updatedBlog) {
                  return next(new ExpressError(404, "Blog not found"));
            }

            return SuccessRes(res, "Updated blog successfully", updatedBlog)
};


export const deleteBlog = async(req, res) => {
            const {id} = req.params;
      
            const deletedBlog = await Blog.findByIdAndDelete(id);
            if(!deletedBlog) {
            return next(new ExpressError(404, "Blog not found!"));
            }
      
            return SuccessRes(res, "Successfully deletd blog", deletedBlog);
};

export const getBlogByTag = async(req, res) => {
            const { tagName } = req.params;
            const blogs = await Blog.find({tags: tagName})
            .select('title content tags createdAt')
            .populate('owner', 'username -_id');
            const blogsCount = blogs.length;
            return SuccessRes(res, "Blogs related to the tag", { blogsCount, data: blogs });
};