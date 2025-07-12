import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white pt-12 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Café</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Discover quality furniture and decor to elevate your living space.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/category/coffee" className="hover:text-primary">
                Coffee
              </Link>
            </li>
            <li>
              <Link to="/category/non-coffee" className="hover:text-primary">
                Non Coffee
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-primary">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm py-6 text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}. Shop Mall. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
