import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function FeaturedSlider() {
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Modern Chair #${i + 1}`,
    description: 'Perfect for living rooms or offices',
    price: 249,
  }));

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handleNext = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  const last = startIndex + visibleCount >= products.length;

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 ${startIndex === 0 ? 'invisible' : ''}`}
        >
          <FaChevronLeft />
        </button>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {visibleProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition">
              <div className="bg-gray-100 h-48 mb-4 rounded-lg" />
              <h3 className="text-base font-medium text-gray-800 mb-1">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <div className="text-black font-semibold">${product.price}</div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={handleNext} className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 ${last ? 'invisible' : ''}`}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
