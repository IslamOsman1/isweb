import React from 'react';
import { BriefcaseBusiness, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

function Jobs() {
  const { lang, t } = useLanguage();
  const { content } = useSiteData();
  const jobs = content.jobs || [];
  if (!jobs.length) return null;

  return <section id="jobs" className="py-24 relative z-10 bg-white/[0.02]"><div className="container mx-auto px-6"><div className="text-center max-w-3xl mx-auto mb-16"><span className="text-[#00b4db] text-sm font-black tracking-wide">{lang === 'ar' ? 'انضم إلينا' : 'Join us'}</span><h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-white">{lang === 'ar' ? 'الوظائف المتاحة' : 'Open Positions'}</h2><p className="text-gray-400 leading-relaxed">{lang === 'ar' ? 'تحكم في هذا القسم بالكامل من لوحة الأدمن مع إمكانية إضافة صور لكل وظيفة.' : 'Manage this section fully from the admin dashboard, including job images.'}</p><div className="w-16 h-1 bg-gradient-to-r from-[#00b4db] to-[#00b09b] mx-auto rounded-full mt-6" /></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{jobs.map((job, i) => <motion.article key={job.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.08 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#00b4db]/40 transition group"><div className="h-48 bg-black/20 overflow-hidden">{job.img ? <img src={job.img} alt={lang === 'ar' ? job.titleAr : job.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /> : <div className="w-full h-full flex items-center justify-center"><BriefcaseBusiness className="text-[#00b4db]" size={48} /></div>}</div><div className="p-6"><div className="flex flex-wrap gap-2 mb-4"><span className="px-3 py-1 rounded-full bg-[#00b4db]/10 text-[#00b4db] text-xs font-bold flex items-center gap-1"><BriefcaseBusiness size={13} />{lang === 'ar' ? job.typeAr : job.typeEn}</span><span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-bold flex items-center gap-1"><MapPin size={13} />{lang === 'ar' ? job.locationAr : job.locationEn}</span></div><h3 className="text-xl font-black mb-3">{lang === 'ar' ? job.titleAr : job.titleEn}</h3><p className="text-gray-400 text-sm leading-relaxed mb-6">{lang === 'ar' ? job.descAr : job.descEn}</p><a href={`#contact`} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b09b] to-[#00b4db] font-bold text-sm">{lang === 'ar' ? 'تقديم الآن' : 'Apply now'}<Send size={15} className={lang === 'ar' ? 'rotate-180' : ''} /></a></div></motion.article>)}</div></div></section>;
}
export default Jobs;
