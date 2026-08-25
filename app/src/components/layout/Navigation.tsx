import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { t } from '@/data/translations';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: t(language, 'nav.home'), path: '/' },
    { label: t(language, 'nav.menu'), path: '/menu' },
    { label: t(language, 'nav.story'), path: '/our-story' },
    { label: t(language, 'nav.gallery'), path: '/gallery' },
    { label: t(language, 'nav.events'), path: '/events' },
    { label: t(language, 'nav.giftCards'), path: '/gift-cards' },
    { label: t(language, 'nav.contact'), path: '/contact' },
  ];

  const reservePath = '/reservations';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 z-50">
              <span
                className={`font-serif text-lg md:text-xl leading-tight transition-colors duration-300 ${
                  scrolled || mobileOpen ? 'text-brown' : 'text-white'
                }`}
              >
                Le Jardin
                <br />
                <span className="italic">Méditerranéen</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    scrolled ? 'text-brown' : 'text-white'
                  } ${isActive(link.path) ? 'border-b-2 border-terracotta' : 'hover:text-terracotta'}`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    scrolled ? 'text-brown' : 'text-white'
                  } ${isActive('/admin') ? 'border-b-2 border-terracotta' : 'hover:text-terracotta'}`}
                >
                  {t(language, 'nav.admin')}
                </Link>
              )}
            </div>

            {/* Right Side: Reserve + Language + Auth */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  scrolled ? 'text-brown' : 'text-white'
                }`}
              >
                <span className={language === 'en' ? 'font-bold text-terracotta' : ''}>EN</span>
                <span className="mx-1">/</span>
                <span className={language === 'fr' ? 'font-bold text-terracotta' : ''}>FR</span>
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${scrolled ? 'text-brown' : 'text-white'}`}>
                    {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className={`btn-terracotta text-xs py-2 px-4 ${
                      scrolled ? '' : 'border-white text-white hover:bg-white hover:text-brown'
                    }`}
                  >
                    {t(language, 'nav.logout')}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    scrolled ? 'text-brown hover:text-terracotta' : 'text-white hover:text-terracotta'
                  }`}
                >
                  {t(language, 'nav.login')}
                </Link>
              )}

              <Link
                to={reservePath}
                className={`btn-terracotta text-xs py-2 px-4 ${
                  scrolled ? '' : 'border-white text-white hover:bg-white hover:text-brown'
                }`}
              >
                {t(language, 'nav.reserve')}
              </Link>

              <Link
                to="/order-online"
                className={`text-xs font-medium uppercase tracking-wider border py-2 px-4 transition-all duration-300 ${
                  scrolled
                    ? 'border-brown text-brown hover:bg-terracotta/15 hover:border-terracotta hover:text-terracotta'
                    : 'border-white text-white hover:bg-white hover:text-brown'
                }`}
              >
                {t(language, 'nav.orderOnline')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden z-50 p-2 ${
                scrolled || mobileOpen ? 'text-brown' : 'text-white'
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-sand flex flex-col items-center justify-center gap-6 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-2xl font-serif text-brown hover:text-terracotta transition-colors ${
                isActive(link.path) ? 'text-terracotta' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="text-2xl font-serif text-brown hover:text-terracotta">
              {t(language, 'nav.admin')}
            </Link>
          )}
          <div className="flex flex-col items-center gap-4 mt-4">
            <button onClick={toggleLanguage} className="text-sm font-medium uppercase text-brown">
              <span className={language === 'en' ? 'font-bold text-terracotta' : ''}>EN</span>
              <span className="mx-2">/</span>
              <span className={language === 'fr' ? 'font-bold text-terracotta' : ''}>FR</span>
            </button>
            {user ? (
              <button onClick={logout} className="btn-terracotta text-sm">
                {t(language, 'nav.logout')}
              </button>
            ) : (
              <Link to="/login" className="btn-terracotta text-sm">
                {t(language, 'nav.login')}
              </Link>
            )}
            <Link to={reservePath} className="btn-terracotta text-sm">
              {t(language, 'nav.reserve')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
