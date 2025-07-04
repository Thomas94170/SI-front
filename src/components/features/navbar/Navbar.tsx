import React, { useState, useEffect } from 'react';
import { FileText, Receipt, Home, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouseAtTop, setMouseAtTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mouseAtTop) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 50) {
        setMouseAtTop(true);
        setIsVisible(true);
      } else {
        setMouseAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, mouseAtTop]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Titre */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/logo.png"
                  alt="Smart Invoice Logo"
                  className="w-6 h-6 object-contain rounded"
                />
              </div>
              <span className="text-xl font-bold text-white">Smart Invoice</span>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <NavItem icon={<Home className="w-5 h-5" />} label="Dashboard" to="/dashboard" />
              <NavItem icon={<FileText className="w-5 h-5" />} label="Devis & Facturation" to="/quote-invoice" />
              <NavItem icon={<Receipt className="w-5 h-5" />} label="Gestion des factures" to="/invoice-management" />
              <NavItem icon={<Receipt className="w-5 h-5" />} label="Factures externes" to="/doc-management" />
              <NavItem icon={<LogOut className="w-5 h-5" />} label="Se déconnecter" to="/logout" isLogout />
            </div>

            {/* Burger mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none bg-customOrange">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-900 z-40 shadow-lg border-t border-slate-800">
          <div className="flex flex-col space-y-1 p-4">
            <NavItem icon={<Home className="w-5 h-5" />} label="Dashboard" to="/dashboard" onClick={closeMobileMenu} />
            <NavItem icon={<FileText className="w-5 h-5" />} label="Devis & Facturation" to="/quote-invoice" onClick={closeMobileMenu} />
            <NavItem icon={<Receipt className="w-5 h-5" />} label="Gestion des factures" to="/invoice-management" onClick={closeMobileMenu} />
            <NavItem icon={<Receipt className="w-5 h-5" />} label="Factures externes" to="/doc-management" onClick={closeMobileMenu} />
            <NavItem icon={<LogOut className="w-5 h-5" />} label="Se déconnecter" to="/logout" isLogout onClick={closeMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  active?: boolean;
  isLogout?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  to = '#',
  active = false,
  isLogout = false,
  onClick,
}: NavItemProps) => {
  const baseClass = `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
    active
      ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-400 border border-amber-500/30'
      : isLogout
        ? 'text-red-400 hover:text-white hover:bg-red-500/20'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
  }`;

  return (
    <Link to={to} onClick={onClick} className={baseClass}>
      <span
        className={`transition-colors ${
          active ? 'text-amber-400' : isLogout ? 'text-red-400' : 'text-slate-400 group-hover:text-white'
        }`}
      >
        {icon}
      </span>
      <span className="font-medium text-sm whitespace-nowrap">{label}</span>
    </Link>
  );
};

export default Navbar;
