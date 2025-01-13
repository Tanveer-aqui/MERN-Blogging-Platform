import React from 'react';
import { Link } from 'react-router-dom';

const PopularTags = () => {
  const tags = [
    "Technology", 
    "Travel", 
    "Health", 
    "Education", 
    "Lifestyle", 
    "Programming", 
    "Design", 
    "Food", 
    "Business", 
    "Fitness", 
    "Entertainment", 
    "Science", 
    "Finance", 
    "Marketing", 
    "Gaming", 
    "Art", 
    "Music", 
    "Politics", 
    "Sports", 
    "Psychology", 
    "Sustainability", 
    "Parenting", 
    "Culture", 
    "Fashion", 
    "Environment",
  ];
  

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Popular Tags</h1>
        <p className="text-zinc-300 mb-6">
          Discover trending topics and explore blog posts associated with popular tags.
        </p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blogs/tag/${tag.toLowerCase()}`}
              className="px-4 py-2 bg-zinc-800 hover:bg-blue-600 text-zinc-300 hover:text-white rounded-lg transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
