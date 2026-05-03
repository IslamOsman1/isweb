import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

function Portfolio() {
  const { t, lang } = useLanguage();
  const { content } = useSiteData();
  const [selected, setSelected] = useState(null);
  const projectTitle = (project) => (lang === 'ar' ? project.titleAr : project.titleEn);
  const projectDesc = (project) => (lang === 'ar' ? project.descAr : project.descEn);
  const projectUrl = (selected?.projectUrl || selected?.url || selected?.websiteUrl || '').trim();

  return (
    <section id="portfolio" className="container mx-auto px-6 py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">{t('portfolio.title')}</h2>
        <p className="text-gray-400">{t('portfolio.desc')}</p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#00b4db] to-[#00b09b] mx-auto rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.projects.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-video border border-white/10 bg-white/5 cursor-pointer"
            onClick={() => setSelected(project)}
          >
            <img src={project.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-75" alt={projectTitle(project)} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-[#0b101e]/40 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-black mb-2">{projectTitle(project)}</h3>
              <p className="text-gray-300 text-sm mb-4 max-w-lg">{projectDesc(project)}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {String(project.tags || '').split(',').filter(Boolean).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs">{tag.trim()}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                className="inline-flex items-center gap-2 text-[#00b4db] font-bold text-sm hover:gap-3 transition-all w-fit"
              >
                {t('portfolio.view')} <ExternalLink size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onClick={() => setSelected(null)}>
          <div className="bg-[#0b101e] border border-white/10 rounded-3xl max-w-2xl w-full p-6 relative max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 end-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Close">
              <X />
            </button>
            <img src={selected.img} className="w-full h-64 object-cover rounded-2xl mb-5" alt={projectTitle(selected)} />
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-3xl font-black flex-1">{projectTitle(selected)}</h3>
              {(selected.statusAr || selected.statusEn) && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-200">
                  {lang === 'ar' ? selected.statusAr : selected.statusEn}
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-5 leading-7">{projectDesc(selected)}</p>
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{lang === 'ar' ? 'نسبة الإنجاز' : 'Progress'}</span>
                <span>{selected.progress || 0}%</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00b09b] to-[#00b4db]" style={{ width: `${selected.progress || 0}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b09b] to-[#00b4db] font-bold"
                >
                  {t('portfolio.visit')} <ExternalLink size={18} />
                </a>
              )}
              <a href="#contact" onClick={() => setSelected(null)} className="inline-block px-6 py-3 rounded-xl bg-white/10 border border-white/10 font-bold hover:bg-white/15 transition">
                {t('hero.cta')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
