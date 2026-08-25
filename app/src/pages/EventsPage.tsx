import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

const features = [
  'Private dining room for up to 40 guests',
  'Customized menu options',
  'Dedicated event coordinator',
  'Audio-visual equipment available',
  'Floral and decor arrangements',
  'Wine pairing recommendations',
];

export default function EventsPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', guests: '', date: '', details: '', heardFrom: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/reservation-dining.jpg" alt="Private Events" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'eventsPage.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'eventsPage.subtitle')}</p>
        </div>
      </section>

      {/* Private Dining Info */}
      <section className="bg-sand section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-brown mb-6">
                {t(language, 'eventsPage.sectionHeading')}
              </h2>
              <p className="text-brown/80 leading-relaxed mb-8">{t(language, 'eventsPage.body')}</p>
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={18} className="text-terracotta mt-0.5 flex-shrink-0" />
                    <span className="text-brown/80 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#inquiry-form" className="btn-terracotta inline-flex items-center gap-2 group">
                {t(language, 'eventsPage.inquire')}
                <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
              </a>
            </div>
            <div className="overflow-hidden">
              <img src="/images/gallery-4.jpg" alt="Private dining" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="bg-white section-padding">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-brown mb-10 text-center">{t(language, 'eventsPage.formHeading')}</h2>

          {submitted ? (
            <div className="text-center py-12 bg-sand">
              <Check size={48} className="text-terracotta mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-brown mb-2">Thank you!</h3>
              <p className="text-brown/70">We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name*" required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="email" placeholder="Email Address*" required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="Phone Number*" required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <select required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}>
                  <option value="">Event Type*</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Wedding</option>
                  <option>Anniversary</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" placeholder="Number of Guests*" required min="1" className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} />
                <input type="date" required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <textarea placeholder="Event Details" rows={4} className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors resize-none" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
              <button type="submit" className="btn-terracotta w-full md:w-auto">{t(language, 'eventsPage.sendInquiry')}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
