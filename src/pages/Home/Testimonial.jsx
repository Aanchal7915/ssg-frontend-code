import React from 'react';

const Testimonial = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center text-white" style={{
      backgroundImage: `url("/testimonial.jpg")`,
      // Using a placeholder image for the background. You should replace this with a direct URL to your 'heyyy.jpg' image.
    }}>
      <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 space-y-6 bg-transparent">
        <p className="uppercase text-sm tracking-widest font-semibold text-gray-200">
          Explore More Products
        </p>
        <h1 className="text-4xl md:text-7xl font-bold font-serif leading-tight">
          Everything you love in one place
        </h1>
        <div className="w-24 h-1 bg-white rounded-full"></div>
        <p className="text-base md:text-xl max-w-lg font-light text-gray-300">
          Watch this space for the ultimate shopping experience—minus the crowds.
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white font-bold transition-colors duration-300">
            Get updates
          </button>
        </div>
        <div className="flex space-x-6 mt-6">
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.773 1.642 4.981 4.931.144 2.193.07 2.454.07 4.849 0 3.204-.012 3.584-.07 4.85-.148 3.252-1.642 4.773-4.931 4.981-2.193.144-2.454.07-4.849.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.773-1.642-4.981-4.931-.144-2.193-.07-2.454-.07-4.849 0-3.204.012-3.584.07-4.85.148-3.252 1.642-4.773 4.931-4.981 2.193-.144 2.454-.07 4.849-.07zm0-2.163c-3.697 0-4.123.014-5.594.072-4.062.188-6.002 2.05-6.19 6.096-.079 1.464-.072 1.89-.072 5.586 0 3.697.014 4.123.072 5.594.188 4.062 2.05 6.002 6.096 6.19 1.464.079 1.89.072 5.586.072 3.697 0 4.123-.014 5.594-.072 4.062-.188 6.002-2.05 6.19-6.096.079-1.464.072-1.89.072-5.586 0-3.697-.014-4.123-.072-5.594-.188-4.062-2.05-6.002-6.096-6.19-1.464-.079-1.89-.072-5.586-.072z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.256 5.626c-.722.32-1.493.535-2.3.633.829-.496 1.465-1.28.69-2.079-1.458.82-3.076 1.398-4.793 1.713-1.638 1.696-3.805 2.766-6.225 2.766-4.706 0-8.524-3.818-8.524-8.524 0-.668.077-1.319.229-1.942-4.57.858-8.627 4.793-9.524 9.524-.766 4.71 2.376 9.278 6.96 10.134 4.71.766 9.278-2.376 10.134-6.96.766-4.71-2.376-9.278-6.96-10.134-4.57-.858-8.627-4.793-9.524-9.524-.766-4.71 2.376-9.278 6.96-10.134z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.773 1.642 4.981 4.931.144 2.193.07 2.454.07 4.849 0 3.204-.012 3.584-.07 4.85-.148 3.252-1.642 4.773-4.931 4.981-2.193.144-2.454-.07-4.849-.07-3.204 0-3.584.012-4.85-.07-3.252-.148-4.773-1.642-4.981-4.931-.144-2.193-.07-2.454-.07-4.849 0-3.204.012-3.584.07-4.85.148-3.252 1.642-4.773 4.931-4.981 2.193-.144 2.454-.07 4.849-.07zm0-2.163c-3.697 0-4.123.014-5.594.072-4.062.188-6.002 2.05-6.19 6.096-.079 1.464-.072 1.89-.072 5.586 0 3.697.014 4.123.072 5.594.188 4.062 2.05 6.002 6.096 6.19 1.464.079 1.89.072 5.586.072 3.697 0 4.123-.014 5.594-.072 4.062-.188 6.002-2.05 6.19-6.096.079-1.464.072-1.89.072-5.586 0-3.697-.014-4.123-.072-5.594-.188-4.062-2.05-6.002-6.096-6.19-1.464-.079-1.89-.072-5.586-.072z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
