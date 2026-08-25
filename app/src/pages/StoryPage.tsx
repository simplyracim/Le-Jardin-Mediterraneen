import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { num: '01', title: 'Authenticity', desc: 'We honour traditional Mediterranean and Algerian recipes, using time-honoured techniques and authentic ingredients sourced from trusted suppliers.' },
  { num: '02', title: 'Quality', desc: 'From the freshest seafood to the finest olive oil, we never compromise on quality. Every ingredient is carefully selected to ensure exceptional flavour.' },
  { num: '03', title: 'Hospitality', desc: "We believe dining is about more than food — it's about connection. Our team is dedicated to creating warm, memorable experiences for every guest." },
  { num: '04', title: 'Community', desc: "We are proud to be part of Montreal's vibrant culinary community. We support local producers and strive to be a gathering place for our neighbourhood." },
];

export default function StoryPage() {
  const { language } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-section-animate', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 60%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/story-hero.jpg" alt="Our Story" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'nav.story')}</h1>
          <p className="font-serif italic text-xl text-brown/70">A journey of passion, tradition, and Mediterranean flavours.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-sand section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="story-section-animate overflow-hidden">
              <img src="/images/story-dining.jpg" alt="Restaurant" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
            <div>
              <h2 className="story-section-animate font-serif italic text-4xl md:text-5xl lg:text-6xl text-brown mb-6">
                The Story Behind Le Jardin Méditerranéen
              </h2>
              <div className="story-section-animate space-y-4 text-brown/80 leading-relaxed">
                <p>Le Jardin Méditerranéen was born from a deep love for the rich culinary traditions of the Mediterranean and Algeria. Our founder envisioned a place where guests could experience the warmth of Mediterranean hospitality combined with the bold, aromatic flavours of Algerian cuisine.</p>
                <p>Drawing inspiration from sun-drenched coasts, bustling spice markets, and family gatherings around overflowing tables, we crafted a menu that honours authentic recipes while embracing modern culinary techniques.</p>
                <p>Every dish at Le Jardin Méditerranéen tells a story — of ancient trade routes, of grandmothers' secret recipes, of shared meals that bring people together. We invite you to be part of our story.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brown text-white section-padding">
        <div className="container-custom">
          <p className="story-section-animate text-white/50 text-sm uppercase tracking-widest mb-3 text-center">Our Values</p>
          <h2 className="story-section-animate font-serif italic text-4xl md:text-5xl lg:text-6xl mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.num} className="story-section-animate border-t border-white/20 pt-6">
                <span className="text-terracotta font-serif text-3xl mb-3 block">{v.num}</span>
                <h4 className="font-medium uppercase tracking-wider text-sm mb-3">{v.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Gallery CTA */}
      <section className="bg-white section-padding">
        <div className="container-custom text-center">
          <h2 className="story-section-animate font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
            Explore Our Gallery
          </h2>
          <p className="story-section-animate text-brown/70 max-w-xl mx-auto mb-8">
            Take a visual journey through Le Jardin Méditerranéen — from our carefully crafted dishes to our warm, inviting spaces.
          </p>
          <Link to="/gallery" className="story-section-animate btn-terracotta inline-flex items-center gap-2 group">
            View Gallery
            <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
