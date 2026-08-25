import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { positions } from '@/data/positions';
import { ArrowRight, Mail } from 'lucide-react';

export default function CareersPage() {
  const { language } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/chef-karim.jpg" alt="Careers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'careersPage.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'careersPage.subtitle')}</p>
        </div>
      </section>

      {/* Openings */}
      <section className="bg-white section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif italic text-4xl md:text-5xl text-brown mb-4 text-center">
            {t(language, 'careersPage.openingsHeading')}
          </h2>
          <p className="text-brown/70 text-center max-w-2xl mx-auto mb-12">{t(language, 'careersPage.description')}</p>

          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.id} className="border border-brown/10 hover:border-brown/30 transition-all p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium uppercase tracking-wider text-brown">{pos.title}</h3>
                      <span className="text-xs bg-terracotta/10 text-terracotta px-2 py-0.5">{pos.type}</span>
                    </div>
                    <p className="text-brown/60 text-sm">{pos.description}</p>
                  </div>
                  <a
                    href={`mailto:careers@lejardinmtl.com?subject=Application: ${pos.title}`}
                    className="btn-terracotta text-xs py-2 px-4 flex-shrink-0 inline-flex items-center gap-2"
                  >
                    {t(language, 'careersPage.apply')}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-sand p-8">
            <p className="text-brown/70 mb-4">{t(language, 'careersPage.noFit')}</p>
            <a
              href="mailto:careers@lejardinmtl.com"
              className="btn-terracotta inline-flex items-center gap-2"
            >
              <Mail size={16} />
              {t(language, 'careersPage.sendResume')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
