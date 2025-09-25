import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <footer className="w-full bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 text-[#0e7490] shadow-inner font-serif animate-fadeIn">
      <div className="container mx-auto px-5 py-12 flex flex-col md:flex-row md:items-start gap-10 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start md:w-1/4 text-center md:text-left">
          <figure className="relative w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full p-[3px] overflow-visible group mb-3">
            <div className="absolute inset-0 rounded-full blur opacity-50 bg-[conic-gradient(#38bdf8,#3b82f6,#0ea5e9,#38bdf8)] animate-border-revolve"></div>
            <div className="absolute inset-0 rounded-full p-[3px] overflow-hidden">
              <div className="w-full h-full rounded-full bg-[conic-gradient(#38bdf8,#3b82f6,#0ea5e9,#38bdf8)] animate-border-revolve"></div>
            </div>
            <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center">
              <img
                src="/logo-10.png"
                className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-cover rounded-full shadow-lg"
                alt="logo"
              />
            </div>
          </figure>
          <h1 className="text-lg md:text-xl font-bold text-[#0e7490] tracking-tight mb-1 animate-fadeIn">
            SSG Platform
          </h1>
          <p className="text-sm font-light leading-relaxed max-w-xs md:max-w-none animate-fadeIn">
            Modern solutions for your workflow. Seamless integration, robust support, and a vibrant community.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 flex-1 text-center sm:text-left">
          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest uppercase animate-fadeIn">
              Quick links
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">About us</a></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><a className="footer-link">Products</a></li>
              <li><a className="footer-link">Featured Products</a></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest uppercase animate-fadeIn">
              Support
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">Contact Support</a></li>
              <li><a className="footer-link">Help Resources</a></li>
              <li><a className="footer-link">Release Updates</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest uppercase animate-fadeIn">
              Platform
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">Terms &amp; Privacy</a></li>
              <li><a className="footer-link">Pricing</a></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><a className="footer-link">Order Status</a></li>
              <li><a className="footer-link">Return & Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-5 pb-6 pt-4 border-t border-blue-200 text-center">
        <p className="text-sm md:text-md font-light tracking-wide animate-fadeIn">
          © {new Date().getFullYear()} All rights reserved - SSG
        </p>
      </div>

      <style>
        {`
        @keyframes border-revolve {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-border-revolve {
          animation: border-revolve 6s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        .footer-link {
          @apply hover:text-[#0ea5e9] transition cursor-pointer relative font-medium tracking-wide font-sans;
        }
        .footer-link::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg,#0ea5e9,#3b82f6);
          transition: width 0.3s;
        }
        .footer-link:hover::after, .footer-link:focus::after {
          width: 100%;
        }
        `}
      </style>
    </footer>
  </>
);

export default Footer;
