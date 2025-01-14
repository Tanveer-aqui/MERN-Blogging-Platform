import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogList from '../components/Blog/BlogList';
import SideContainer from '../components/Containers/SideContainer';
import Loading from '../components/Loading/Loading';

function Home() {
    const [blogs, setBlogs] = useState([]);   
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        axios.get(`${import.meta.env.BACKEND_API_URL}/blogs`)
            .then((res) => {
                setBlogs(res.data.data);                
            })
            .catch((e) => {
                console.error('Error fetching blogs:', error);
                toast.error("Error fetching blogs!");
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <div className="container mx-auto px-4 py-0 lg:py-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-[22%]">
                    <SideContainer />
                </div>
                <div className="lg:w-1/2">
                    {loading ? (
                            <Loading/>
                        ) : (
                            <BlogList blogs={blogs} />
                        )}
                </div>
            </div>
        </div>
    );
}

export default Home;
