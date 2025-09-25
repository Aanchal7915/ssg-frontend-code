import React from "react";

const Contact = () => (
  <section className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 flex items-center justify-center px-4 py-12">
    <div className="max-w-4xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200 p-8 md:p-12 flex flex-col md:flex-row gap-10 animate-fadeIn">
      
      {/* Left: Info & Map */}
      <div className="flex-1 flex flex-col justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e7490] font-serif mb-4 tracking-tight animate-fadeIn">
            Get in Touch
          </h2>
          <p className="text-[#1e3a8a]/80 mb-6 text-lg font-light animate-fadeIn delay-200">
            We'd love to hear from you! Fill out the form or reach us directly at our office.
          </p>

          <div className="space-y-4 text-[#1e3a8a] text-base font-sans">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#54B1CE]/20 animate-pulseSlow">
                <svg className="w-5 h-5 text-[#0e7490]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"></path>
                  <circle cx="12" cy="10" r="4"></circle>
                </svg>
              </span>
              SSG Pvt Ltd, 123 Main Street, New Delhi, India
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#54B1CE]/20 animate-pulseSlow delay-200">
                <svg className="w-5 h-5 text-[#0e7490]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9-4-16-3 7H2"></path>
                </svg>
              </span>
              +91 98765 43210
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#54B1CE]/20 animate-pulseSlow delay-400">
                <svg className="w-5 h-5 text-[#0e7490]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 12v1a4 4 0 01-8 0v-1"></path>
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0-2a4 4 0 01-4-4v-1a4 4 0 018 0v1a4 4 0 01-4 4z"></path>
                </svg>
              </span>
              info@ssg.com
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-blue-200 shadow-lg animate-fadeIn delay-600">
          <iframe
            title="SSG Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.77296340136!2d77.2090217!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b1e4e6e7b1%3A0x5e9b8e7b1e4e6e7b!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1695379200000!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-48 transition-all duration-700 hover:scale-105"
          ></iframe>
        </div>
      </div>

      {/* Right: Contact Form */}
      <form className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-blue-200 flex flex-col gap-6 animate-fadeIn delay-800">
        <h3 className="text-2xl font-bold text-[#0e7490] font-serif mb-2">Contact Form</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-blue-50 text-[#1e3a8a] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] transition-all duration-300 font-sans"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-blue-50 text-[#1e3a8a] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] transition-all duration-300 font-sans"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="bg-blue-50 text-[#1e3a8a] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] transition-all duration-300 font-sans"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="bg-blue-50 text-[#1e3a8a] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] transition-all duration-300 font-sans resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-[#54B1CE] via-[#0ea5e9] to-[#3b82f6] text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-[#54B1CE] transition-all duration-300 font-serif tracking-wide"
        >
          Send Message
        </button>
      </form>
    </div>

    <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
        .animate-fadeIn.delay-600 { animation-delay: 0.6s; }
        .animate-fadeIn.delay-800 { animation-delay: 0.8s; }

        @keyframes pulseSlow {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
        .animate-pulseSlow { animation: pulseSlow 6s infinite ease-in-out; }
      `}
    </style>
  </section>
);

export default Contact;
