import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
    label,
    name,
    value,
    placeholder,
    maxWords = 5000,
    onChange,
    rows = 3,
    required = false,
    disabled = false,
    wordLimitError = "",
    error = "",
    className = "",
    ...props
}, ref) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-base font-bold text-gray-200 mb-2"
            >
                {label}
            </label>
            <textarea
                ref={ref}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows={rows}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition duration-200 
                    resize-y min-h-[200px] scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 
                    scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${className}`}
                {...props}
            />
            <div className="flex justify-between items-center text-base w-full">
                {value.length > 4500 && (
                    <span className='text-zinc-200 ml-2'>
                        {value.length}/{maxWords}
                    </span>
                )}
                {value.length > maxWords && (
                    <p className="text-[#FF6961] font-normal ml-2">{wordLimitError}</p>
                )}
            </div>
        </div>
    );
});

export default Textarea;
