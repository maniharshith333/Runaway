import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScrollVelocity from './ScrollVelocity';

const faqs = [
  {
    question: 'Do you ship all over India?',
    answer: 'Yes, we ship to all serviceable pincodes across India via our trusted courier partners.',
  },
  {
    question: 'Is Cash on delivery available?',
    answer: 'Yes, Cash on Delivery (COD) is available on most products unless mentioned otherwise.',
  },
  {
    question: 'When will my order arrive?',
    answer: 'Orders are typically delivered within 5-7 business days depending on your location.',
  },
  {
    question: 'Do you offer returns / exchanges?',
    answer: 'We currently do not offer returns or exchanges. Please refer to the size chart carefully before placing your order.',
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="w-full px-4 text-sm text-gray-700 max-w-6xl mx-auto">
      {/* ScrollVelocity Section */}
      <div className="relative w-full overflow-hidden py-10">
        <ScrollVelocity
          texts={['RUNAWAY', 'CULTURE', 'FREEDOM']}
          velocity={100}
          className="text-black text-2xl md:text-4xl font-extrabold uppercase tracking-wide"
          parallaxClassName="w-full"
          scrollerClassName="gap-12"
          numCopies={15}
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions (FAQs)</h2>

      {/* FAQs */}
      <div className="divide-y border rounded-md max-w-2xl mx-auto mb-10">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full text-left flex justify-between items-center px-4 py-3 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <div
              className={`px-4 pb-4 text-gray-600 transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-40' : 'max-h-0 overflow-hidden'
              }`}
            >
              {openIndex === index && faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Email subscription */}
      <div className="text-center mb-10">
        <p className="mb-3">Be the first to know about new collections and exclusive offers.</p>
        <form className="flex justify-center flex-wrap gap-2">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-400 px-4 py-2 w-64 rounded outline-none"
          />
          <button type="submit" className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
            →
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-4 font-medium pb-10">
        <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
        <Link to="/refund-policy" className="hover:underline">Cancellation & Refund Policy</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <Link to="/shipping" className="hover:underline">Shipping & Delivery Policy</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
      </div>
    </footer>
  );
};

export default Footer;

