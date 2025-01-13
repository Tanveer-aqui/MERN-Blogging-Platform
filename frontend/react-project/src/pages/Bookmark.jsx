import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSpinner } from 'react-icons/fa';
import { MdOutlinePersonOff } from 'react-icons/md';
import Loading from '../components/Loading/Loading';

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    
    useEffect(() => {
      if(user?.userId) {
        setIsLoading(true);
        axios.get(`http://localhost:5000/bookmarks/${user.userId}`)
        .then((res) => {
          setBookmarks(res.data.data.data);
        })
        .catch((e) => {
          console.error("error while showing bookmarked posts...", e);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
    }, [user?.userId])

    const handleRemoveBookmark = (bookmarkId) => {
      axios.delete(`http://localhost:5000/bookmarks/${bookmarkId}`)
      .then(() => {
        setBookmarks(bookmarks.filter((b) => b._id !== bookmarkId));
        toast.success('blog removed from Bookmark')
      })
      .catch(err => console.error('Error removing bookmark:', err));
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };    

    if (user === null) {
      return (
        <div className="flex flex-col items-center mt-44 min-h-screen bg-zinc-900 text-white">
          <MdOutlinePersonOff className="text-6xl sm:text-8xl md:text-9xl lg:text-[100px]" />
          <h2 className="text-2xl font-bold mb-4">Access Denied!</h2>
          <p className="text-lg text-zinc-300 mb-6 text-center px-4">
            You need to be logged in to perform this action.
          </p>
        </div>
      );
    }


    if (isLoading) {
      return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
          <Loading /> 
        </div>
      );
    }

    
  return (
    <div className="container mx-auto px-4 py-8 lg:py-8 lg:px-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Bookmarked Blogs
      </h1>

      {bookmarks && bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 relative"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                {bookmark.blogId.title > 50 ? 
                  `${bookmark.blogId.title.substring(0, 50)}...`
                  : bookmark.blogId.title}
              </h2>
              <p className="text-slate-300 mb-2 text-sm"><span className='font-semibold'>Posted on: </span>{formatDate(bookmark.blogId.createdAt)}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-lg">
                {bookmark.blogId.content.substring(0, 100)}...
              </p>
              <Link
                to={`/blogs/${bookmark.blogId._id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline bottom-0"
              >
                Read More
              </Link>
              <button className='py-2 px-3 rounded-lg absolute bottom-5 right-5' onClick={ () => handleRemoveBookmark(bookmark._id)}><RiDeleteBin6Line className='text-2xl text-red-400'/></button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          You haven’t bookmarked any blogs yet. Explore interesting posts and
          bookmark them for later!
        </p>
      )}
    </div>
  );
};

export default Bookmark;
