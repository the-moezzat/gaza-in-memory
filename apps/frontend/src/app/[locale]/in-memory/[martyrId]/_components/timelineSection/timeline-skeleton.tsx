import React from "react";

const TimelineSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-start">
          <div className="mr-4">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="h-2 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineSkeleton;
