import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spinner */}
        <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        
        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
