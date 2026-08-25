import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { galleryImages } from '@/data/gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Filter = 'all' | 'food' | 'drinks' | 'ambiance';

export default function GalleryPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<{ index: number; open: boolean }>({ index: 0, open: false });

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter);
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t(language, 'galleryPage.all') },
    { key: 'food', label: t(language, 'galleryPage.food') },
    { key: 'drinks', label: t(language, 'galleryPage.drinks') },
    { key: 'ambiance', label: t(language, 'galleryPage.ambiance') },
  ];

  const openLightbox = (index: number) => setLightbox({ index, open: true });
  const closeLightbox = () => setLightbox({ index: 0, open: false });
  const prevImage = () => setLightbox((p) => ({ ...p, index: (p.index - 1 + filtered.length) % filtered.length }));
  const nextImage = () => setLightbox((p) => ({ ...p, index: (p.index + 1) % filtered.length }));

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/gallery-1.jpg" alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sand/60" />
        <div className="relative z-10 text-center px-5">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown mb-4">{t(language, 'galleryPage.heading')}</h1>
          <p className="font-serif italic text-xl text-brown/70">{t(language, 'galleryPage.subtitle')}</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-sm font-medium uppercase tracking-wider py-2 transition-all ${
                  filter === f.key ? 'text-terracotta border-b-2 border-terracotta' : 'text-brown/50 hover:text-brown'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="break-inside-avoid cursor-pointer group overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-[998] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={closeLightbox}>
            <X size={32} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft size={40} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight size={40} />
          </button>
          <img
            src={filtered[lightbox.index]?.src}
            alt={filtered[lightbox.index]?.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
