import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import LanguageToggle from './LanguageToggle';
import { usePortfolio } from '../hooks/usePortfolio';

const Header = ({ language, onLanguageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { portfolioData } = usePortfolio(language);

  const navigationItems = [
    { name: language === 'en' ? 'Home' : 'Hjem', href: '/' },
    { name: language === 'en' ? 'About Me' : 'Om meg', href: '/about' },
    { name: language === 'en' ? 'Resume' : 'CV', href: '/resume' },
    { name: language === 'en' ? 'Projects' : 'Prosjekter', href: '/projects' },
    { name: language === 'en' ? 'Blog' : 'Artikler', href: '/blog' },
    { name: language === 'en' ? 'Contact' : 'Kontakt', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Use portfolio data or fallback to defaults
  const personalData = portfolioData?.personal || {
    title: language === 'en' ? 'Audit Accountant at KPMG' : 'Revisjonsrevisor i KPMG',
    linkedin: 'https://www.linkedin.com/in/andreasstenberg/',
    github: 'https://github.com/Hat10'
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Andreas Stenberg</h1>
              <p className="text-sm text-gray-600">{personalData.title}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Language toggle and social links */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <LanguageToggle
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 rounded-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200 flex items-center space-x-4">
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;