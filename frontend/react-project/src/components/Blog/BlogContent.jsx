import React, { useState } from 'react';
import Tags from '../Tags/Tags.jsx';
import BlogButtonGroup from '../Buttons/BlogButtonGroup.jsx';
import { useUser } from '../../context/UserContext.jsx';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder.jsx';


const BlogContent = ({ blog, handleModal }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const {user} = useUser();

  const handleIsOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  }  
  
  return (
    <div className="blog-section lg:w-[70%] rounded-md p-4 bg-zinc-800/50 relative">
      <div className="flex items-center gap-4 mb-4">
        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
            <ProfilePlaceholder username={blog.owner?.username || ''} className='text-lg'/>
        </div>

        {/* Username and Date */}
        <div>
          <h1 className="text-xl font-semibold">
            {blog.owner && blog.owner.username
              ? blog.owner.username.charAt(0).toUpperCase() + blog.owner.username.slice(1).toLowerCase()
              : "Unknown Author"}
          </h1>
          <p className="blog-date text-sm text-zinc-300">
            Posted: {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: '2-digit',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    <h1 className="blog-title font-extrabold text-4xl me-10 break-words">
      {blog.title && blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
    </h1>

    <img src={blog.image} alt="" className="rounded-md my-4" />

    <div className="blog-content whitespace-pre-wrap text-xl lg:text-lg">
        {blog.content}
    </div>
    
    <Tags tags={blog.tags}/>

    { user && blog.owner && user.userId === blog.owner._id && (
      <BlogButtonGroup
      isOpenMenu={isOpenMenu}
      handleIsOpenMenu={handleIsOpenMenu}
      blogId={blog._id}
      handleModal={handleModal}
    />
    )}

  </div>
  )
};

export default BlogContent;