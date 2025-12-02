import { Scale, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Platform': ['Home', 'Lawyers', 'Chat', 'About'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
    'Support': ['Help Center', 'Contact Us', 'FAQ', 'Status']
  };

  return (
    <footer className="bg-[#263238] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-[#1E88E5]" />
              <span className="text-xl font-medium text-white">
                Virtual Legal Assistant
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting you with professional legal assistance through AI-powered technology and verified lawyers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#1E88E5]" />
                <span>harshithvairam@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#1E88E5]" />
                <span>+91 8015808168</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#1E88E5]" />
                <span>Chennai, IND</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-gray-400 hover:text-[#1E88E5] transition-colors duration-200">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Virtual Legal Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}