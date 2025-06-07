import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="logo.png" 
              alt="Smart Invoice" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-gray-900">Smart Invoice</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Fonctionnalités
            </a>
            <a href="#tarifs" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Tarifs
            </a>
            
           <Link to="/login">Connexion</Link> 
      
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Essayez gratuitement
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Fonctionnalités
              </a>
              <a href="#tarifs" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Tarifs
              </a>
              <a href="#connexion" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Connexion
              </a>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold w-full">
                Essayez gratuitement
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;