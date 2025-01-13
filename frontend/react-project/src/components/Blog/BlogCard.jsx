import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import ProfilePlaceholder from '../Placeholder/ProfilePlaceholder';

function BlogCard({ blog }) {
  const { user } = useUser();  
  const [toggleBookmarkIcon, setToggleBookmarkIcon ] = useState(false);
  

  useEffect(() => {
    if(user) {
      axios
      .get(`http://localhost:5000/bookmarks/${user.userId}`)
      .then((res) => {
        const isBookmarked = res.data.data.data.some((bookmark) => bookmark.blogId._id === blog._id );
        setToggleBookmarkIcon(isBookmarked);
      })
      .catch((e) => {
        console.error('Error fetching bookmark status', e);
      });
    }
  }, [user, blog._id]);

    const handleBookmarkToggle = () => {
    const data = {userId : user.userId, blogId: blog._id};

    if(toggleBookmarkIcon) {
      axios
        .delete(`http://localhost:5000/bookmarks/${user.userId}/${blog._id}`)
        .then(() => {
          setToggleBookmarkIcon(false);
        })
        .catch((e) => console.error('Error removing bookmark:', e));
    } else {
      axios
      .post('http://localhost:5000/bookmarks', data)
      .then(() => {
        setToggleBookmarkIcon(true);
      })
      .catch((e) => {
        console.log("Error bookmarking blog...", e);
      })
    }

  }


    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };        

    return (
        <div className="w-full bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
            <Link to={`/blogs/${blog._id}`} className="block p-4 no-underline">
            <div className="flex items-center gap-2 mb-1">
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
                  <ProfilePlaceholder username={blog.owner?.username || ''}  className='text-lg'/>
              </div>

              {/* Username and Date */}
              <div>
                <h1 className="text-base font-semibold">
                  {blog.owner && blog.owner.username
                    ? blog.owner.username.charAt(0).toUpperCase() + blog.owner.username.slice(1).toLowerCase()
                    : "Unknown Author"}
                </h1>
                <p className="blog-date text-sm text-zinc-300">
                  Posted: {formatDate(blog.createdAt)}
                </p>
              </div>
            </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-200">{blog.title.charAt(0).toUpperCase() + blog.title.slice(1).toLowerCase()}</h2>
                <div className='flex flex-wrap gap-2'>
                  <span className='font-semibold text-xl text-blue-400'>Tags </span> 
                {blog.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className='bg-zinc-700 px-2 py-1 rounded-md'>
                      #{tag}
                    </span>
                ))}
                </div>
            </Link>
            {user && (
              <button className='py-2 px-3 rounded-lg absolute bottom-4 right-5' onClick={handleBookmarkToggle}>
                {toggleBookmarkIcon ? <FaBookmark className='text-xl'/> : <FaRegBookmark className='text-xl'/>
                }
              </button>
            )}
        </div>
  )
}

export default BlogCard