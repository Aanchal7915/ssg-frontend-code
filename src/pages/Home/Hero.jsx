import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://b2c-contenthub.com/wp-content/uploads/2025/09/air_colour_options.png?w=1200",
  "https://www.denon.com/on/demandware.static/-/Sites-master-catalog-soundunited/default/dw9c571860/denon/PDP_images/HeadphonesWirelessEarbuds/DenonNoiseCancellingEarbuds-White/HeroBanner-Mobile_Denon-Noise-Cancelling-Earbuds-White.jpg",
  "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495",
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 overflow-hidden bg-white">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6">
          Step Into the <br />
          <span className="text-[#54B1CE]">Future of Wholesale</span>
        </h1>
        <p className="text-neutral-600 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
          High-quality products, consistent service, and a marketplace that
          works for your business.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#54B1CE] hover:bg-[#3b92ad] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
        >
          SHOP NOW
        </button>
      </div>

      {/* Right Content - 3D Blob with auto-sliding images */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-10 md:mt-0">
        {/* Layered floating blobs for 3D effect */}
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full bg-[#54B1CE]/30 blur-2xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[360px] h-[360px] rounded-full bg-[#54B1CE]/40 blur-xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top blob with product image */}
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-80 md:w-[420px] lg:w-[480px] relative z-10"
        >
          <defs>
            <clipPath id="blobMask" clipPathUnits="objectBoundingBox">
              <path
                d="M0.92,0.56C0.89,0.67,0.8,0.75,0.69,0.81C0.58,0.87,0.46,0.92,0.34,0.87C0.22,0.83,0.11,0.7,0.06,0.56C0,0.42,0,0.26,0.09,0.15C0.18,0.04,0.36,-0.01,0.52,0.01C0.69,0.03,0.85,0.11,0.92,0.23C1,0.34,0.95,0.46,0.92,0.56"
                transform="scale(1)"
              />
            </clipPath>
          </defs>
          <AnimatePresence mode="wait">
            <motion.image
              key={currentIndex}
              href={images[currentIndex]}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#blobMask)"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </svg>

        {/* Dots under blob */}
        <div className="flex gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#54B1CE] w-5" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
