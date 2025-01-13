import React, { forwardRef } from 'react'

const Input = forwardRef(({
    label,
    name, 
    type = 'text',
    value,
    placeholder,
    onChange,
    disabled = false,
    className = "",
    ...props
}, ref) =>  {
  return (
    <div>
        <label 
            htmlFor={name}
            className="block text-base font-bold text-gray-200 mb-2"
        >
            {label}
        </label>
        <input
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            id={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition duration-200 mb-2
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...props}
            />
    </div>
  )
});

export default Input