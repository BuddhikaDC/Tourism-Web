import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">Sri Lanka Tours</h3>
            <p className="text-gray-400">
              Discover the wonders of Sri Lanka with our expertly crafted tours. Experience the perfect blend of nature, culture, and adventure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-emerald-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Tours</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="text-emerald-400" size={18} />
                <a href="mailto:info@srilankatours.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  info@srilankatours.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="text-emerald-400" size={18} />
                <a href="tel:+94112345678" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  +94 11 234 5678
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Sri Lanka Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
