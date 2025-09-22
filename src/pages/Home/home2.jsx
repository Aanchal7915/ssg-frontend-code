import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Experience premium sound quality with noise cancellation.",
    price: "$120",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Bluetooth Earbuds",
    description: "Compact, stylish, and perfect for on-the-go listening.",
    price: "$80",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    description: "Fill any room with rich, immersive sound.",
    price: "$65",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Gaming Headset",
    description: "Crystal clear audio for an immersive gaming experience.",
    price: "$95",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <header className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24">
        <div className="z-10 max-w-xl md:w-1/2 space-y-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 drop-shadow-lg mb-4">
            Wholesale Electronics
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Discover unbeatable deals on headphones, earbuds, and Bluetooth devices.
          </p>
          <a
            href="#products"
            className="inline-block mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 animate-bounce"
          >
            Shop Now
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
          alt="Electronics Banner"
          className="absolute md:static right-0 top-0 md:w-1/2 w-full h-64 md:h-[400px] object-cover rounded-3xl shadow-2xl opacity-90 animate-slideIn"
        />
      </header>

      {/* Products Section */}
      <section id="products" className="py-16 px-6 bg-white/80">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12 animate-slideUp">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center animate-fadeIn"
              style={{ animationDelay: `${0.2 * idx}s`, animationFillMode: "both" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-xl mb-4 shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-indigo-800">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <span className="text-lg font-bold text-indigo-600">{product.price}</span>
              </div>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition-transform duration-300">
                Buy Wholesale
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-indigo-50 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
          Why Choose Us?
        </h2>
        <ul className="max-w-2xl mx-auto space-y-4 text-lg text-gray-700 font-medium">
          <li className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">✓</span> Bulk discounts for wholesalers
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">✓</span> Latest electronic gadgets
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">✓</span> Fast shipping & secure payments
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">✓</span> Dedicated customer support
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-indigo-700 text-white text-center animate-slideUp">
        <p className="text-lg font-medium">
          &copy; {new Date().getFullYear()} ElectroWholesale. All rights reserved.
        </p>
      </footer>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 1s ease both;
          }
          .animate-slideUp {
            animation: slideUp 1s ease both;
          }
          .animate-slideIn {
            animation: slideIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(80px);}
            to { opacity: 1; transform: translateX(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Home;