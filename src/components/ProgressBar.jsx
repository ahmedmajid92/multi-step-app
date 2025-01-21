import React from 'react';

const ProgressBar = ({ step }) => {
  const progress = `${(step / 3) * 100}%`; // Dynamic width based on step

    return (
        <div className="w-full bg-gray-200 h-4 rounded-full">
        <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: progress }}
        ></div>
        </div>
    );
};

export default ProgressBar;
