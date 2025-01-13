import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogList from '../components/Blog/BlogList';


const API_URL = "http://localhost:5000/blogs";

const TagPosts = () => {
    const [tag, setTag] = useState('');
    const [blogs, setBlogs] = useState('');
    const {tagName} = useParams();
    useEffect(() => {
        axios.get(`${API_URL}/tag/${tagName}`)
        .then((res) => {
            setTag(tagName);
            setBlogs(res.data.data.data);
        })
        .catch((e) => {
            console.log("Error while fetching tag", e);
        })
    }, [])
  return (
    <div className='mx-3'>
        <div className="w-full lg:w-1/2 lg:ml-12 mb-3 text-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 py-4 px-4 lg:py-6 lg:px-4">
        <h1 className="text-3xl font-extrabold text-zinc-300 flex gap-2 items-center">
            Showing results for {tag}
        </h1>
        </div>
        <div className="w-full lg:w-1/2 lg:ml-16 mb-3 text-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <BlogList blogs={blogs} isTagFiltered={tag}/>
        </div>
    </div>

  )
}

export default TagPosts