import React from 'react';

const Shimmer = () => {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {Array(6).fill(0).map((_, idx) => (
        <div key={idx} className="w-36 md:w-56 h-52 bg-gray-800 rounded-lg animate-pulse mb-2">
          <div className="w-full h-40 bg-gray-700 rounded-t-lg animate-pulse"></div>
          <div className="h-4 bg-gray-700 mt-2 mx-2 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-700 mt-1 mx-2 rounded w-2/3 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
