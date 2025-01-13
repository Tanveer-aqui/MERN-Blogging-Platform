import React, { forwardRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const TagInput = forwardRef(({
    label,
    tags,
    maxTags = 10,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    error,
    onChange,
    ...props
}, ref) => {
    return (
        <div className="space-y-2">
            <label className="block text-base font-bold text-gray-200 mb-2">
                {label} <span className="ml-2">{tags.length}/{maxTags}</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-zinc-700 text-white px-3 py-1 rounded-full cursor-pointer flex items-center gap-1"
                        onClick={() => handleRemoveTag(tag)}
                    >
                        #{tag} <IoCloseSharp className="text-sky-300" />
                    </span>
                ))}
                <input
                    ref={ref}
                    type="text"
                    placeholder="Enter a tag and press Enter"
                    value={tagInput}
                    onChange={onChange}
                    onKeyDown={handleAddTag}
                    className={`w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white 
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition duration-200 mb-2`}
                    {...props}
                />
            </div>
            {error && <p className="text-[#FF6961] font-normal text-base mt-2 ml-2">{error}</p>}
        </div>
    );
});

export default TagInput;
