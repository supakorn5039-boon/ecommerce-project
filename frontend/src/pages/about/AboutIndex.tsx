export default function AboutIndex() {
  return (
    <main className="px-4 md:px-8 lg:px-16 py-24 space-y-20 text-gray-800">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-brown-900">About Brew Haven</h1>
        <p className="text-lg text-gray-600">A cozy corner where passion for coffee meets warm community spirit.</p>
      </section>

      {/* Image + Text Section */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <img src="/assets/images/cafe/cafe1.jpeg" alt="Our Café" className="size-2/3 rounded-2xl shadow-md" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-semibold text-brown-800">Our Story</h2>
          <p className="text-gray-600 text-lg">
            Established in 2022, Brew Haven was born from a desire to create more than just a coffee shop — a place where conversations bloom,
            creativity brews, and every cup tells a story. We source only the finest beans, roast them with love, and serve them with heart.
          </p>
          <p className="text-gray-600 text-lg">
            Whether you're here for your morning espresso or a late-night latte with friends, our team is dedicated to making every visit warm and
            memorable.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-12">
        <h2 className="text-2xl font-semibold text-center text-brown-800">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <img src="/assets/images/icon/coffee-beans.png" alt="Quality Beans" className="w-12 mx-auto" />
            <h3 className="font-semibold text-lg">Quality Beans</h3>
            <p className="text-gray-600 text-sm">We hand-select sustainable beans for every brew we serve.</p>
          </div>
          <div className="space-y-2">
            <img src="/assets/images/icon/group.png" alt="Community" className="w-12 mx-auto" />
            <h3 className="font-semibold text-lg">Community</h3>
            <p className="text-gray-600 text-sm">Our space is built for creatives, thinkers, and dreamers.</p>
          </div>
          <div className="space-y-2">
            <img src="/assets/images/icon/passion.png" alt="Passion" className="w-12 mx-auto" />
            <h3 className="font-semibold text-lg">Passion</h3>
            <p className="text-gray-600 text-sm">Every drink is crafted with care and attention to detail.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brown-800 bg-black text-white py-16 px-6 rounded-2xl text-center space-y-4">
        <h2 className="text-2xl font-semibold">Visit Us Today</h2>
        <p className="text-brown-200 max-w-xl mx-auto">Drop by our cozy shop and enjoy a cup of happiness — we can't wait to meet you!</p>
        <button className="bg-white text-black text-brown-800 px-6 py-3 rounded-md hover:bg-brown-100 transition font-medium">Get Directions</button>
      </section>
    </main>
  );
}
