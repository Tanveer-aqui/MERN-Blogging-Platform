import React from 'react'
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import comeBackLater from '../../assets/come_back_later.png'

function BlogList({ blogs, isTagFiltered }) {
    if (blogs.length === 0) {
        return (
            <div className="flex flex-col py-2 px-4">
                <div className="text-zinc-200 font-semibold text-2xl mb-2">
                    {isTagFiltered ? (
                        <>
                            <div>
                                No blogs found for <span className="text-blue-50 bg-blue-950 px-4 py-1 rounded-full text-xl">#{isTagFiltered}</span>. 
                            </div>
                            <p className="text-lg text-gray-400 mt-2">Try exploring other topics!</p>
                            <Link to="/blogs" className='mt-6'>
                                <button
                                className="mt-6  font-medium px-5 py-1.5 border-2 text-base border-white text-white rounded-3xl hover:bg-white hover:text-black transition duration-200"
                                >
                                    Browse Topics
                                </button>
                                
                            </Link>
                        </>
                    ) : (
                        <>
                        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-zinc-950 to-zinc-900 rounded-lg shadow-lg text-center space-y-3">
                            <p className="text-3xl font-bold text-white drop-shadow-lg">Oops! No blogs to show. Check back soon!</p>
                            <img 
                            src={comeBackLater} 
                            alt="404 Not Found" 
                            className="w-20 h-20" 
                            />
                        </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4">
            {blogs.map((blog, index) => (
                <BlogCard key={blog._id || index} blog={blog} />
            ))}
        </div>
    )
}

export default BlogList;
