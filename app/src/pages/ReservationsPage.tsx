import { useState } from 'react';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function ReservationsPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    guests: '', date: '', time: '', name: '', email: '', phone: '', requests: '', seating: 'indoor',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/reservation-hero.jpg" alt="Reservations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'reservations.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'reservations.subtitle')}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif italic text-4xl md:text-5xl text-brown mb-10">{t(language, 'reservations.formHeading')}</h2>
              {submitted ? (
                <div className="text-center py-12 bg-sand">
                  <Check size={48} className="text-terracotta mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-brown mb-2">Reservation Confirmed!</h3>
                  <p className="text-brown/70">We look forward to seeing you.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <select required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })}>
                      <option value="">{t(language, 'reservations.guests')}*</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    <input type="date" required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    <select required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-brown/70" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}>
                      <option value="">{t(language, 'reservations.time')}*</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder={t(language, 'reservations.name') + '*'} required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" placeholder={t(language, 'reservations.email') + '*'} required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <input type="tel" placeholder={t(language, 'reservations.phone') + '*'} required className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                  <div>
                    <p className="text-sm text-brown/60 mb-3">{t(language, 'reservations.seating')}</p>
                    <div className="flex gap-6">
                      {['indoor', 'outdoor', 'bar'].map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="seating" value={s} checked={formData.seating === s} onChange={(e) => setFormData({ ...formData, seating: e.target.value })} className="accent-terracotta" />
                          <span className="text-sm text-brown capitalize">{t(language, `reservations.${s}` as 'reservations.indoor')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <textarea placeholder={t(language, 'reservations.requests')} rows={3} className="w-full bg-transparent border-b border-brown/30 py-3 text-sm focus:outline-none focus:border-terracotta transition-colors resize-none" value={formData.requests} onChange={(e) => setFormData({ ...formData, requests: e.target.value })} />
                  <button type="submit" className="btn-terracotta w-full md:w-auto">{t(language, 'reservations.confirm')}</button>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 bg-sand p-8 h-fit">
              <h3 className="font-serif text-2xl text-brown mb-6">Contact Info</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-terracotta" />
                  <a href="tel:4383306424" className="text-brown/80 text-sm hover:text-terracotta">(438) 330-6424</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-terracotta" />
                  <a href="mailto:info@lejardinmtl.com" className="text-brown/80 text-sm hover:text-terracotta">info@lejardinmtl.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-terracotta mt-0.5" />
                  <p className="text-brown/80 text-sm">1234 Rue Saint-Denis<br />Montreal, QC H2X 3J6</p>
                </div>
              </div>
              <div className="border-t border-brown/20 pt-6">
                <h4 className="font-medium text-sm uppercase tracking-wider text-brown mb-3">Reservation Policies</h4>
                <ul className="space-y-2">
                  {t(language, 'reservations.policies').split('|').map((policy, i) => (
                    <li key={i} className="text-brown/60 text-xs">{policy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
