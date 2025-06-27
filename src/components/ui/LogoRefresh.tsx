import React from 'react';

const LogoRefresh = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className="absolute top-4 left-4 cursor-pointer z-50 transition-all duration-200 hover:opacity-75"
      onClick={handleRefresh}
    >
      <img src="/logo-icon.png" alt="Logo" className="h-20 w-20" />
    </div>
  );
};

export default LogoRefresh;