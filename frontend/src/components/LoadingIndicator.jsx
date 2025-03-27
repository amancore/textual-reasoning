
import React from "react";
const LoadingIndicator = ({ variant = "dots" }) => {
  if (variant === "bar") {
    return (
      <div className="relative w-full h-1 bg-secondary overflow-hidden rounded-full">
        <div className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-indigo-600 to-purple-600 animate-loader"></div>
      </div>
    );
  }

  return (
    <div className="flex space-x-1.5 px-2 py-1">
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-minimal" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce-minimal" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce-minimal" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
};

export default LoadingIndicator;