import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function OrderOnlinePage() {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen bg-sand flex items-center justify-center py-20 px-5">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-5xl md:text-7xl text-brown mb-6">{t(language, 'orderOnline.heading')}</h1>
        <p className="text-brown/70 mb-8 leading-relaxed">{t(language, 'orderOnline.body')}</p>
        <div className="overflow-hidden rounded-lg mb-8">
          <img src="/images/order-takeaway.jpg" alt="Takeaway" className="w-full h-64 object-cover" />
        </div>
        <a
          href="https://www.ubereats.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-terracotta inline-flex items-center gap-2 text-lg py-4 px-10"
        >
          {t(language, 'orderOnline.cta')}
          <ExternalLink size={18} />
        </a>
        <p className="text-brown/50 text-xs mt-6">{t(language, 'orderOnline.note')}</p>
      </div>
    </section>
  );
}
