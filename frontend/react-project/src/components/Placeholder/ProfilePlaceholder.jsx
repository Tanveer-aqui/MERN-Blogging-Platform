import React from 'react';

const ProfilePlaceholder = ({ username, className }) => {
  const getColorForLetter = (letter) => {
    const colors = {
      A: 'bg-orange-500',
      B: 'bg-pink-500',
      C: 'bg-green-500',
      D: 'bg-blue-600',
      E: 'bg-yellow-500',
      F: 'bg-purple-500',
      G: 'bg-red-500',
      H: 'bg-teal-500',
      I: 'bg-indigo-500',
      J: 'bg-amber-600',
      K: 'bg-lime-500',
      L: 'bg-cyan-500',
      M: 'bg-rose-500',
      N: 'bg-fuchsia-600',
      O: 'bg-emerald-500',
      P: 'bg-violet-500',
      Q: 'bg-sky-500',
      R: 'bg-stone-500',
      S: 'bg-orange-700',
      T: 'bg-pink-700',
      U: 'bg-green-700',
      V: 'bg-blue-700',
      W: 'bg-yellow-700',
      X: 'bg-purple-700',
      Y: 'bg-red-700',
      Z: 'bg-teal-700',
    };

    const upperLetter = letter?.toUpperCase() || 'U';
    return colors[upperLetter] || 'bg-zinc-700';
  };

  const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';
  const bgColor = getColorForLetter(firstLetter);

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${bgColor} ${className}`}>
      {firstLetter}
    </div>
  );
};

export default ProfilePlaceholder;
