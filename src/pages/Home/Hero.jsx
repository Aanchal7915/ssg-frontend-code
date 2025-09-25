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
                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 opacity-90"></div>
            </div>

            {/* Main content container with text and button */}
            <div className="relative z-10 w-11/12 md:w-3/4 lg:w-1/2 p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl text-center border border-[#bae6fd]">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2563eb] mb-4 tracking-wide drop-shadow-lg">
                    Welcome to E-Com Wholesale!
                </h1>
                <p className="font-sans text-[#334155] text-base sm:text-medium mb-6 leading-relaxed font-medium drop-shadow">
                    Discover top-quality products, reliable service, and transparent communication. 
                    Shop with confidence and elevate your business with our exclusive wholesale deals!
                </p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#38bdf8] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 border border-[#bae6fd]"
                >
                    SHOP NOW
                </button>
            </div>
        </div>
    );
};

export default Hero;