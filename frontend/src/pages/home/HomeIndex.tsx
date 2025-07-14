import AnimatedOnScrollCard from '@/components/card/AnimatedOnScrollCard';
import { Link } from 'react-router-dom';

export default function HomeIndex() {
  return (
    <main className="space-y-24 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <AnimatedOnScrollCard>
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-24">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Experience the Best <br />
              Coffee in Town
            </h1>
            <p className="text-gray-600 text-lg max-w-md">Indulge in our premium coffee blends and discover a world of rich flavors and aromas.</p>
            <Link to="/shop" className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              View Shop
            </Link>
          </div>
          <div className="md:w-1/3">
            <img src="/assets/images/cafe/cafe1.jpeg" alt="Interior Hero" className="size-[460px] max-w-lg rounded-xl mx-auto md:mx-0" />
          </div>
        </section>
      </AnimatedOnScrollCard>

      <AnimatedOnScrollCard>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">Coffee Shop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Americano', image: '/assets/images/cafe/americano.jpeg' },
              { name: 'Caramel', image: '/assets/images/cafe/caramel-mocha.jpeg' },
              { name: 'Espresso', image: '/assets/images/cafe/espresso.jpeg' },
              { name: 'Chocolate', image: '/assets/images/cafe/chocolate.jpeg' },
            ].map((cat, index) => (
              <AnimatedOnScrollCard key={cat.name} delay={index * 0.1}>
                <Link to={`/category/${cat.name.toLowerCase()}`} className="text-center">
                  <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <img src={cat.image} alt={cat.name} className="size-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <p className="text-base text-gray-700 font-mediu">{cat.name}</p>
                </Link>
              </AnimatedOnScrollCard>
            ))}
          </div>
        </section>
      </AnimatedOnScrollCard>

      {/* Simple CTA */}
      <AnimatedOnScrollCard>
        <section className="bg-black text-white rounded-2xl py-16 px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get Inspired with New Arrivals</h3>
          <p className="mb-6 text-gray-300">Subscribe and stay updated on latest design trends.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Email address" className="px-4 py-3 rounded-md w-full sm:flex-1 text-gray-900" />
            <button type="button" className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </form>
        </section>
      </AnimatedOnScrollCard>
    </main>
  );
}
