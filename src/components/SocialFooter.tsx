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
            <a href="https://www.fiverr.com/sellers/fswd_mahin" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-2">
              <img src="/src/assets/fiverr.svg" alt="Fiverr" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
            <a href="https://www.upwork.com/freelancers/~01a1a7ba7908db12ad" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 flex items-center space-x-2">
              <img src="/src/assets/upwork.svg" alt="Upwork" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
            <a href="https://www.linkedin.com/in/mahinur-rahman-a986612b7/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 flex items-center space-x-2">
              <img src="/src/assets/linkedin.svg" alt="LinkedIn" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
            <a href="https://hashnode.com/@FSWDmahin" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center space-x-2">
              <img src="/src/assets/hashnode.svg" alt="Hashnode" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
            <a href="https://instagram.com/aint.mahin" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center space-x-2">
              <img src="/src/assets/instagram.svg" alt="Instagram" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
            <a href="https://github.com/Mahinaldo" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center space-x-2">
              <img src="/src/assets/github.svg" alt="Github" className="h-8 w-8 flex-shrink-0 object-contain" />
            </a>
          </div>

          {/* Buy Me a Coffee Button */}
          <a href="[Your Buy Me a Coffee Link]" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-800 rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center">
            <img src="/src/assets/buy-me-a-coffee.svg" alt="Buy Me a Coffee" className="h-8 w-8 flex-shrink-0 object-contain" />
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialFooter;