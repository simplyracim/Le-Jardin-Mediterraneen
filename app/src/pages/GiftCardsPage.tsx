import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { Gift } from 'lucide-react';

export default function GiftCardsPage() {
  const { language } = useLanguage();

  const cards = [
    { amount: '$50', desc: language === 'fr' ? 'Parfait pour un léger déjeuner ou des cocktails.' : 'Perfect for a light lunch or cocktails.' },
    { amount: '$100', desc: language === 'fr' ? 'Idéal pour un dîner romantique pour deux.' : 'Ideal for a romantic dinner for two.' },
    { amount: '$200', desc: language === 'fr' ? "L'expérience gastronomique ultime." : 'The ultimate dining experience.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/menu-dinner.jpg" alt="Gift Cards" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'giftCardsPage.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'giftCardsPage.subtitle')}</p>
        </div>
      </section>

      {/* Gift Story */}
      <section className="bg-sand section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="overflow-hidden">
              <img src="/images/story-dining.jpg" alt="Gift dining" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
            <div>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-brown mb-6">
                {t(language, 'giftCardsPage.storyHeading')}
              </h2>
              <p className="text-brown/80 leading-relaxed">{t(language, 'giftCardsPage.storyBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <h2 className="text-center font-serif text-4xl md:text-5xl text-brown mb-4">
            {t(language, 'giftCardsPage.chooseHeading')}
          </h2>
          <div className="w-24 h-px bg-brown/20 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <div key={card.amount} className="group border border-brown/10 hover:border-brown/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-sand p-8 text-center">
                  <Gift size={40} className="text-terracotta mx-auto mb-4" />
                  <h3 className="font-serif text-4xl text-brown mb-2">{card.amount}</h3>
                  <p className="text-brown/60 text-sm mb-6">{card.desc}</p>
                  <button className="btn-terracotta w-full">{t(language, 'giftCardsPage.purchase')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
