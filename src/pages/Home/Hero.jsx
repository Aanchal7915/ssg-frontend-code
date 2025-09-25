import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen bg-neutral-100 flex items-center justify-center">
      {/* Background container with image */}
      <div className="absolute inset-0 z-0">
        <img
          src="back.jpg"
          alt="A collection of natural products like brushes and creams"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent overlay to make text more readable */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Main content container with text and button */}
      <div className="relative z-10 w-11/12 md:w-3/4 lg:w-1/2 p-8 bg-white/70 backdrop-blur-sm rounded-lg shadow-xl text-center">
        <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-neutral-800 mb-4 tracking-wide">Hello!</h1>
        <p className="font-sans text-neutral-700 text-sm sm:text-base mb-6 leading-relaxed">
          Wholesale website should reflect this by ensuring consistent quality, reliable service, and transparent communication.
        </p>
        <button
        onClick={() => navigate('/products')}
         className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Hero;