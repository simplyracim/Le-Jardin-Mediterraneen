import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      alert('Failed to send message. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-sand">
        <div className="text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'contact.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'contact.subtitle')}</p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="font-serif italic text-4xl md:text-5xl text-brown mb-10">{t(language, 'contact.getInTouch')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={22} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wider text-brown mb-1">{t(language, 'contact.address')}</h4>
                    <p className="text-brown/70 text-sm">1234 Rue Saint-Denis, Montreal, QC H2X 3J6</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={22} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wider text-brown mb-1">{t(language, 'contact.phone')}</h4>
                    <a href="tel:4383306424" className="text-brown/70 text-sm hover:text-terracotta">(438) 330-6424</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={22} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wider text-brown mb-1">{t(language, 'contact.email')}</h4>
                    <a href="mailto:info@lejardinmtl.com" className="text-brown/70 text-sm hover:text-terracotta">info@lejardinmtl.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={22} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wider text-brown mb-1">{t(language, 'contact.hours')}</h4>
                    <div className="text-brown/70 text-sm space-y-1">
                      <p>{t(language, 'footer.hours.weekdays')}</p>
                      <p>{t(language, 'footer.hours.weekends')}</p>
                      <p>{t(language, 'footer.hours.sunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.8!2d-73.566!3d45.516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMwJzU3LjYiTiA3M8KwMzMnNTcuNiJX!5e0!3m2!1sen!2sca!4v1"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
                className="grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="bg-brown text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl mb-4">{t(language, 'contact.readyToDine')}</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">{t(language, 'contact.reserveCta')}</p>
          <Link to="/reservations" className="btn-white inline-flex items-center gap-2 group">
            Reserve a Table
            <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]}" />
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-sand section-padding">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-brown mb-10 text-center">{t(language, 'contact.formHeading')}</h2>
          {submitted ? (
            <div className="text-center py-12 bg-white">
              <Mail size={48} className="text-terracotta mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-brown mb-2">{t(language, 'contact.success')}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder={t(language, 'contact.name') + '*'} required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="email" placeholder={t(language, 'contact.emailLabel') + '*'} required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <input type="tel" placeholder={t(language, 'contact.phoneLabel')} className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <select required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                <option value="">{t(language, 'contact.subject') + '*'}</option>
                <option>General Inquiry</option>
                <option>Reservation Question</option>
                <option>Feedback</option>
                <option>Private Event</option>
                <option>Other</option>
              </select>
              <textarea placeholder={t(language, 'contact.message') + '*'} required rows={5} className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              <button type="submit" disabled={submitting} className="btn-terracotta w-full md:w-auto disabled:opacity-50">
                {submitting ? 'Sending...' : t(language, 'contact.send')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
