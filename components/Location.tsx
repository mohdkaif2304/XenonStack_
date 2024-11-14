"use client"
import React from 'react';

const Location = () => {
  return (
    <div className="container px-4 md:px-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="flex items-center space-x-4 bg-white dark:bg-gray-900 px-4">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-1 w-1 rounded-full bg-primary opacity-75"></div>
            <div className="h-1 w-1 rounded-full bg-primary opacity-50"></div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Available Properties
            </span>
            <div className="h-1 w-1 rounded-full bg-primary opacity-50"></div>
            <div className="h-1 w-1 rounded-full bg-primary opacity-75"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
