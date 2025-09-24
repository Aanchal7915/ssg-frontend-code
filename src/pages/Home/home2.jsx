import React from "react";

import SeoData from "../../SEO/SeoData";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import MinCategory from "../../components/MinCategory";

const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		description: "Experience premium sound quality with noise cancellation.",
		price: "$120",
		image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
		feature: "40hr Battery",
	},
	{
		id: 2,
		name: "Bluetooth Earbuds",
		description: "Compact, stylish, and perfect for on-the-go listening.",
		price: "$80",
		image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
		feature: "IPX7 Waterproof",
	},
	{
		id: 3,
		name: "Portable Bluetooth Speaker",
		description: "Fill any room with rich, immersive sound.",
		price: "$65",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
		feature: "360° Surround",
	},
	{
		id: 4,
		name: "Gaming Headset",
		description: "Crystal clear audio for an immersive gaming experience.",
		price: "$95",
		image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
		feature: "RGB Lighting",
	},
	{
		id: 5,
		name: "Smart Watch",
		description: "Track your fitness and stay connected on the go.",
		price: "$110",
		image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
		feature: "Heart Rate Monitor",
	},
	{
		id: 6,
		name: "Wireless Charger",
		description: "Fast and convenient charging for all your devices.",
		price: "$35",
		image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		feature: "15W Fast Charge",
	},
	{
		id: 7,
		name: "Action Camera",
		description: "Capture your adventures in stunning 4K resolution.",
		price: "$150",
		image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
		feature: "4K Ultra HD",
	},
	{
		id: 8,
		name: "VR Headset",
		description: "Step into a new world with immersive VR experiences.",
		price: "$220",
		image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
		feature: "120° FOV",
	},
];

const testimonials = [
	{
		name: "Amit Sharma",
		text: "Best wholesale prices and super fast delivery. My go-to for electronics!",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		name: "Priya Verma",
		text: "Loved the support and the quality of products. Highly recommended!",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		name: "Rahul Singh",
		text: "Huge variety and unbeatable deals. My business profits have grown!",
		avatar: "https://randomuser.me/api/portraits/men/65.jpg",
	},
];

const partners = [
	{
		name: "Sony",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg",
	},
	{
		name: "Samsung",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
	},
	{
		name: "JBL",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/JBL_logo.svg",
	},
	{
		name: "Boat",
		logo: "https://seeklogo.com/images/B/boat-logo-6B1B6A6B3B-seeklogo.com.png",
	},
	{
		name: "Apple",
		logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
	},
];

// const blogPosts = [
// 	{
// 		title: "How to Choose the Best Headphones for Your Needs",
// 		image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/headphones-1954636_1280.jpg",
// 		link: "#",
// 	},
// 	{
// 		title: "Top 5 Tech Gadgets Every Business Needs in 2025",
// 		image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/technology-1869236_1280.jpg",
// 		link: "#",
// 	},
// 	{
// 		title: "Why Buy Wholesale? The Benefits for Retailers",
// 		image: "https://cdn.pixabay.com/photo/2017/08/06/00/03/people-2581913_1280.jpg",
// 		link: "#",
// 	},
// ];

const Home = () => {
	return (<>

		<SeoData title="Online Wholesaler Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
		<ScrollToTopOnRouteChange />
		<MinCategory/>
		{/* <Categories /> */}
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-indigo-100 font-sans overflow-x-hidden">

			{/* Hero Section */}
			<header className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24 overflow-hidden">
				{/* Animated Banner Vector */}
				<div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
					<svg className="w-full h-full" viewBox="0 0 1440 320" fill="none">
						<path
							fill="url(#bannerGradient)"
							fillOpacity="0.18"
							d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
						></path>
						<defs>
							<linearGradient id="bannerGradient" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0%" stopColor="#6366f1" />
								<stop offset="100%" stopColor="#0ea5e9" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				{/* Hero Content */}
				<div className="z-10 max-w-xl md:w-1/2 space-y-7 animate-fadeIn">
					{/* <div className="flex items-center gap-3 mb-2">
						<img
							src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png"
							alt="logo"
							className="w-12 h-12 rounded-full shadow-lg border-2 border-indigo-500 bg-gray-900"
						/>
						<span className="text-2xl font-bold text-indigo-300 tracking-wide">ElectroWholesale</span>
					</div> */}
					<h1 className="text-5xl md:text-6xl font-extrabold text-indigo-200 drop-shadow-lg mb-2 leading-tight">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-200 animate-gradient">
							Premium Electronics, Wholesale Prices
						</span>
					</h1>
					<div className="flex flex-wrap gap-2 mt-2">
						<span className="bg-indigo-700/40 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse">Bulk Deals</span>
						<span className="bg-blue-700/40 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse">Latest Tech</span>
						<span className="bg-indigo-700/40 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse">Fast Shipping</span>
						<span className="bg-blue-700/40 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse">Trusted Support</span>
					</div>
					<p className="text-lg md:text-xl text-indigo-200/80 font-medium mt-4">
						We specialize in supplying businesses, retailers, and distributors with the latest products at wholesale prices. With a focus on reliability, quality, and speed, we empower your business to scale without the hassle.</p>
					<a
						href="#products"
						className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-indigo-700 transition-all duration-300 animate-bounce"
					>
						Shop Now
					</a>
				</div>
				{/* Hero Illustration */}
				<div className="z-10 md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
					{/* Animated GIF Illustration */}
					<img
						src="https://cdn.pixabay.com/animation/2023/03/22/10/23/10-23-44-627_512.gif"
						alt="Electronics Animation"
						className="hidden md:block w-[420px] h-[340px] object-contain rounded-3xl shadow-2xl opacity-95 animate-slideIn"
						style={{ background: "rgba(49, 46, 129, 0.12)" }}
					/>
					{/* SVG Illustration for mobile */}
					<svg
						className="md:hidden w-64 h-48"
						viewBox="0 0 320 180"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<ellipse cx="160" cy="90" rx="140" ry="70" fill="#6366f1" fillOpacity="0.15" />
						<rect x="80" y="60" width="160" height="60" rx="20" fill="#6366f1" fillOpacity="0.25" />
						<circle cx="160" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.3" />
					</svg>
				</div>
			</header>

			{/* Partners/Brands Section */}
			{/* <section className="py-8 px-4 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
				<h3 className="text-xl font-bold text-indigo-200 text-center mb-6">Our Trusted Brands</h3>
				<div className="flex flex-wrap justify-center gap-8 items-center">
					{partners.map((brand) => (
						<div key={brand.name} className="flex flex-col items-center">
							<img src={brand.logo} alt={brand.name} className="h-10 w-auto grayscale hover:grayscale-0 transition duration-300" />
							<span className="text-xs text-indigo-400 mt-1">{brand.name}</span>
						</div>
					))}
				</div>
			</section> */}

			{/* Animated Banner Section */}
			<section className="relative py-8 px-4 flex justify-center items-center bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 overflow-hidden">
				<div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
					<svg className="w-full h-full" viewBox="0 0 1440 320" fill="none">
						<path
							fill="url(#bannerGradient2)"
							fillOpacity="0.13"
							d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,133.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
						></path>
						<defs>
							<linearGradient id="bannerGradient2" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0%" stopColor="#6366f1" />
								<stop offset="100%" stopColor="#0ea5e9" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div className="z-10 flex flex-col md:flex-row items-center gap-8">
					<img
						src="https://cdn3d.iconscout.com/3d/premium/thumb/electronic-devices-6776642-5588372.png"
						alt="Banner Vector"
						className="w-40 h-40 object-contain rounded-xl shadow-lg animate-float"
					/>
					<div>
						<h2 className="text-2xl md:text-3xl font-bold text-indigo-100 mb-2">
							<span className="text-blue-400">Biggest</span> Wholesale Platform
						</h2>
						<p className="text-indigo-300 text-lg">
							Trusted by 10,000+ businesses. Get exclusive access to the latest tech, unbeatable prices, and a seamless wholesale experience.
						</p>
					</div>
				</div>
			</section>

			{/* Product Highlights Section */}
			<section className="py-10 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-lg p-8 border border-gray-800 animate-fadeIn">
						<img src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png" alt="Bulk" className="w-16 h-16 mb-4 animate-float" />
						<h3 className="text-xl font-bold text-indigo-200 mb-2">Bulk Orders</h3>
						<p className="text-indigo-300">Order in bulk and save more. Special pricing for businesses and resellers.</p>
					</div>
					<div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-lg p-8 border border-gray-800 animate-fadeIn">
						<img src="https://cdn-icons-png.flaticon.com/512/1042/1042332.png" alt="Warranty" className="w-16 h-16 mb-4 animate-float" />
						<h3 className="text-xl font-bold text-indigo-200 mb-2">Warranty & Support</h3>
						<p className="text-indigo-300">All products come with manufacturer warranty and 24/7 customer support.</p>
					</div>
					<div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-lg p-8 border border-gray-800 animate-fadeIn">
						<img src="https://cdn-icons-png.flaticon.com/512/1042/1042331.png" alt="Shipping" className="w-16 h-16 mb-4 animate-float" />
						<h3 className="text-xl font-bold text-indigo-200 mb-2">Express Shipping</h3>
						<p className="text-indigo-300">Lightning-fast delivery across India. Track your orders in real time.</p>
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section id="products" className="py-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
				<h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-200 mb-12 animate-slideUp">
					Featured Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{products.map((product, idx) => (
						<div
							key={product.id}
							className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center animate-fadeIn border border-gray-800"
							style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: "both" }}
						>
							<img
								src={product.image}
								alt={product.name}
								className="w-32 h-32 object-cover rounded-xl mb-4 shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-indigo-700"
							/>
							<div className="text-center space-y-2">
								<h3 className="text-xl font-semibold text-indigo-100">{product.name}</h3>
								<p className="text-indigo-300">{product.description}</p>
								<span className="inline-block bg-indigo-700/40 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold shadow">{product.feature}</span>
								<div>
									<span className="text-lg font-bold text-indigo-400">{product.price}</span>
								</div>
							</div>
							<button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition-transform duration-300">
								Buy Wholesale
							</button>
						</div>
					))}
				</div>
			</section>
			{/* 
			Blog/Guides Section
			<section className="py-14 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
				<h2 className="text-2xl md:text-3xl font-bold text-indigo-200 mb-8 text-center">
					Latest Guides & Tips
				</h2>
				<div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
					{blogPosts.map((post, idx) => (
						<a
							href={post.link}
							key={post.title}
							className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-lg border border-gray-800 overflow-hidden hover:scale-105 transition-transform duration-300 group"
						>
							<img src={post.image} alt={post.title} className="w-full h-40 object-cover group-hover:opacity-90 transition" />
							<div className="p-5">
								<h3 className="text-lg font-bold text-indigo-100 mb-2">{post.title}</h3>
								<span className="text-indigo-400 text-xs">Read More &rarr;</span>
							</div>
						</a>
					))}
				</div>
			</section> */}


			{/* About Section - This section incorporates the JSX you provided */}
			<section className="py-16 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 animate-fadeIn">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold text-indigo-200 mb-6 text-center">
						About Us
					</h2>
					{/* Detailed paragraphs to provide more context */}
					<div className="text-gray-300 text-lg space-y-4 mb-8">
						<p>
							We're committed to helping your business thrive. That's why we offer <strong className="text-indigo-400">bulk discounts for wholesalers</strong>, ensuring you get the best possible prices. Our catalog is constantly updated with the <strong className="text-indigo-400">latest electronic gadgets</strong>, so you can provide your customers with the most innovative products on the market.
						</p>
						<p>
							We know that in business, every moment counts. Our <strong className="text-indigo-400">fast shipping & secure payments</strong> options ensure a smooth, worry-free process from order to delivery. Should you have any questions or need assistance, our <strong className="text-indigo-400">dedicated customer support</strong> team is always ready to help. We're here to be your partner, not just another supplier.
						</p>
						<p>
							Our commitment to quality and service has earned the trust of businesses just like yours. We're proud to be <strong className="text-indigo-400">trusted by over 10,000 businesses</strong>—a testament to our reliability and the value we bring to our partners.
						</p>
					</div>

					{/* The list of features you provided */}
					<ul className="space-y-4 text-lg text-indigo-300 font-medium">
						<li className="flex items-center gap-2">
							<span className="text-indigo-400 text-xl">✓</span> Bulk discounts for wholesalers
						</li>
						<li className="flex items-center gap-2">
							<span className="text-indigo-400 text-xl">✓</span> Latest electronic gadgets
						</li>
						<li className="flex items-center gap-2">
							<span className="text-indigo-400 text-xl">✓</span> Fast shipping & secure payments
						</li>
						<li className="flex items-center gap-2">
							<span className="text-indigo-400 text-xl">✓</span> Dedicated customer support
						</li>
						<li className="flex items-center gap-2">
							<span className="text-indigo-400 text-xl">✓</span> Trusted by 10,000+ businesses
						</li>
					</ul>
					{/* Vector Illustration */}
					<div className="flex justify-center mt-10">
						<img
							src="/1.jpg"
							alt="Support Illustration"
							className="w-72 h-56 object-contain rounded-xl shadow-lg bg-indigo-900/10"
						/>
					</div>
					<div className="flex justify-center mt-10">
						<img
							src="/2.jpg"
							alt="Support Illustration"
							className="w-72 h-56 object-contain rounded-xl shadow-lg bg-indigo-900/10"
						/>
					</div>
					<div className="flex justify-center mt-10">
						<img
							src="/3.jpg"
							alt="Support Illustration"
							className="w-72 h-56 object-contain rounded-xl shadow-lg bg-indigo-900/10"
						/>
					</div>
					<div className="flex justify-center mt-10">
						<img
							src="/4.jpg"
							alt="Support Illustration"
							className="w-72 h-56 object-contain rounded-xl shadow-lg bg-indigo-900/10"
						/>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
				<h2 className="text-2xl md:text-3xl font-bold text-indigo-200 mb-10 text-center">
					What Our Customers Say
				</h2>
				<div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
					{testimonials.map((t, idx) => (
						<div
							key={t.name}
							className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fadeIn"
							style={{ animationDelay: `${0.2 * idx}s`, animationFillMode: "both" }}
						>
							<img
								src={t.avatar}
								alt={t.name}
								className="w-16 h-16 rounded-full mb-3 border-2 border-indigo-500 shadow"
							/>
							<p className="text-indigo-200 italic mb-2">"{t.text}"</p>
							<span className="text-indigo-400 font-semibold">{t.name}</span>
						</div>
					))}
				</div>
			</section>

			{/* Call to Action Banner */}
			<section className="py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900">
				<div className="flex-1 flex flex-col items-center md:items-start">
					<h3 className="text-2xl md:text-3xl font-bold text-indigo-100 mb-3">
						Elevate Your Business with{" "}
						<span className="text-blue-400">Wholesale</span>
					</h3>
					<p className="text-indigo-300 text-lg mb-4">
						Get exclusive access to the latest tech, unbeatable prices, and a seamless wholesale experience.
					</p>
					<a
						href="#products"
						className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
					>
						Explore Products
					</a>
				</div>
				<div className="flex-1 flex justify-center">
					{/* Animated SVG illustration */}
					<svg width="260" height="180" viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg">
						<ellipse cx="130" cy="90" rx="120" ry="70" fill="#6366f1" fillOpacity="0.13" />
						<rect x="60" y="60" width="140" height="60" rx="20" fill="#6366f1" fillOpacity="0.18" />
						<circle cx="130" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.22" />
						<rect x="110" y="80" width="40" height="20" rx="8" fill="#fff" fillOpacity="0.12">
							<animate attributeName="x" values="110;150;110" dur="2s" repeatCount="indefinite" />
						</rect>
					</svg>
				</div>
			</section>

			{/* Footer */}
			{/* <footer className="py-8 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-indigo-100 text-center animate-slideUp">
				<p className="text-lg font-medium">
					&copy; {new Date().getFullYear()} ElectroWholesale. All rights reserved.
				</p>
				<div className="flex justify-center gap-4 mt-2">
					<a href="mailto:support@electrowholesale.com" className="hover:text-blue-400 transition">Contact</a>
					<a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
					<a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
				</div>
			</footer> */}

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
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 3s ease-in-out infinite;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
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
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-18px);}
          }
        `}
			</style>
		</div>
	</>
	);
};

export default Home;