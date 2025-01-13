import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteModal from '../components/Modal/DeleteModal';
import BlogContent from '../components/Blog/BlogContent';
import CommentSection from '../components/Comment/CommentSection';
import Loading from '../components/Loading/Loading';

const API_URL = "http://localhost:5000/blogs";

const Show = () => {
  const [blog, setBlog] = useState({});
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBlogData = () => {
    axios.get(`${API_URL}/${id}`)
      .then((res) => {
        setBlog(res.data.blog); 
        setError('');       
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Unable to load blog post.This could be due to server issues or network problems. Please check your connection or try again later."
        );
        toast.error("Failed to load blog post. Please try again later.", {
          position: "top-right", 
          autoClose: 3000, 
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });        
      })
      .finally(() => {
        setLoading(false);
      })
  };


  const handleDelete = () => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        toast.success("Blog post deleted successfully", {
          position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
        });
        navigate('/blogs');
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete blog post. Please try again later.");
      });
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);


  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal]);

  return (
    <>
      <div className="px-3 lg:px-20 pt-3 flex flex-col w-full gap-2">
      {error ? (
          <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg lg:w-1/2 mx-auto text-center">
          <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
          <p className="mt-4 text-lg">{error}</p>
          <button
            onClick={fetchBlogData}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Retry
          </button>
        </div>
        ) : (
          <>
            {loading ? (
              <Loading/>
            ) : (
              <>
                <BlogContent blog={blog} handleModal={() => setModal(true)}/>
                <CommentSection blogId={id} initialComments={blog.comments || []} />
              </>
            )}
          </>
        )}
      </div>
      
      {modal && (
        <DeleteModal 
          onDelete={handleDelete} 
          onClose={() => setModal(false)} 
        />
      )}
    </>
  );
};

export default Show;