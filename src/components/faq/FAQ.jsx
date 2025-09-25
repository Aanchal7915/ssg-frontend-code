import React, { useState } from "react";

const faqs = [
  {
    category: "Electronics",
    qas: [
      {
        question: "What is the warranty period for electronics?",
        answer: "All electronics come with a minimum 1-year manufacturer warranty. Some products may offer extended warranties.",
      },
      {
        question: "Can I return a faulty electronic item?",
        answer: "Yes, faulty electronics can be returned within 10 days of delivery for a replacement or refund.",
      },
      {
        question: "Do you offer installation services for electronics?",
        answer: "Yes, installation services are available for select products. Please check the product page for details.",
      },
    ],
  },
  {
    category: "Clothing",
    qas: [
      {
        question: "What is your clothing return policy?",
        answer: "Clothing items can be returned within 15 days of delivery, provided they are unused and have all original tags.",
      },
      {
        question: "How do I find my size?",
        answer: "Each product page includes a size chart. If you need further assistance, contact our support team.",
      },
      {
        question: "Are the clothes machine washable?",
        answer: "Most clothing items are machine washable. Please refer to the care instructions on the product label.",
      },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState({});

  const toggle = (catIdx, qIdx) => {
    setOpen((prev) => ({
      ...prev,
      [`${catIdx}-${qIdx}`]: !prev[`${catIdx}-${qIdx}`],
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 py-16 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-[#0e7490] font-mono mb-10 tracking-tight animate-fade-in">
        Frequently Asked Questions
      </h2>
      <div className="w-full max-w-3xl space-y-6">
        {faqs.map((cat, catIdx) => (
          <div key={cat.category} className="mb-6">
            {/* Category title optional */}
            <div className="space-y-4">
              {cat.qas.map((qa, qIdx) => (
                <div
                  key={qa.question}
                  className="bg-white border-2 border-[#54B1CE]/30 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
                    onClick={() => toggle(catIdx, qIdx)}
                  >
                    <span className="text-lg text-[#0e7490] font-semibold font-sans group-hover:text-[#54B1CE] transition">
                      {qa.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-[#54B1CE] transform transition-transform duration-300 ${
                        open[`${catIdx}-${qIdx}`] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`px-6 pb-4 text-gray-700 text-base font-sans transition-all duration-500 ${
                      open[`${catIdx}-${qIdx}`]
                        ? "max-h-40 opacity-100 animate-fade-in"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
        }
        `}
      </style>
    </section>
  );
};

export default FAQ;
