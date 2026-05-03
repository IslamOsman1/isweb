import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Activity, BarChart3, TrendingUp } from 'lucide-react';

function Demo() {
  return (
    <section id="demo" className="py-24 container mx-auto px-6 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-black mb-6">نبني أنظمة <span className="text-[#00b09b]">تدير أعمالك</span></h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            لا نكتفي بإنشاء مواقع العرض فقط، بل نصمم ونبرمج لوحات تحكم (Dashboards) وأنظمة داخلية (SaaS) تساعدك على مراقبة أداء شركتك واتخاذ قرارات مبنية على بيانات دقيقة.
          </p>
          <ul className="space-y-4 mb-10">
            {['إدارة المستخدمين والصلاحيات', 'إحصائيات ورسوم بيانية تفاعلية', 'تصدير التقارير بضغطة زر'].map((item, i) => (
              <li key={i} className="flex items-center text-gray-300">
                <div className="w-6 h-6 rounded-full bg-[#00b09b]/20 flex items-center justify-center ml-3">
                  <div className="w-2 h-2 rounded-full bg-[#00b09b]"></div>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-1/2 w-full bg-[#12182b] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#00b4db] to-[#00b09b]"></div>
          
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><User size={18} /></div>
              <div>
                <p className="font-bold text-sm">مرحباً، مدير النظام</p>
                <p className="text-xs text-gray-500">نظرة عامة على الأداء</p>
              </div>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg text-xs flex items-center gap-2">
              <Calendar size={14} className="text-[#00b4db]" /> هذا الشهر
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#00b4db]/20 rounded-lg text-[#00b4db]"><Activity size={20} /></div>
                <span className="text-xs text-[#00b09b] flex items-center gap-1">+14% <TrendingUp size={12}/></span>
              </div>
              <p className="text-2xl font-black mb-1">24,500</p>
              <p className="text-xs text-gray-500">الزيارات النشطة</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#00b09b]/20 rounded-lg text-[#00b09b]"><BarChart3 size={20} /></div>
                <span className="text-xs text-[#00b09b] flex items-center gap-1">+28% <TrendingUp size={12}/></span>
              </div>
              <p className="text-2xl font-black mb-1">$12,450</p>
              <p className="text-xs text-gray-500">إجمالي المبيعات</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 h-40 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-full bg-white/10 rounded-t-sm relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="absolute bottom-0 w-full bg-gradient-to-t from-[#00b4db] to-[#00b09b] rounded-t-sm opacity-80 group-hover:opacity-100 transition"
                ></motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;