
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import MiniCategory from "../../components/MinCategory";

const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">{product.description}</p>
  </div>
);

const assets = {
  header_headphone_image: "https://images-cdn.ubuy.co.in/66cb15b29c6bb53bf6591ff4-maho-beats-headphones-wireless-bluetooth.jpg",
  header_playstation_image: "https://4kwallpapers.com/images/wallpapers/playstation-5-pro-1920x1080-19032.jpg",
  header_macbook_image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23759755/bfarsace_190101_5333_0002.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400",
  arrow_icon: "",
};

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

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Duplicate useCases for seamless infinite scroll
  const duplicatedUseCases = [...useCases, ...useCases];

  return (
    <>
      <MiniCategory />
      <div className="w-full">
        <Hero />
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

        <div className="bg-white py-16 px-6 md:px-16 lg:px-32 overflow-x-hidden">
          <h2 className="text-3xl font-bold text-center text-[#54B1CE]">
            How Our Accessories Can Help You
          </h2>
          <p className="text-center mt-2 text-gray-600">
            Explore use cases and find products suited for your business
          </p>

          <div className="relative mt-12 max-w-5xl mx-auto overflow-hidden">
            <div
              className="flex gap-8 animate-infinite-scroll"
              style={{ width: `${(260 + 32) * duplicatedUseCases.length}px` }}
            >
              {duplicatedUseCases.map((useCase, index) => (
                <div
                  key={`${useCase.id}-${index}`}
                  className="w-64 h-64 bg-white border-4 border-[#54B1CE] rounded-full shadow-lg flex flex-col items-center justify-center p-6 hover:shadow-2xl group animate-slideCard"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="bg-[#54B1CE]/10 rounded-full w-16 h-16 flex items-center justify-center mb-3 border-2 border-[#54B1CE]/20 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={useCase.icon}
                      alt={useCase.title}
                      className="w-14 h-14 object-cover rounded-full border-2 border-white group-hover:rotate-[8deg] transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-base text-[#54B1CE] text-center mb-1 group-hover:text-[#0e7490] transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-center text-gray-600 text-sm">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Testimonial />

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
              0% { opacity: 0; transform: translateY(40px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-slideCard {
              animation: slideCard 0.7s cubic-bezier(.68,-0.55,.27,1.55) both;
            }

            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-${(260 + 32) * useCases.length}px); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll 20s linear infinite;
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
