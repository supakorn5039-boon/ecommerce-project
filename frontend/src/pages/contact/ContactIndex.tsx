import { showSuccessToast } from '@/components/Toast/Toast';
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function ContactIndex() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast('Message sent successfully!');
    }, 2000);
  };

  return (
    <main className="px-4 md:px-8 lg:px-16 py-24 text-gray-800 max-w-6xl mx-auto space-y-20">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brown-900">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hi
          — feel free to reach out.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-brown-800">📍 Our Café</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              123 Brew Lane
              <br />
              Chiang Mai, Thailand 50100
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brown-800">🕒 Hours</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Mon – Fri: 8:00 AM – 6:00 PM
              <br />
              Sat – Sun: 9:00 AM – 8:00 PM
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brown-800">📞 Get in Touch</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Email:{' '}
              <a
                href="mailto:hello@brewhaven.com"
                className="text-brown-700 underline hover:text-brown-900"
              >
                hello@brewhaven.com
              </a>
              <br />
              Phone:{' '}
              <a href="tel:+66123456789" className="text-brown-700 underline hover:text-brown-900">
                +66 123 456 789
              </a>
            </p>
          </div>
        </div>

        <form
          className="space-y-6 bg-gradient-to-br from-amber-50 via-white to-brown-50 p-8 rounded-2xl shadow-lg animate-fade-in"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-brown-800">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400 transition"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-brown-800">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-brown-800">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-brown-400 transition"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 w-full bg-brown-800 text-white bg-black px-6 py-3 rounded-md font-medium transition-all duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brown-700'
            }`}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </main>
  );
}
