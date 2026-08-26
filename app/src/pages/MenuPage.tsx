import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { menuCategories } from '@/data/menu';
import { Leaf, WheatOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MenuPage() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<{ v: boolean; gf: boolean }>({ v: false, gf: false });
  const [activeCategory, setActiveCategory] = useState<string>('');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-cat-section', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 60%', once: true },
      });
    });
    return () => ctx.revert();
  }, [language]);

  const filteredCategories = menuCategories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => {
      if (activeFilter.v && !item.tags?.includes('V')) return false;
      if (activeFilter.gf && !item.tags?.includes('GF')) return false;
      return true;
    }),
  }));

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    document.getElementById(catId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/menu-hero.jpg" alt="Menu" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">
            {t(language, 'menuPage.heading')}
          </h1>
          <p className="font-serif italic text-xl text-brown/70">
            {t(language, 'menuPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Navigation + Filters */}
      <div className="sticky top-16 md:top-20 bg-white z-30 border-b border-brown/10 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`text-xs md:text-sm font-medium uppercase tracking-wider py-2 px-3 transition-colors ${
                  activeCategory === cat.id ? 'text-terracotta border-b-2 border-terracotta' : 'text-brown/60 hover:text-brown'
                }`}
              >
                {cat.title}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setActiveFilter((p) => ({ ...p, v: !p.v }))}
                className={`flex items-center gap-1 text-xs font-medium uppercase py-2 px-3 border transition-all ${
                  activeFilter.v ? 'bg-terracotta text-white border-terracotta' : 'text-brown/60 border-brown/20 hover:border-terracotta'
                }`}
              >
                <Leaf size={12} /> V
              </button>
              <button
                onClick={() => setActiveFilter((p) => ({ ...p, gf: !p.gf }))}
                className={`flex items-center gap-1 text-xs font-medium uppercase py-2 px-3 border transition-all ${
                  activeFilter.gf ? 'bg-terracotta text-white border-terracotta' : 'text-brown/60 border-brown/20 hover:border-terracotta'
                }`}
              >
                <WheatOff size={12} /> GF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="bg-white pb-20">
        {filteredCategories.map((category) => (
          <section key={category.id} id={category.id} className="menu-cat-section">
            {/* Category Header */}
            <div className="bg-brown text-white py-10 md:py-12">
              <div className="container-custom">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3">{category.title}</h2>
                <p className="text-white/70 text-sm md:text-base">{category.description}</p>
              </div>
            </div>

            {/* Items */}
            <div className="container-custom py-8 md:py-10">
              {category.items.length === 0 ? (
                <p className="text-brown/50 text-sm italic">No items match the selected filters.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4 pb-6 border-b border-brown/10">
                      {item.image && (
                        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-md shadow-sm border border-brown/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium uppercase tracking-wider text-brown">{item.name}</h4>
                          <div className="flex gap-1">
                            {item.tags?.map((tag) => (
                              <span key={tag} className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-terracotta text-white rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-brown/60">{item.description}</p>
                      </div>
                      <span className="text-sm font-medium text-brown whitespace-nowrap">{item.price} DA</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Legend */}
        <div className="container-custom py-8 border-t border-brown/10">
          <div className="flex flex-wrap items-center gap-6 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-terracotta text-white rounded-full">V</span>
              <span className="text-sm text-brown/70">{t(language, 'menuPage.legendV')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-terracotta text-white rounded-full">GF</span>
              <span className="text-sm text-brown/70">{t(language, 'menuPage.legendGF')}</span>
            </div>
          </div>
          <p className="text-xs text-brown/50 italic">{t(language, 'menuPage.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
