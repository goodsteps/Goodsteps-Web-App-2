import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Page } from '../types';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('Home'); }} className="block">
                <img 
                  src="https://ik.imagekit.io/kjvqdfdva/Goodsteps_Logo-preview.png?updatedAt=1762453251669" 
                  alt="Goodsteps Junior School Logo" 
                  className="h-16 w-auto"
                />
              </a>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.name);
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-colors duration-300 relative group ${
                      currentPage === link.name
                        ? (scrolled ? 'text-brand-purple' : 'text-white')
                        : (scrolled ? 'text-brand-text hover:text-brand-purple' : 'text-white/80 hover:text-white')
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${currentPage === link.name ? 'scale-x-100' : ''}`}></span>
                  </a>
                ))}
              </div>
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`transition-colors duration-300 ${scrolled || isMobileMenuOpen ? 'text-brand-purple' : 'text-white'}`}>
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <nav className="flex flex-col space-y-8 text-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name);
                }}
                className={`text-3xl font-bold font-heading transition-colors duration-300 ${
                  currentPage === link.name ? 'text-brand-purple' : 'text-brand-text hover:text-brand-purple'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;