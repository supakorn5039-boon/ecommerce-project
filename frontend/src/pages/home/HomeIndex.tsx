import { Link } from 'react-router-dom';

export default function HomeIndex() {
  return (
    <main className="space-y-24 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-24">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Discover Interior <br />
            Elegance Online
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Find handpicked collections of furniture, decor, and home essentials to transform your space.
          </p>
          <Link to="/shop" className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <img src="/assets/images/furniture/hero.jpg" alt="Interior Hero" className="w-full max-w-lg mx-auto md:mx-0" />
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Furniture', image: '/assets/images/furniture/fur.jpg' },
            { name: 'Lighting', image: '/assets/images/furniture/light.jpg' },
            { name: 'Decor', image: '/assets/images/furniture/decor.jpg' },
            { name: 'Rugs', image: '/assets/images/furniture/rugs.jpg' },
          ].map((cat) => (
            <Link key={cat.name} to={`/category/${cat.name.toLowerCase()}`} className="group text-center">
              <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <p className="text-sm text-gray-700 font-medium group-hover:text-black transition">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border hover:shadow-md transition">
              <div className="bg-gray-100 h-48 mb-4 rounded-lg"></div>
              <h3 className="text-base font-medium text-gray-800 mb-1">Modern Chair #{i}</h3>
              <p className="text-sm text-gray-500 mb-2">Perfect for living rooms or offices</p>
              <div className="text-black font-semibold">$249</div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple CTA */}
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
    </main>
  );
}
