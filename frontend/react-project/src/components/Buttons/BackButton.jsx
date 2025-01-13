import React from 'react';
import { Link } from 'react-router-dom';

function BackButton({ to, className = '' }) {
  return (
    <Link to={to}>
      <button
        className={`bg-white text-black py-2 px-4 rounded border border-black hover:bg-gray-200 ${className}`}
      >
        Back
      </button>
    </Link>
  );
}

export default BackButton;
