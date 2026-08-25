import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-brown text-white">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Address */}
          <div>
            <h4 className="font-serif text-xl mb-6">{t(language, 'footer.address').split('\n')[0]}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-terracotta" />
                <p className="text-white/80 text-sm leading-relaxed">
                  1234 Rue Saint-Denis<br />
                  Montreal, QC H2X 3J6
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-terracotta" />
                <a href="tel:4383306424" className="text-white/80 text-sm hover:text-terracotta transition-colors">
                  {t(language, 'footer.phone')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-terracotta" />
                <a href="mailto:info@lejardinmtl.com" className="text-white/80 text-sm hover:text-terracotta transition-colors">
                  {t(language, 'footer.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-xl mb-6">{t(language, 'footer.hours.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 flex-shrink-0 text-terracotta" />
                <div className="text-white/80 text-sm space-y-1">
                  <p>{t(language, 'footer.hours.weekdays')}</p>
                  <p>{t(language, 'footer.hours.weekends')}</p>
                  <p>{t(language, 'footer.hours.sunday')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-6">Links</h4>
            <div className="space-y-2">
              {[
                { label: t(language, 'nav.menu'), path: '/menu' },
                { label: t(language, 'nav.story'), path: '/our-story' },
                { label: t(language, 'nav.gallery'), path: '/gallery' },
                { label: t(language, 'nav.events'), path: '/events' },
                { label: t(language, 'nav.careers'), path: '/careers' },
                { label: t(language, 'nav.reserve'), path: '/reservations' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-white/80 text-sm hover:text-terracotta transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4 className="font-serif text-xl mb-6">Follow Us</h4>
            <div className="flex gap-4 mb-8">
              <a href="#" className="text-white/80 hover:text-terracotta transition-colors">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-white/80 hover:text-terracotta transition-colors">
                <Facebook size={22} />
              </a>
            </div>
            <h5 className="text-sm font-medium uppercase tracking-wider mb-3">
              {t(language, 'footer.newsletter')}
            </h5>
            <div className="flex">
              <input
                type="email"
                placeholder={t(language, 'footer.placeholder')}
                className="flex-1 bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-terracotta transition-colors"
              />
              <button className="text-terracotta hover:text-white transition-colors px-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">{t(language, 'footer.copyright')}</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-white/50 text-xs hover:text-terracotta transition-colors">
              {t(language, 'footer.privacy')}
            </Link>
            <Link to="/terms-of-use" className="text-white/50 text-xs hover:text-terracotta transition-colors">
              {t(language, 'footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
