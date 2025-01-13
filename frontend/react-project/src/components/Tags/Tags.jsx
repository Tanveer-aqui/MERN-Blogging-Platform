import { Link } from "react-router-dom";

const Tags =({ tags }) => {
    if(!tags || tags.length === 0) return null;
        
    return (
      <div className="my-5">
        <h2 className="font-bold text-2xl">Tags</h2>
        <div className="tags flex flex-wrap gap-2 mt-2">
          {
            tags.map((tag, index) => (
              <Link to={`/blogs/tag/${tag}`} key={index}>
                <span 
                className="tag bg-zinc-700 text-white px-2 py-1 rounded-md"
                >
                  #{tag}
                </span>
              </Link>
            ))
          }
        </div>
      </div>
    )
}

export default Tags;