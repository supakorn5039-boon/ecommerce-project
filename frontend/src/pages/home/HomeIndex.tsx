import AnimatedOnScrollCard from '@/components/card/AnimatedOnScrollCard';
import { SpinnerLoadingPulse } from '@/components/loading/SpinLoading';
import { ROUTES } from '@/constants/RouteConst';
import { ProductService } from '@/services/Product.service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomeIndex() {
  const { data, isLoading } = useQuery({
    queryKey: [ProductService.QUERY_KEY],
    queryFn: () => ProductService.getAllProducts(),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const paginatedData = data?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const handleNext = () => {
    if (data && (currentPage + 1) * itemsPerPage < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <SpinnerLoadingPulse />;

  return (
    <main className="space-y-24 px-4 md:px-8 lg:px-16">
      <AnimatedOnScrollCard>
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-24">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Experience the Best <br />
              Coffee in Town
            </h1>
            <p className="text-gray-600 text-lg max-w-md">
              Indulge in our premium coffee blends and discover a world of rich flavors and aromas.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              View Shop
            </Link>
          </div>
          <div className="md:w-1/3">
            <img
              src="/assets/images/cafe/cafe1.jpeg"
              alt="Interior Hero"
              className="size-[460px] max-w-lg rounded-xl mx-auto md:mx-0"
            />
          </div>
        </section>
      </AnimatedOnScrollCard>

      <AnimatedOnScrollCard>
        <section className="relative">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">Coffee Shop</h2>

          <div className="relative">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 ${
                currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <FaChevronLeft />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {paginatedData &&
                paginatedData.map((cat, index) => (
                  <AnimatedOnScrollCard key={cat.id} delay={index * 0.1}>
                    <Link to={`${ROUTES.SHOP}/${cat.id}`} className="text-center group">
                      <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="size-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <p className="text-base text-gray-700 font-medium">{cat.name}</p>
                    </Link>
                  </AnimatedOnScrollCard>
                ))}
            </div>

            <button
              onClick={handleNext}
              disabled={data && (currentPage + 1) * itemsPerPage >= data.length}
              className={`absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 ${
                data && (currentPage + 1) * itemsPerPage >= data.length
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </section>
      </AnimatedOnScrollCard>

      <AnimatedOnScrollCard>
        <section className="bg-black text-white rounded-2xl py-16 px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get Inspired with New Arrivals</h3>
          <p className="mb-6 text-gray-300">Subscribe and stay updated on latest design trends.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-3 rounded-md w-full sm:flex-1 text-gray-900"
            />
            <button
              type="button"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </AnimatedOnScrollCard>
    </main>
  );
}
