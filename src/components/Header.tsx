import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Scale } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  user: any;
}

export function Header({ onNavigate, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Lawyers', page: 'lawyers' },
    { name: 'Chat', page: 'chat' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Scale className="h-8 w-8 text-[#1E88E5]" />
            <span className="text-xl font-medium text-[#263238]">
              Virtual Legal Assistant
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                className="text-gray-700 hover:text-[#1E88E5] transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1E88E5] transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                className="bg-[#1E88E5] hover:bg-[#1565C0] text-white"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-[#1E88E5] transition-colors duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-gray-700">Welcome, {user.name}</p>
                    <Button
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      onNavigate('login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white"
                  >
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}