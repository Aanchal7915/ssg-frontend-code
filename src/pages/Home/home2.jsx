// import React, { useState } from "react";
// import Category from "./category";
// import SeoData from "../../SEO/SeoData";
// import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
// import Categories from "../../components/header/Categories";
// import MinCategory from "../../components/MinCategory";

// const products = [
//     {
//         id: 1,
//         name: "Wireless Headphones",
//         description: "Experience premium sound quality with noise cancellation.",
//         price: "$120",
//         image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
//         feature: "40hr Battery",
//     },
//     {
//         id: 2,
//         name: "Bluetooth Earbuds",
//         description: "Compact, stylish, and perfect for on-the-go listening.",
//         price: "$80",
//         image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
//         feature: "IPX7 Waterproof",
//     },
//     {
//         id: 3,
//         name: "Portable Bluetooth Speaker",
//         description: "Fill any room with rich, immersive sound.",
//         price: "$65",
//         image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//         feature: "360° Surround",
//     },
//     {
//         id: 4,
//         name: "Gaming Headset",
//         description: "Crystal clear audio for an immersive gaming experience.",
//         price: "$95",
//         image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
//         feature: "RGB Lighting",
//     },
//     {
//         id: 5,
//         name: "Smart Watch",
//         description: "Track your fitness and stay connected on the go.",
//         price: "$110",
//         image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
//         feature: "Heart Rate Monitor",
//     },
//     {
//         id: 6,
//         name: "Wireless Charger",
//         description: "Fast and convenient charging for all your devices.",
//         price: "$35",
//         image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//         feature: "15W Fast Charge",
//     },
//     {
//         id: 7,
//         name: "Action Camera",
//         description: "Capture your adventures in stunning 4K resolution.",
//         price: "$150",
//         image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//         feature: "4K Ultra HD",
//     },
//     {
//         id: 8,
//         name: "VR Headset",
//         description: "Step into a new world with immersive VR experiences.",
//         price: "$220",
//         image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
//         feature: "120° FOV",
//     },
// ];

// const testimonials = [
//     {
//         name: "Amit Sharma",
//         text: "Best wholesale prices and super fast delivery. My go-to for electronics!",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//         name: "Priya Verma",
//         text: "Loved the support and the quality of products. Highly recommended!",
//         avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//         name: "Rahul Singh",
//         text: "Huge variety and unbeatable deals. My business profits have grown!",
//         avatar: "https://randomuser.me/api/portraits/men/65.jpg",
//     },
// ];

// const partners = [
//     {
//         name: "Sony",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg",
//     },
//     {
//         name: "Samsung",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
//     },
//     {
//         name: "JBL",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/JBL_logo.svg",
//     },
//     {
//         name: "Boat",
//         logo: "https://seeklogo.com/images/B/boat-logo-6B1B6A6B3B-seeklogo.com.png",
//     },
//     {
//         name: "Apple",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
//     },
// ];

// const categoryData = [
//     {
//         name: "Mobiles",
//         icon: "📱",
//         subcategories: [
//             "Smartphones",
//             "Feature Phones",
//             "Refurbished Phones",
//             "Tablets",
//         ],
//     },
//     {
//         name: "Mobile Accessories",
//         icon: "🎧",
//         subcategories: [
//             "Chargers",
//             "Cases & Covers",
//             "Power Banks",
//             "Screen Guards",
//         ],
//     },
//     {
//         name: "Electronics",
//         icon: "💻",
//         subcategories: [
//             "Headphones",
//             "Speakers",
//             "Smart Watches",
//             "Camera & Drones",
//         ],
//     },
//     {
//         name: "Clothing",
//         icon: "👕",
//         subcategories: [
//             "Men's Wear",
//             "Women's Wear",
//             "Kids' Wear",
//             "Winter Collection",
//         ],
//     },
//     {
//         name: "Jewellery",
//         icon: "💍",
//         subcategories: ["Gold", "Silver", "Imitation", "Diamond"],
//     },
// ];

// const Home = () => {
//     const [activeCategory, setActiveCategory] = useState(null);

//     return (
//         <>
//             <SeoData title="Online Wholesaler Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
//             <ScrollToTopOnRouteChange />
//             <MinCategory />
//             {/* <Categories /> */}
//             <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-white text-sky-900 font-sans overflow-x-hidden">
//                 {/* Hero Section */}
//                 <header className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24 overflow-hidden">
//                     {/* Animated Banner Vector */}
//                     <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
//                         <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none">
//                             <path
//                                 fill="url(#bannerGradient)"
//                                 fillOpacity="0.13"
//                                 d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
//                             ></path>
//                             <defs>
//                                 <linearGradient id="bannerGradient" x1="0" y1="0" x2="1" y2="1">
//                                     <stop offset="0%" stopColor="#38bdf8" />
//                                     <stop offset="100%" stopColor="#0ea5e9" />
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                     </div>
//                     {/* Hero Content */}
//                     <div className="z-10 max-w-xl md:w-1/2 space-y-7 animate-fadeIn">
//                         <h1 className="text-5xl md:text-6xl font-extrabold text-sky-700 mb-2 leading-tight drop-shadow-none">
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-400 to-sky-700 animate-gradient">
//                                 Premium Electronics, Wholesale Prices
//                             </span>
//                         </h1>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
//                                 Bulk Deals
//                             </span>
//                             <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
//                                 Latest Tech
//                             </span>
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
//                                 Fast Shipping
//                             </span>
//                             <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
//                                 Trusted Support
//                             </span>
//                         </div>
//                         <p className="text-lg md:text-xl text-sky-800/80 font-medium mt-4">
//                             We specialize in supplying businesses, retailers, and distributors
//                             with the latest products at wholesale prices. With a focus on
//                             reliability, quality, and speed, we empower your business to scale
//                             without the hassle.
//                         </p>
//                         <a
//                             href="#products"
//                             className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold rounded-full hover:scale-105 hover:from-sky-500 hover:to-blue-500 transition-all duration-300 animate-bounce"
//                         >
//                             Shop Now
//                         </a>
//                     </div>
//                     {/* Hero Illustration */}
//                     <div className="z-10 md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
//                         <img
//                             src="https://cdn.pixabay.com/animation/2023/03/22/10/23/10-23-44-627_512.gif"
//                             alt="Electronics Animation"
//                             className="hidden md:block w-[420px] h-[340px] object-contain rounded-3xl bg-sky-100 animate-slideIn"
//                         />
//                         <svg
//                             className="md:hidden w-64 h-48"
//                             viewBox="0 0 320 180"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <ellipse
//                                 cx="160"
//                                 cy="90"
//                                 rx="140"
//                                 ry="70"
//                                 fill="#38bdf8"
//                                 fillOpacity="0.15"
//                             />
//                             <rect
//                                 x="80"
//                                 y="60"
//                                 width="160"
//                                 height="60"
//                                 rx="20"
//                                 fill="#38bdf8"
//                                 fillOpacity="0.25"
//                             />
//                             <circle cx="160" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.3" />
//                         </svg>
//                     </div>
//                 </header>

//                 {/* Category Section */}
//                 {/* <section className="py-8 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
// 					<h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
// 						Shop by Category
// 					</h2>
// 					<div className="flex flex-wrap justify-center gap-6 mb-4">
// 						{categoryData.map((cat, idx) => (
// 							<button
// 								key={cat.name}
// 								onClick={() =>
// 									setActiveCategory(activeCategory === idx ? null : idx)
// 								}
// 								className={`flex flex-col items-center px-6 py-4 rounded-xl border-2 border-sky-200 bg-white text-sky-700 font-semibold hover:bg-sky-100 hover:border-sky-400 transition-all duration-200 focus:outline-none ${
// 									activeCategory === idx
// 										? "ring-2 ring-sky-400 scale-105 bg-sky-50"
// 										: ""
// 								} animate-fadeIn`}
// 								style={{ animationDelay: `${0.05 * idx}s`, animationFillMode: "both" }}
// 							>
// 								<span className="text-3xl mb-2">{cat.icon}</span>
// 								<span>{cat.name}</span>
// 							</button>
// 						))}
// 					</div>
// 					Subcategory List
// 					{activeCategory !== null && (
// 						<div className="flex justify-center mt-2 animate-fadeIn">
// 							<div className="bg-sky-50 border border-sky-200 rounded-xl px-8 py-6 flex flex-wrap gap-4 shadow-none">
// 								{categoryData[activeCategory].subcategories.map((sub, i) => (
// 									<span
// 										key={sub}
// 										className="bg-sky-200 text-sky-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-300 transition animate-slideUp"
// 										style={{ animationDelay: `${0.05 * i}s`, animationFillMode: "both" }}
// 									>
// 										{sub}
// 									</span>
// 								))}
// 							</div>
// 						</div>
// 					)}
// 				</section> */}
//                 <Category />


//                 {/* Product Highlights Section */}
//                 <section className="py-10 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
//                     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png"
//                                 alt="Bulk"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Bulk Orders
//                             </h3>
//                             <p className="text-sky-600">
//                                 Order in bulk and save more. Special pricing for businesses and
//                                 resellers.
//                             </p>
//                         </div>
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042332.png"
//                                 alt="Warranty"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Warranty & Support
//                             </h3>
//                             <p className="text-sky-600">
//                                 All products come with manufacturer warranty and 24/7 customer
//                                 support.
//                             </p>
//                         </div>
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042331.png"
//                                 alt="Shipping"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Express Shipping
//                             </h3>
//                             <p className="text-sky-600">
//                                 Lightning-fast delivery across India. Track your orders in real
//                                 time.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Products Section */}
//                 <section
//                     id="products"
//                     className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white"
//                 >
//                     <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-12 animate-slideUp">
//                         Featured Products
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//                         {products.map((product, idx) => (
//                             <div
//                                 key={product.id}
//                                 className="bg-white rounded-2xl border-2 border-sky-100 hover:border-sky-400 transition-shadow duration-300 p-6 flex flex-col items-center animate-fadeIn hover:scale-105"
//                                 style={{
//                                     animationDelay: `${0.1 * idx}s`,
//                                     animationFillMode: "both",
//                                 }}
//                             >
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="w-32 h-32 object-cover rounded-xl mb-4 border-2 border-sky-200 hover:scale-110 transition-transform duration-300"
//                                 />
//                                 <div className="text-center space-y-2">
//                                     <h3 className="text-xl font-semibold text-sky-800">
//                                         {product.name}
//                                     </h3>
//                                     <p className="text-sky-600">{product.description}</p>
//                                     <span className="inline-block bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                         {product.feature}
//                                     </span>
//                                     <div>
//                                         <span className="text-lg font-bold text-sky-500">
//                                             {product.price}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <button className="mt-4 px-6 py-2 bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300">
//                                     Buy Wholesale
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* About Section */}
//                 <section className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white animate-fadeIn">
//                     <div className="max-w-4xl mx-auto">
//                         <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 text-center">
//                             About Us
//                         </h2>
//                         <div className="text-sky-700 text-lg space-y-4 mb-8">
//                             <p>
//                                 We're committed to helping your business thrive. That's why we offer{" "}
//                                 <strong className="text-sky-500">bulk discounts for wholesalers</strong>
//                                 , ensuring you get the best possible prices. Our catalog is constantly
//                                 updated with the{" "}
//                                 <strong className="text-sky-500">latest electronic gadgets</strong>
//                                 , so you can provide your customers with the most innovative products on
//                                 the market.
//                             </p>
//                             <p>
//                                 We know that in business, every moment counts. Our{" "}
//                                 <strong className="text-sky-500">fast shipping & secure payments</strong>{" "}
//                                 options ensure a smooth, worry-free process from order to delivery.
//                                 Should you have any questions or need assistance, our{" "}
//                                 <strong className="text-sky-500">dedicated customer support</strong> team
//                                 is always ready to help. We're here to be your partner, not just another
//                                 supplier.
//                             </p>
//                             <p>
//                                 Our commitment to quality and service has earned the trust of businesses
//                                 just like yours. We're proud to be{" "}
//                                 <strong className="text-sky-500">trusted by over 10,000 businesses</strong>
//                                 —a testament to our reliability and the value we bring to our partners.
//                             </p>
//                         </div>
//                         <ul className="space-y-4 text-lg text-sky-600 font-medium">
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Bulk discounts for
//                                 wholesalers
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Latest electronic
//                                 gadgets
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Fast shipping & secure
//                                 payments
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Dedicated customer
//                                 support
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Trusted by 10,000+
//                                 businesses
//                             </li>
//                         </ul>
//                         <div className="flex flex-wrap justify-center gap-8 mt-10">
//                             {[1, 2, 3, 4].map((img) => (
//                                 <img
//                                     key={img}
//                                     src={`/${img}.jpg`}
//                                     alt="Support Illustration"
//                                     className="w-72 h-56 object-contain rounded-xl bg-sky-100 animate-fadeIn"
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Testimonials Section */}
//                 <section className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
//                     <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-10 text-center">
//                         What Our Customers Say
//                     </h2>
//                     <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
//                         {testimonials.map((t, idx) => (
//                             <div
//                                 key={t.name}
//                                 className="bg-white border-2 border-sky-100 rounded-2xl p-8 flex flex-col items-center text-center animate-fadeIn hover:scale-105 transition-transform duration-300"
//                                 style={{ animationDelay: `${0.2 * idx}s`, animationFillMode: "both" }}
//                             >
//                                 <img
//                                     src={t.avatar}
//                                     alt={t.name}
//                                     className="w-16 h-16 rounded-full mb-3 border-2 border-sky-400"
//                                 />
//                                 <p className="text-sky-700 italic mb-2">"{t.text}"</p>
//                                 <span className="text-sky-500 font-semibold">{t.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Call to Action Banner */}
//                 <section className="py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-r from-sky-200 via-blue-100 to-sky-100">
//                     <div className="flex-1 flex flex-col items-center md:items-start">
//                         <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-3">
//                             Elevate Your Business with{" "}
//                             <span className="text-blue-500">Wholesale</span>
//                         </h3>
//                         <p className="text-sky-600 text-lg mb-4">
//                             Get exclusive access to the latest tech, unbeatable prices, and a seamless
//                             wholesale experience.
//                         </p>
//                         <a
//                             href="#products"
//                             className="inline-block px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
//                         >
//                             Explore Products
//                         </a>
//                     </div>
//                     <div className="flex-1 flex justify-center">
//                         <svg
//                             width="260"
//                             height="180"
//                             viewBox="0 0 260 180"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <ellipse
//                                 cx="130"
//                                 cy="90"
//                                 rx="120"
//                                 ry="70"
//                                 fill="#38bdf8"
//                                 fillOpacity="0.13"
//                             />
//                             <rect
//                                 x="60"
//                                 y="60"
//                                 width="140"
//                                 height="60"
//                                 rx="20"
//                                 fill="#38bdf8"
//                                 fillOpacity="0.18"
//                             />
//                             <circle cx="130" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.22" />
//                             <rect
//                                 x="110"
//                                 y="80"
//                                 width="40"
//                                 height="20"
//                                 rx="8"
//                                 fill="#fff"
//                                 fillOpacity="0.12"
//                             >
//                                 <animate
//                                     attributeName="x"
//                                     values="110;150;110"
//                                     dur="2s"
//                                     repeatCount="indefinite"
//                                 />
//                             </rect>
//                         </svg>
//                     </div>
//                 </section>

//                 {/* Animations */}
//                 <style>
//                     {`
//           .animate-fadeIn {
//             animation: fadeIn 1s ease both;
//           }
//           .animate-slideUp {
//             animation: slideUp 1s ease both;
//           }
//           .animate-slideIn {
//             animation: slideIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
//           }
//           .animate-gradient {
//             background-size: 200% 200%;
//             animation: gradientMove 3s ease-in-out infinite;
//           }
//           .animate-float {
//             animation: float 3s ease-in-out infinite;
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px);}
//             to { opacity: 1; transform: translateY(0);}
//           }
//           @keyframes slideUp {
//             from { opacity: 0; transform: translateY(40px);}
//             to { opacity: 1; transform: translateY(0);}
//           }
//           @keyframes slideIn {
//             from { opacity: 0; transform: translateX(80px);}
//             to { opacity: 1; transform: translateX(0);}
//           }
//           @keyframes gradientMove {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//           @keyframes float {
//             0%, 100% { transform: translateY(0);}
//             50% { transform: translateY(-18px);}
//           }
//         `}
//                 </style>
//             </div>
//         </>
//     );
// };

// export default Home;















// import React, { useState } from "react";
// import Category from "./category";
// import SeoData from "../../SEO/SeoData";
// import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
// import Categories from "../../components/header/Categories";
// import MinCategory from "../../components/MinCategory";

// const products = [
//     {
//         id: 1,
//         name: "Wireless Headphones",
//         description: "Experience premium sound quality with noise cancellation.",
//         price: "$120",
//         image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
//         feature: "40hr Battery",
//     },
//     {
//         id: 2,
//         name: "Bluetooth Earbuds",
//         description: "Compact, stylish, and perfect for on-the-go listening.",
//         price: "$80",
//         image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
//         feature: "IPX7 Waterproof",
//     },
//     {
//         id: 3,
//         name: "Portable Bluetooth Speaker",
//         description: "Fill any room with rich, immersive sound.",
//         price: "$65",
//         image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//         feature: "360° Surround",
//     },
//     {
//         id: 4,
//         name: "Gaming Headset",
//         description: "Crystal clear audio for an immersive gaming experience.",
//         price: "$95",
//         image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
//         feature: "RGB Lighting",
//     },
//     {
//         id: 5,
//         name: "Smart Watch",
//         description: "Track your fitness and stay connected on the go.",
//         price: "$110",
//         image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
//         feature: "Heart Rate Monitor",
//     },
//     {
//         id: 6,
//         name: "Wireless Charger",
//         description: "Fast and convenient charging for all your devices.",
//         price: "$35",
//         image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//         feature: "15W Fast Charge",
//     },
//     {
//         id: 7,
//         name: "Action Camera",
//         description: "Capture your adventures in stunning 4K resolution.",
//         price: "$150",
//         image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//         feature: "4K Ultra HD",
//     },
//     {
//         id: 8,
//         name: "VR Headset",
//         description: "Step into a new world with immersive VR experiences.",
//         price: "$220",
//         image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
//         feature: "120° FOV",
//     },
// ];

// const testimonials = [
//     {
//         name: "Amit Sharma",
//         text: "Best wholesale prices and super fast delivery. My go-to for electronics!",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//         name: "Priya Verma",
//         text: "Loved the support and the quality of products. Highly recommended!",
//         avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//         name: "Rahul Singh",
//         text: "Huge variety and unbeatable deals. My business profits have grown!",
//         avatar: "https://randomuser.me/api/portraits/men/65.jpg",
//     },
// ];

// const partners = [
//     {
//         name: "Sony",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg",
//     },
//     {
//         name: "Samsung",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
//     },
//     {
//         name: "JBL",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/JBL_logo.svg",
//     },
//     {
//         name: "Boat",
//         logo: "https://seeklogo.com/images/B/boat-logo-6B1B6A6B3B-seeklogo.com.png",
//     },
//     {
//         name: "Apple",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
//     },
// ];

// const categoryData = [
//     {
//         name: "Mobiles",
//         icon: "📱",
//         subcategories: [
//             "Smartphones",
//             "Feature Phones",
//             "Refurbished Phones",
//             "Tablets",
//         ],
//     },
//     {
//         name: "Mobile Accessories",
//         icon: "🎧",
//         subcategories: [
//             "Chargers",
//             "Cases & Covers",
//             "Power Banks",
//             "Screen Guards",
//         ],
//     },
//     {
//         name: "Electronics",
//         icon: "💻",
//         subcategories: [
//             "Headphones",
//             "Speakers",
//             "Smart Watches",
//             "Camera & Drones",
//         ],
//     },
//     {
//         name: "Clothing",
//         icon: "👕",
//         subcategories: [
//             "Men's Wear",
//             "Women's Wear",
//             "Kids' Wear",
//             "Winter Collection",
//         ],
//     },
//     {
//         name: "Jewellery",
//         icon: "💍",
//         subcategories: ["Gold", "Silver", "Imitation", "Diamond"],
//     },
// ];

// const Home = () => {
//     const [activeCategory, setActiveCategory] = useState(null);

//     return (
//         <>
//             <SeoData title="Online Wholesaler Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
//             <ScrollToTopOnRouteChange />
//             <MinCategory />
//             <div className="min-h-screen bg-white text-sky-900 font-sans overflow-x-hidden">
//                 {/* Hero Section */}
//                 <header className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24">
//                     <div className="z-10 max-w-xl md:w-1/2 space-y-7 animate-fadeIn">
//                         <h1 className="text-5xl md:text-6xl font-extrabold text-sky-700 mb-2 leading-tight">
//                             Premium Electronics, Wholesale Prices
//                         </h1>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                 Bulk Deals
//                             </span>
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                 Latest Tech
//                             </span>
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                 Fast Shipping
//                             </span>
//                             <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                 Trusted Support
//                             </span>
//                         </div>
//                         <p className="text-lg md:text-xl text-sky-800/80 font-medium mt-4">
//                             We specialize in supplying businesses, retailers, and distributors
//                             with the latest products at wholesale prices. With a focus on
//                             reliability, quality, and speed, we empower your business to scale
//                             without the hassle.
//                         </p>
//                         <a
//                             href="#products"
//                             className="inline-block mt-6 px-8 py-3 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-colors duration-300"
//                         >
//                             Shop Now
//                         </a>
//                     </div>
//                     <div className="z-10 md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
//                         <img
//                             src="https://cdn.pixabay.com/animation/2023/03/22/10/23/10-23-44-627_512.gif"
//                             alt="Electronics Animation"
//                             className="hidden md:block w-[420px] h-[340px] object-contain rounded-3xl animate-slideIn"
//                         />
//                     </div>
//                 </header>
//                 <Category />
//                 <section className="py-10 px-6">
//                     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png"
//                                 alt="Bulk"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Bulk Orders
//                             </h3>
//                             <p className="text-sky-600">
//                                 Order in bulk and save more. Special pricing for businesses and
//                                 resellers.
//                             </p>
//                         </div>
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042332.png"
//                                 alt="Warranty"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Warranty & Support
//                             </h3>
//                             <p className="text-sky-600">
//                                 All products come with manufacturer warranty and 24/7 customer
//                                 support.
//                             </p>
//                         </div>
//                         <div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
//                             <img
//                                 src="https://cdn-icons-png.flaticon.com/512/1042/1042331.png"
//                                 alt="Shipping"
//                                 className="w-16 h-16 mb-4 animate-float"
//                             />
//                             <h3 className="text-xl font-bold text-sky-700 mb-2">
//                                 Express Shipping
//                             </h3>
//                             <p className="text-sky-600">
//                                 Lightning-fast delivery across India. Track your orders in real
//                                 time.
//                             </p>
//                         </div>
//                     </div>
//                 </section>
//                 <section
//                     id="products"
//                     className="py-16 px-6 bg-sky-50"
//                 >
//                     <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-12">
//                         Featured Products
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//                         {products.map((product, idx) => (
//                             <div
//                                 key={product.id}
//                                 className="bg-white rounded-2xl border-2 border-sky-200 p-6 flex flex-col items-center hover:bg-sky-50 transition-colors duration-300"
//                             >
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="w-32 h-32 object-cover rounded-xl mb-4"
//                                 />
//                                 <div className="text-center space-y-2">
//                                     <h3 className="text-xl font-semibold text-sky-800">
//                                         {product.name}
//                                     </h3>
//                                     <p className="text-sky-600">{product.description}</p>
//                                     <span className="inline-block bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
//                                         {product.feature}
//                                     </span>
//                                     <div>
//                                         <span className="text-lg font-bold text-sky-500">
//                                             {product.price}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <button className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors duration-300">
//                                     Buy Wholesale
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//                 <section className="py-16 px-6 bg-white">
//                     <div className="max-w-4xl mx-auto">
//                         <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 text-center">
//                             About Us
//                         </h2>
//                         <div className="text-sky-700 text-lg space-y-4 mb-8">
//                             <p>
//                                 We're committed to helping your business thrive. That's why we offer{" "}
//                                 <strong className="text-sky-500">bulk discounts for wholesalers</strong>
//                                 , ensuring you get the best possible prices. Our catalog is constantly
//                                 updated with the{" "}
//                                 <strong className="text-sky-500">latest electronic gadgets</strong>
//                                 , so you can provide your customers with the most innovative products on
//                                 the market.
//                             </p>
//                             <p>
//                                 We know that in business, every moment counts. Our{" "}
//                                 <strong className="text-sky-500">fast shipping & secure payments</strong>{" "}
//                                 options ensure a smooth, worry-free process from order to delivery.
//                                 Should you have any questions or need assistance, our{" "}
//                                 <strong className="text-sky-500">dedicated customer support</strong> team
//                                 is always ready to help. We're here to be your partner, not just another
//                                 supplier.
//                             </p>
//                             <p>
//                                 Our commitment to quality and service has earned the trust of businesses
//                                 just like yours. We're proud to be{" "}
//                                 <strong className="text-sky-500">trusted by over 10,000 businesses</strong>
//                                 —a testament to our reliability and the value we bring to our partners.
//                             </p>
//                         </div>
//                         <ul className="space-y-4 text-lg text-sky-600 font-medium">
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Bulk discounts for
//                                 wholesalers
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Latest electronic
//                                 gadgets
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Fast shipping & secure
//                                 payments
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Dedicated customer
//                                 support
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <span className="text-sky-500 text-xl">✓</span> Trusted by 10,000+
//                                 businesses
//                             </li>
//                         </ul>
//                         <div className="flex flex-wrap justify-center gap-8 mt-10">
//                             {[1, 2, 3, 4].map((img) => (
//                                 <img
//                                     key={img}
//                                     src={`/${img}.jpg`}
//                                     alt="Support Illustration"
//                                     className="w-72 h-56 object-contain rounded-xl border-2 border-sky-200"
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </section>
//                 <section className="py-16 px-6 bg-sky-50">
//                     <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-10 text-center">
//                         What Our Customers Say
//                     </h2>
//                     <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
//                         {testimonials.map((t, idx) => (
//                             <div
//                                 key={t.name}
//                                 className="bg-white border-2 border-sky-200 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-sky-100 transition-colors duration-300"
//                             >
//                                 <img
//                                     src={t.avatar}
//                                     alt={t.name}
//                                     className="w-16 h-16 rounded-full mb-3 border-2 border-sky-400"
//                                 />
//                                 <p className="text-sky-700 italic mb-2">"{t.text}"</p>
//                                 <span className="text-sky-500 font-semibold">{t.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//                 <section className="py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 bg-sky-100">
//                     <div className="flex-1 flex flex-col items-center md:items-start">
//                         <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-3">
//                             Elevate Your Business with <span className="text-sky-500">Wholesale</span>
//                         </h3>
//                         <p className="text-sky-600 text-lg mb-4">
//                             Get exclusive access to the latest tech, unbeatable prices, and a seamless
//                             wholesale experience.
//                         </p>
//                         <a
//                             href="#products"
//                             className="inline-block px-8 py-3 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-colors duration-300"
//                         >
//                             Explore Products
//                         </a>
//                     </div>
//                 </section>
//                 <style>
//                     {`
//                     .animate-fadeIn { animation: fadeIn 1s ease both; }
//                     .animate-slideUp { animation: slideUp 1s ease both; }
//                     .animate-slideIn { animation: slideIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) both; }
//                     .animate-gradient { background-size: 200% 200%; animation: gradientMove 3s ease-in-out infinite; }
//                     .animate-float { animation: float 3s ease-in-out infinite; }
//                     @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
//                     @keyframes slideUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: translateY(0);} }
//                     @keyframes slideIn { from { opacity: 0; transform: translateX(80px);} to { opacity: 1; transform: translateX(0);} }
//                     @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//                     @keyframes float { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-18px);} }
//                     `}
//                 </style>
//             </div>
// //         </>
//     );
// };

// export default Home;
























import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Testimonial from "./Testimonial"
import MiniCategory from "../../components/MinCategory";
// import Accessories from "./accessories";


// Mock ProductCard component (replace with actual ProductCard)
const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">{product.description}</p>
  </div>
);

// Mock assets (replace with actual image paths or imports)
const assets = {
  header_headphone_image: "https://images-cdn.ubuy.co.in/66cb15b29c6bb53bf6591ff4-maho-beats-headphones-wireless-bluetooth.jpg",
  header_playstation_image: "https://4kwallpapers.com/images/wallpapers/playstation-5-pro-1920x1080-19032.jpg",
  header_macbook_image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23759755/bfarsace_190101_5333_0002.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400",
  arrow_icon: "",
};

// Mock products data (replace with actual data from context or API)
const mockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    image: "https://i.pinimg.com/736x/e2/7c/89/e27c89722b03c92d0e2fef16fbc29863.jpg",
  },
  {
    id: 2,
    name: "USB-C Charger",
    description: "Fast-charging USB-C cable for smartphones",
    image: "https://chargingcable.in/cdn/shop/files/1_b5035f15-621e-49aa-843d-ae9ea35a5402_1.jpg?v=1748060807&width=1080",
  },
  {
    id: 3,
    name: "Car Bluetooth",
    description: "Bluetooth device for car audio systems",
    image: "https://www.jiomart.com/images/product/original/rvhadyiwd4/crust-cs30-car-bluetooth-device-with-call-receiver-fm-transmitter-for-music-system-dual-usb-type-c-fast-charger-7-colour-led-lights-6-equalizer-presets-usb-mp3-audio-playback-voice-assistant-legal-images-orvhadyiwd4-p601894899-3-202305271549.jpg?im=Resize=(420,420)",
  },
];

// Use cases data for FlowDiagram
const useCases = [
  {
    id: 1,
    title: "Mobile Shops",
    description: "Bulk mobile accessories for retail shops",
    icon: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Bike Accessories Retailers",
    description: "Wires, stands, and hands-free devices for bike shops",
    icon: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?cs=srgb&dl=pexels-nicholas-dias-1119542-2116475.jpg&fm=jpg",
  },
  {
    id: 3,
    title: "Office Supplies",
    description: "Bulk keyboards, mice, and chargers for office setups",
    icon: "https://images.pexels.com/photos/265072/pexels-photo-265072.jpeg?cs=srgb&dl=pexels-pixabay-265072.jpg&fm=jpg",
  },
  {
    id: 4,
    title: "E-commerce Sellers",
    description: "Ready-to-ship accessories for online stores",
    icon: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];


const HomePage = ({ searchKeyword = "" }) => {
  const navigate = useNavigate();

  // Slider state and logic
  const sliderData = [
    {
      id: 1,
      title: "Stock High-Quality products with top brands are categorized!",
      offer: "Limited Time Wholesale Offer",
      buttonText1: "Shop Now",
      buttonText2: "Explore More",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Unleash your potential using latest tech and gadgets!",
      offer: "Bulk Deals Available",
      buttonText1: "Order Now",
      buttonText2: "View Collection",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Explore laptops,phones,accessories,cloths,and jewellery!",
      offer: "Exclusive Wholesale Discounts",
      buttonText1: "Buy in Bulk",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Handsfree",
      image: "https://www.geeky-gadgets.com/wp-content/uploads/2014/05/earpods.jpg",
    },
    {
      id: 2,
      name: "Earbuds",
      image: "https://i.pinimg.com/736x/e2/7c/89/e27c89722b03c92d0e2fef16fbc29863.jpg",
    },
    {
      id: 3,
      name: "Mix Items",
      image: "https://img.freepik.com/free-photo/close-up-artist-making-music_23-2149199987.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 4,
      name: "Car Bluetooth",
      image: "https://www.jiomart.com/images/product/original/rvhadyiwd4/crust-cs30-car-bluetooth-device-with-call-receiver-fm-transmitter-for-music-system-dual-usb-type-c-fast-charger-7-colour-led-lights-6-equalizer-presets-usb-mp3-audio-playback-voice-assistant-legal-images-orvhadyiwd4-p601894899-3-202305271549.jpg?im=Resize=(420,420)",
    },
    {
      id: 5,
      name: "OTG Cables",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZ6SuUmqu0wa4nB7KHsI9Al7eh3RvMkJHog&s",
    },
    {
      id: 6,
      name: "Car Chargers",
      image: "https://images.philips.com/is/image/philipsconsumer/0b370bab54c442dfa0bdb0c100abfa7a?$pnglarge$&wid=1250",
    },
    {
      id: 7,
      name: "Cables and Chargers",
      image: "https://chargingcable.in/cdn/shop/files/1_b5035f15-621e-49aa-843d-ae9ea35a5402_1.jpg?v=1748060807&width=1080",
    },
    {
      id: 8,
      name: "Battery",
      image: "https://www.popsci.com/wp-content/uploads/2020/03/23/hands-holding-phone-with-dead-battery-advisory.jpg?quality=85",
    },
    {
      id: 9,
      name: "Selfie Sticks",
      image: "https://cdn.sanity.io/images/3azemr64/production/0af7b94e8cea2b42968c16720a3ab9011c2d3f58-1024x768.jpg?auto=format&w=873&h=655&crop=center&fit=crop&q=90",
    },
    {
      id: 10,
      name: "Car and Bike Stand",
      image: "https://holdfast.co.za/wp-content/uploads/2024/11/Versa-Bike-Stand_Holdfast_Oct24_Boulle_1.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-products?category=${encodeURIComponent(categoryName)}`);
  };

  // Filter products based on searchKeyword
  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <MiniCategory />
    <div className="w-full">
      {/* Header Slider Section */}
      {/* <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            >
              <div className="md:pl-8 mt-10 md:mt-0">
                <p className="md:text-base text-[#54B1CE] pb-1 font-medium">{slide.offer}</p>
                <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold text-gray-800">
                  {slide.title}
                </h1>
                <div className="flex items-center mt-4 md:mt-6 gap-4">
                  <button
                    onClick={() => navigate("/all-products")}
                    className="md:px-10 px-7 md:py-2.5 py-2 bg-[#54B1CE] rounded-full text-white font-medium hover:bg-[#3a9cb8] transition-colors"
                  >
                    {slide.buttonText1}
                  </button>
                  <button
                    onClick={() => navigate("/all-products")}
                    className="group flex items-center gap-2 px-6 py-2.5 font-medium text-[#54B1CE] border border-[#54B1CE] rounded-full hover:bg-[#54B1CE] hover:text-white transition-colors"
                  >
                    {slide.buttonText2}
                    <img
                      className="group-hover:translate-x-1 transition"
                      src={assets.arrow_icon}
                      alt="arrow_icon"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-center">
                <img
                  className="md:w-72 w-48"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {sliderData.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentSlide === index ? "bg-[#54B1CE]" : "bg-gray-500/30"
              }`}
            ></div>
          ))}
        </div>
      </div> */}
		<Hero/>
      {/* Categories Grid Section */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <p className="text-gray-600 mt-2">Explore our wide range of electronic accessories</p>
          <div className="w-24 h-1 bg-[#54B1CE] rounded-full mt-2 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#54B1CE] overflow-hidden"
            >
              <div className="p-4 text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-gray-200 group-hover:border-[#54B1CE]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-[#54B1CE] transition-colors">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="flex flex-col items-center pt-14 w-full">
        <p className="text-2xl font-medium text-left w-full max-w-7xl mx-auto">Popular products</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full mt-4">No products found.</p>
          )}
        </div>
        <button
          onClick={() => navigate("/all-products")}
          className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
        >
          See more
        </button>
      </div>

      {/* Quick Stats Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-gray-50 rounded-lg p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">1000+</div>
          <div className="text-gray-600">Products Available</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">50+</div>
          <div className="text-gray-600">Brands</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">24/7</div>
          <div className="text-gray-600">Customer Support</div>
        </div>
      </div> */}
{/* 
      {/* Flow Diagram Section */}
      <div className="bg-white py-16 px-6 md:px-16 lg:px-32 overflow-x-hidden">
        <h2 className="text-3xl font-bold text-center text-[#54B1CE]">
          How Our Accessories Can Help You
        </h2>
        <p className="text-center mt-2 text-gray-600">
          Explore use cases and find products suited for your business
        </p>

        {/* Card Slider */}
        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.id}
                className="min-w-[260px] max-w-xs bg-white border-2 border-[#54B1CE]/30 rounded-3xl shadow-lg mx-auto flex flex-col items-center p-7 snap-center transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl group animate-slideCard"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-[#54B1CE]/10 rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-[#54B1CE]/20 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={useCase.icon}
                    alt={useCase.title}
                    className="w-20 h-20 object-cover rounded-full border-4 border-white group-hover:rotate-[8deg] transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-[#54B1CE] text-center mb-1 group-hover:text-[#0e7490] transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-center text-gray-600 mt-1 text-base">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
          {/* Slider hint arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
            <div className="w-10 h-10 bg-[#54B1CE]/10 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="#54B1CE" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#54B1CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
            <div className="w-10 h-10 bg-[#54B1CE]/10 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="#54B1CE" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#54B1CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </div>
          </div>
        </div>
      </div>

	  

	  

      {/* NewsLetter Section */}
      {/* <div className="relative flex flex-col items-center justify-center text-center py-20 bg-white overflow-hidden">
        <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-[#54B1CE]/20 via-white/0 to-[#54B1CE]/20 animate-pulse-slow z-0"></div>
        <div className="relative flex flex-col items-center justify-center w-72 h-72 md:w-96 md:h-96 rounded-full bg-white border-2 border-[#54B1CE] shadow-xl z-10 p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#054b6d] leading-snug">
            Subscribe now & get 20% off
          </h1>
          <p className="text-gray-500/80 mt-4 text-sm md:text-base max-w-xs">
            Join our newsletter to get exclusive offers on premium accessories — watches, earbuds, chargers, handsfree devices, and more.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 w-full max-w-xl z-10">
          <input
            className="border border-gray-300 rounded-md md:rounded-r-none h-12 px-4 w-full outline-none focus:ring-2 focus:ring-[#54B1CE]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="h-12 px-8 md:px-12 bg-[#54B1CE] text-white font-semibold rounded-md md:rounded-l-none hover:bg-[#3a8bbd] transition">
            Subscribe
          </button>
        </div>
      </div> */}
	  <Testimonial/>
	  

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
          }

          @keyframes gradientMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-gradient-move {
            animation: gradientMove 1.5s linear infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce {
            animation: bounce 0.5s ease infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }

          @keyframes slideCard {
            0% { opacity: 0; transform: translateY(40px) scale(0.95);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-slideCard {
            animation: slideCard 0.7s cubic-bezier(.68,-0.55,.27,1.55) both;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
    </>
  );
};

export default HomePage;















