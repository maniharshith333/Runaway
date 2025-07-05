import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden">
      {/* Fullscreen Fixed Video */}
      <video
        className="w-full h-full object-cover"
        src="/runawayy.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Centered Title */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-black text-6xl sm:text-8xl md:text-9xl font-bold text-center drop-shadow-lg">
          RUNAWAY.
        </h1>
      </div>

      {/* Bottom Centered Button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <Link to="/home">
          <button className="px-6 py-3 bg-transparent text-white border border-white rounded-md text-lg font-semibold transition-all duration-500 relative group overflow-hidden">
            <span className="relative z-10 group-hover:text-black">
              Shop Now
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-md"></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

