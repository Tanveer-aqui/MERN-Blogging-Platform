import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <FaSpinner className="animate-spin text-blue-500 text-6xl" />
            
            <p className="text-lg font-semibold text-gray-300">
                Loading, please wait...
            </p>
        </div>
    );
}

export default Loading;
