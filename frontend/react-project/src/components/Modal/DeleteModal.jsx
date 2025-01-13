import React from 'react';

const DeleteModal = ({ onDelete, onClose }) => (
  <>
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}
    />
    
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-lg z-50 p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Delete Blog Post
      </h2>
      
      <p className="text-zinc-600 dark:text-zinc-300 mb-6">
        Are you sure you want to delete this blog post? This action cannot be undone.
      </p>
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </>
);

export default DeleteModal;