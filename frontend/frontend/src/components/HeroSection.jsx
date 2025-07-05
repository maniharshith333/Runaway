import React from 'react';

const HeroSection = () => {
  return (
       <div className="relative w-full h-screen">
      {/* Fullscreen Image that fills the container */}
      <img
        src="/runn.png" // Make sure it's in /public
        alt="Hero"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>

  );
};

export default HeroSection;




