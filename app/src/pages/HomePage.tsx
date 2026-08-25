import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { testimonials } from '@/data/testimonials';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const menusRef = useRef<HTMLElement>(null);
  const chefRef = useRef<HTMLElement>(null);
  const reserveRef = useRef<HTMLElement>(null);
  const teaserRef = useRef<HTMLElement>(null);

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.hero-content > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.3 });

      // Story section
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.querySelectorAll('.story-animate'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%', once: true },
        });
      }

      // Testimonials
      if (testimonialsRef.current) {
        gsap.fromTo(testimonialsRef.current.querySelectorAll('.testimonial-animate'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%', once: true },
        });
      }

      // Menus
      if (menusRef.current) {
        gsap.fromTo(menusRef.current.querySelectorAll('.menu-card'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: menusRef.current, start: 'top 80%', once: true },
        });
      }

      // Chef
      if (chefRef.current) {
        gsap.fromTo(chefRef.current.querySelectorAll('.chef-animate'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: chefRef.current, start: 'top 80%', once: true },
        });
      }

      // Reservation CTA
      if (reserveRef.current) {
        gsap.fromTo(reserveRef.current.querySelectorAll('.reserve-animate'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: reserveRef.current, start: 'top 80%', once: true },
        });
      }

      // Menu Teaser
      if (teaserRef.current) {
        gsap.fromTo(teaserRef.current.querySelectorAll('.teaser-card'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: teaserRef.current, start: 'top 80%', once: true },
        });
      }
    });

    return () => ctx.revert();
  }, [language]);

  const menuCategories = [
    { title: t(language, 'menus.lunch.title'), desc: t(language, 'menus.lunch.desc'), image: '/images/menu-lunch.jpg', cta: t(language, 'menus.lunch.cta') },
    { title: t(language, 'menus.dinner.title'), desc: t(language, 'menus.dinner.desc'), image: '/images/menu-dinner.jpg', cta: t(language, 'menus.dinner.cta') },
    { title: t(language, 'menus.cocktails.title'), desc: t(language, 'menus.cocktails.desc'), image: '/images/menu-cocktails.jpg', cta: t(language, 'menus.cocktails.cta') },
  ];

  const teaserDishes = [
    { title: t(language, 'menuTeaser.dishes.0.title'), desc: t(language, 'menuTeaser.dishes.0.desc'), image: '/images/dish-mezze.jpg' },
    { title: t(language, 'menuTeaser.dishes.1.title'), desc: t(language, 'menuTeaser.dishes.1.desc'), image: '/images/dish-couscous.jpg' },
    { title: t(language, 'menuTeaser.dishes.2.title'), desc: t(language, 'menuTeaser.dishes.2.desc'), image: '/images/dish-tagine.jpg' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-main.jpg" alt="Mediterranean dish" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="hero-content relative z-10 text-center text-white px-5 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4">
            Le Jardin
            <br />
            <span className="italic">Méditerranéen</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif italic mb-2 opacity-90">
            {t(language, 'hero.title')}
          </p>
          <p className="text-base md:text-lg font-light mb-8 opacity-80 max-w-xl mx-auto">
            {t(language, 'hero.tagline')}
          </p>
          <Link to="/reservations" className="btn-white inline-flex items-center gap-2">
            {t(language, 'hero.cta')}
            <ArrowRight size={18} className="transition-transform group-hover:rotate-[-45deg]" />
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce-gentle hidden md:flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest opacity-70">{t(language, 'hero.scroll')}</span>
          <ChevronDown size={20} className="opacity-70" />
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="bg-sand section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="story-animate overflow-hidden">
              <img src="/images/story-dining.jpg" alt="Mediterranean dining" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
            <div>
              <h2 className="story-animate font-serif italic text-4xl md:text-5xl lg:text-6xl text-brown mb-6">
                {t(language, 'story.heading')}
              </h2>
              <div className="story-animate w-24 h-px bg-brown/20 mb-6" />
              <p className="story-animate text-brown/80 leading-relaxed mb-8">
                {t(language, 'story.body')}
              </p>
              <Link to="/our-story" className="story-animate btn-terracotta inline-flex items-center gap-2 group">
                {t(language, 'story.cta')}
                <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="bg-brown text-white section-padding">
        <div className="container-custom">
          <p className="testimonial-animate text-white/60 text-sm uppercase tracking-widest mb-3">{t(language, 'testimonials.label')}</p>
          <h2 className="testimonial-animate font-serif italic text-4xl md:text-5xl lg:text-6xl mb-12">
            {t(language, 'testimonials.heading')}
          </h2>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((item) => (
                <div key={item.id} className="testimonial-animate flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0">
                  <div className="bg-white text-brown p-8 h-full">
                    <p className="font-serif italic text-lg md:text-xl leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                    <div className="w-16 h-px bg-brown/20 mb-4" />
                    <p className="text-sm font-medium uppercase tracking-wider">{item.author}</p>
                    <p className="text-xs text-brown/50 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menus Section */}
      <section ref={menusRef} className="bg-white section-padding">
        <div className="container-custom">
          <h2 className="text-center font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
            {t(language, 'menus.heading')}
          </h2>
          <div className="w-24 h-px bg-brown/20 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuCategories.map((cat) => (
              <Link to="/menu" key={cat.title} className="menu-card group block border border-brown/10 hover:border-brown/30 transition-all duration-300">
                <div className="overflow-hidden h-[280px]">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-2xl text-brown mb-2">{cat.title}</h4>
                  <p className="text-brown/60 text-sm mb-4">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 text-terracotta text-sm font-medium uppercase group-hover:gap-3 transition-all">
                    {cat.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:rotate-[-45deg]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section ref={chefRef} className="bg-sand section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="chef-animate order-2 lg:order-1">
              <p className="text-brown/50 text-sm uppercase tracking-widest mb-3">{t(language, 'chef.label')}</p>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-brown mb-6">
                {t(language, 'chef.name')}
              </h2>
              <p className="text-brown/80 leading-relaxed mb-6">
                {t(language, 'chef.bio')}
              </p>
              <blockquote className="border-l-2 border-terracotta pl-6">
                <p className="font-serif italic text-xl text-brown/70">
                  {t(language, 'chef.quote')}
                </p>
              </blockquote>
            </div>
            <div className="chef-animate order-1 lg:order-2 overflow-hidden">
              <img src="/images/chef-karim.jpg" alt="Chef Karim Benali" className="w-full h-[500px] lg:h-[600px] object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section ref={reserveRef} className="bg-brown text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reserve-animate overflow-hidden">
              <img src="/images/reservation-dining.jpg" alt="Restaurant interior" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
            <div>
              <h2 className="reserve-animate font-serif italic text-4xl md:text-5xl lg:text-6xl mb-6">
                {t(language, 'reservation.heading')}
              </h2>
              <div className="reserve-animate space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-terracotta" />
                  <a href="tel:4383306424" className="text-white/80 hover:text-terracotta transition-colors">
                    {t(language, 'reservation.phone')}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-terracotta" />
                  <a href="mailto:info@lejardinmtl.com" className="text-white/80 hover:text-terracotta transition-colors">
                    {t(language, 'reservation.email')}
                  </a>
                </div>
              </div>
              <Link to="/reservations" className="reserve-animate btn-white inline-flex items-center gap-2 group">
                {t(language, 'reservation.cta')}
                <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Teaser Section */}
      <section ref={teaserRef} className="bg-white section-padding">
        <div className="container-custom">
          <h2 className="text-center font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
            {t(language, 'menuTeaser.heading')}
          </h2>
          <div className="w-24 h-px bg-brown/20 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teaserDishes.map((dish) => (
              <Link to="/menu" key={dish.title} className="teaser-card group block border border-brown/10 hover:border-brown/30 transition-all duration-300">
                <div className="overflow-hidden h-[280px]">
                  <img src={dish.image} alt={dish.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-2xl text-brown mb-2">{dish.title}</h4>
                  <p className="text-brown/60 text-sm mb-4">{dish.desc}</p>
                  <span className="inline-flex items-center gap-2 text-terracotta text-sm font-medium uppercase group-hover:gap-3 transition-all">
                    {t(language, 'menuTeaser.cta')}
                    <ArrowRight size={14} className="transition-transform group-hover:rotate-[-45deg]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
