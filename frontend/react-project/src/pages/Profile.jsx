import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfilePlaceholder from '../components/Placeholder/ProfilePlaceholder';
import { MdOutlinePersonOff } from 'react-icons/md';
import Loading from '../components/Loading/Loading';

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;

const Profile = () => {
  const {user} = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user) {
      setLoading(true);
      axios
      .get(`${API_URL}/users/${user.userId}/posts`)
      .then((res) => {
        setPosts(res.data.data.data);
      })
      .catch((e) => {
        console.log("Error while fetching data: " , e);
      })
      .finally(() => {
        setLoading(false); 
      });
    } else {
      setLoading(false);
    }
  }, [user])

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

if(loading) {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <Loading /> 
    </div>
  );
}

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-6 mb-6">
              <ProfilePlaceholder username={user?.username || ''} className='w-16 h-16 text-2xl'/>
          
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-zinc-300">Email : {user.email}</p>
          </div>
        </div>
        <div className="flex justify-between bg-zinc-800 p-4 rounded-lg">
          <div className='flex items-center gap-2'>
            <h2 className="text-xl font-bold">{posts.length}</h2>
            <p className="text-zinc-300">{posts.length === 1 ? 'Post' : 'Posts'}</p>
          </div>
        </div>
        <div className='mt-3'>
          {posts.length ? (
            <div className="space-y-3">
              {posts.map(post => (
                <Link key={post._id} to={`/blogs/${post._id}`}>
                  <div key={post._id} className="p-4 bg-zinc-800 rounded-lg mt-3">
                    <h3 className="text-xl font-bold">{post.title.charAt(0).toUpperCase() + post.title.slice(1).toLowerCase()}</h3>
                    <p className="text-base lg:text-sm text-zinc-400">
                      Posted on: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-zinc-300 mt-2">{post.content.slice(0, 100)}...</p>
                    <div className="mt-2 text-sm text-blue-400">
                        <span className='font-semibold'>Tags:</span> #{post.tags.join(', #')}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1 font-semibold">
                      Comments: {post.comments.length}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            ) : (
            <p className="text-zinc-300 text-center mt-6">You haven't written any blogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
