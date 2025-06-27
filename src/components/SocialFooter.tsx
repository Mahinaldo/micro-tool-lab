import React, { useState } from 'react';

const SocialFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none"
        aria-label="Open social links"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col items-end space-y-3 transition-all duration-300 ease-out transform origin-bottom-right scale-100 opacity-100">
          {/* Social Icons */}
          <div className="flex flex-col space-y-2">
            <a href="[Your Fiverr Profile Link]" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fiverr"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>

            </a>
            <a href="[Your Upwork Profile Link]" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upwork"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>

            </a>
            <a href="[Your LinkedIn Profile Link]" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>

            </a>
            <a href="[Your Hashnode Profile Link]" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center space-x-2">
            <svg width="31" height="31" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1221)">
<path d="M28.8702 10.3578L20.6422 2.12993C19.2785 0.766158 17.4288 0 15.5001 0C13.5714 0 11.7218 0.766158 10.358 2.12993L2.13007 10.3578C0.766295 11.7216 0.000137329 13.5713 0.000137329 15.5C0.000137329 17.4286 0.766295 19.2783 2.13007 20.6421L10.358 28.87C11.7218 30.2338 13.5714 30.9999 15.5001 30.9999C17.4288 30.9999 19.2785 30.2338 20.6422 28.87L28.8702 20.6421C30.2339 19.2783 31.0001 17.4286 31.0001 15.5C31.0001 13.5713 30.2339 11.7216 28.8702 10.3578V10.3578ZM15.5001 20.6059C14.8296 20.6059 14.1656 20.4739 13.5461 20.2173C12.9267 19.9607 12.3638 19.5846 11.8897 19.1104C11.4155 18.6363 11.0394 18.0734 10.7828 17.4539C10.5262 16.8345 10.3942 16.1705 10.3942 15.5C10.3942 14.8294 10.5262 14.1655 10.7828 13.546C11.0394 12.9265 11.4155 12.3636 11.8897 11.8895C12.3638 11.4154 12.9267 11.0393 13.5461 10.7827C14.1656 10.5261 14.8296 10.394 15.5001 10.394C16.8543 10.394 18.153 10.932 19.1106 11.8895C20.0681 12.8471 20.6061 14.1458 20.6061 15.5C20.6061 16.8542 20.0681 18.1529 19.1106 19.1104C18.153 20.068 16.8543 20.6059 15.5001 20.6059Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_1_1221">
<rect width="31" height="31" fill="black"/>
</clipPath>
</defs>
</svg>

</a>
          </div>

          {/* Buy Me a Coffee Button */}
          <a href="[Your Buy Me a Coffee Link]" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-800 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coffee"><path d="M10 2a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2h-4z"/><path d="M6 6v2"/><path d="M18 6v2"/><path d="M12 6v2"/></svg>

          </a>
        </div>
      )}
    </div>
  );
};

export default SocialFooter;