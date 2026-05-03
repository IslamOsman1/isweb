import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, CheckCircle, Database, Edit3, Eye, EyeOff, FileText, FolderKanban, ImagePlus, LayoutDashboard, Lock, LogOut, MessageSquare, PlusCircle, Save, Settings, Trash2, Users, WifiOff } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getAdminPassword, useSiteData } from '../data/DataContext';

const sections = {
  requests: ['name', 'email', 'service', 'message', 'budget', 'status'],
  services: ['titleAr', 'titleEn', 'descAr', 'descEn', 'icon', 'img'],
  projects: ['titleAr', 'titleEn', 'descAr', 'descEn', 'img', 'projectUrl', 'tags', 'progress', 'statusAr', 'statusEn'],
  jobs: ['titleAr', 'titleEn', 'descAr', 'descEn', 'locationAr', 'locationEn', 'typeAr', 'typeEn', 'img'],
  testimonials: ['nameAr', 'nameEn', 'roleAr', 'roleEn', 'quoteAr', 'quoteEn', 'img'],
  team: ['name', 'roleAr', 'roleEn', 'img'],
  posts: ['titleAr', 'titleEn', 'descAr', 'descEn', 'img', 'date'],
  faqs: ['qAr', 'qEn', 'aAr', 'aEn'],
};

const emptyBySection = {
  requests: { name: '', email: '', service: '', message: '', budget: '', status: 'new' },
  services: { titleAr: '', titleEn: '', descAr: '', descEn: '', icon: 'layout', img: '' },
  projects: { titleAr: '', titleEn: '', descAr: '', descEn: '', img: '', projectUrl: '', tags: '', progress: 0, statusAr: 'جديد', statusEn: 'New' },
  jobs: { titleAr: '', titleEn: '', descAr: '', descEn: '', locationAr: 'عن بُعد', locationEn: 'Remote', typeAr: 'دوام كامل', typeEn: 'Full-time', img: '' },
  testimonials: { nameAr: '', nameEn: '', roleAr: '', roleEn: '', quoteAr: '', quoteEn: '', img: '' },
  team: { name: '', roleAr: '', roleEn: '', img: '' },
  posts: { titleAr: '', titleEn: '', descAr: '', descEn: '', img: '', date: new Date().toISOString().slice(0, 10) },
  faqs: { qAr: '', qEn: '', aAr: '', aEn: '' },
};

const imageFields = new Set(['img', 'heroImage']);

function LoginScreen({ onLogin }) {
  const { lang, toggleLanguage } = useLanguage();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (password === getAdminPassword()) {
      sessionStorage.setItem('isweb_admin_auth', 'true');
      onLogin();
    } else {
      setError(lang === 'ar' ? 'كلمة المرور غير صحيحة' : 'Wrong password');
    }
  };

  return <div className="min-h-screen flex items-center justify-center px-6 relative z-10"><form onSubmit={submit} className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"><div className="w-16 h-16 rounded-2xl bg-[#00b4db]/10 border border-[#00b4db]/20 flex items-center justify-center mb-6"><Lock className="text-[#00b4db]" /></div><h1 className="text-3xl font-black mb-2">{lang === 'ar' ? 'دخول لوحة التحكم' : 'Admin Login'}</h1><p className="text-gray-400 mb-6">{lang === 'ar' ? 'أدخل كلمة المرور لإدارة محتوى الموقع.' : 'Enter the password to manage website content.'}</p><label className="block text-sm text-gray-400 mb-2">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label><div className="relative"><input value={password} onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pe-12 text-white focus:outline-none focus:border-[#00b4db]" autoFocus /><button type="button" onClick={() => setShow(!show)} className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{error && <p className="text-red-300 text-sm mt-3">{error}</p>}<button className="w-full mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b09b] to-[#00b4db] font-bold">{lang === 'ar' ? 'دخول' : 'Login'}</button><button type="button" onClick={toggleLanguage} className="w-full mt-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm">{lang === 'ar' ? 'English' : 'العربية'}</button><a href="/" className="block text-center mt-5 text-sm text-[#00b4db]">{lang === 'ar' ? 'العودة للموقع' : 'Back to website'}</a></form></div>;
}

function Field({ name, value, onChange, uploadImage }) {
  const [uploading, setUploading] = useState(false);
  const isLong = /desc|quote|message|aAr|aEn/.test(name);
  const label = name.replace(/([A-Z])/g, ' $1');
  const cls = 'w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00b4db]';

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    onChange(name, url);
    setUploading(false);
  };

  return <label className="block"><span className="block text-xs text-gray-400 mb-1">{label}</span>{imageFields.has(name) ? <div className="space-y-2"><input value={value || ''} onChange={(e) => onChange(name, e.target.value)} placeholder="Image URL or upload" className={cls} dir="ltr" /><div className="flex items-center gap-2"><input type="file" accept="image/*" onChange={handleFile} className="hidden" id={`upload-${name}-${Math.random()}`} /><button type="button" onClick={(e) => e.currentTarget.previousSibling.click()} className="px-3 py-2 rounded-lg bg-white/10 text-xs flex items-center gap-2"><ImagePlus size={14} />{uploading ? 'Uploading...' : 'Upload image'}</button>{value && <img src={value} alt="preview" className="w-12 h-12 rounded-lg object-cover border border-white/10" />}</div></div> : isLong ? <textarea rows="3" value={value || ''} onChange={(e) => onChange(name, e.target.value)} className={cls} /> : <input value={value || ''} onChange={(e) => onChange(name, name === 'progress' ? Number(e.target.value) : e.target.value)} className={cls} />}</label>;
}

function DashboardInner() {
  const { lang, toggleLanguage } = useLanguage();
  const { content, isOnlineDb, addItem, updateItem, deleteItem, updateSettings, uploadImage } = useSiteData();
  const [activeTab, setActiveTab] = useState('requests');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(emptyBySection.requests);
  const [settingsDraft, setSettingsDraft] = useState(content.settings);

  useEffect(() => setSettingsDraft(content.settings), [content.settings]);

  const tabs = [
    { id: 'requests', label: lang === 'ar' ? 'الطلبات' : 'Requests', icon: <MessageSquare size={18} /> },
    { id: 'services', label: lang === 'ar' ? 'الخدمات' : 'Services', icon: <LayoutDashboard size={18} /> },
    { id: 'projects', label: lang === 'ar' ? 'المشاريع' : 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'jobs', label: lang === 'ar' ? 'الوظائف' : 'Jobs', icon: <BriefcaseBusiness size={18} /> },
    { id: 'testimonials', label: lang === 'ar' ? 'آراء العملاء' : 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'team', label: lang === 'ar' ? 'الفريق' : 'Team', icon: <Users size={18} /> },
    { id: 'posts', label: lang === 'ar' ? 'المدونة' : 'Blog', icon: <FileText size={18} /> },
    { id: 'faqs', label: lang === 'ar' ? 'الأسئلة' : 'FAQ', icon: <CheckCircle size={18} /> },
    { id: 'settings', label: lang === 'ar' ? 'الإعدادات' : 'Settings', icon: <Settings size={18} /> },
  ];

  const stats = useMemo(() => [
    { label: lang === 'ar' ? 'طلبات العملاء' : 'Requests', value: content.requests?.length || 0, icon: <MessageSquare className="text-[#00b4db]" /> },
    { label: lang === 'ar' ? 'المشاريع' : 'Projects', value: content.projects?.length || 0, icon: <FolderKanban className="text-[#00b09b]" /> },
    { label: lang === 'ar' ? 'الوظائف' : 'Jobs', value: content.jobs?.length || 0, icon: <BriefcaseBusiness className="text-purple-300" /> },
    { label: lang === 'ar' ? 'حالة مونجو' : 'Mongo status', value: isOnlineDb ? (lang === 'ar' ? 'متصل' : 'Online') : (lang === 'ar' ? 'محلي' : 'Local'), icon: isOnlineDb ? <Database className="text-green-400" /> : <WifiOff className="text-yellow-400" /> },
  ], [content, isOnlineDb, lang]);

  const startAdd = (section = activeTab) => { setActiveTab(section); setEditing(null); setDraft(emptyBySection[section]); };
  const startEdit = (item) => { setEditing(item.id); setDraft(item); };
  const changeDraft = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const saveDraft = async () => {
    if (editing) await updateItem(activeTab, editing, draft); else await addItem(activeTab, draft);
    setEditing(null); setDraft(emptyBySection[activeTab]);
  };
  const logout = () => { sessionStorage.removeItem('isweb_admin_auth'); window.location.href = '/admin'; };

  const mainTitle = activeTab === 'settings' ? (lang === 'ar' ? 'إعدادات الموقع والروابط' : 'Website settings and links') : tabs.find((tab) => tab.id === activeTab)?.label;
  const settingFields = ['brandName', 'email', 'phone', 'addressAr', 'addressEn', 'heroImage', 'facebookUrl', 'instagramUrl', 'githubUrl'];

  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen relative z-10 pt-8 pb-16"><div className="container mx-auto px-6"><header className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center mb-8"><div><p className="text-[#00b4db] font-black text-sm mb-2">/admin</p><h1 className="text-4xl md:text-5xl font-black">{lang === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Dashboard'}</h1><p className="text-gray-400 mt-3">{lang === 'ar' ? 'تحكم كامل في الموقع: المحتوى، الصور، الوظائف، وروابط التواصل.' : 'Full control over content, images, jobs, and social links.'}</p></div><div className="flex flex-wrap gap-3"><a href="/" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">{lang === 'ar' ? 'عرض الموقع' : 'View site'}</a><button onClick={toggleLanguage} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">{lang === 'ar' ? 'English' : 'العربية'}</button><button onClick={logout} className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 flex items-center gap-2"><LogOut size={18} />{lang === 'ar' ? 'خروج' : 'Logout'}</button></div></header>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">{stats.map((stat) => <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5"><div className="flex justify-between items-center mb-4">{stat.icon}<span className="text-2xl font-black">{stat.value}</span></div><p className="text-gray-400 text-sm">{stat.label}</p></div>)}</div>

  <div className="grid lg:grid-cols-[280px_1fr] gap-6"><aside className="bg-white/5 border border-white/10 rounded-3xl p-4 h-fit sticky top-24"><div className="grid gap-2">{tabs.map((tab) => <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(null); setDraft(emptyBySection[tab.id] || {}); }} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition text-start ${activeTab === tab.id ? 'bg-[#00b4db] text-white' : 'hover:bg-white/10 text-gray-300'}`}>{tab.icon}<span className="font-bold text-sm">{tab.label}</span></button>)}</div><div className="mt-5 border-t border-white/10 pt-5"><p className="text-xs text-gray-500 mb-3">{lang === 'ar' ? 'روابط التواصل' : 'Social links'}</p><div className="flex gap-2"><a href={content.settings.facebookUrl} target="_blank" className="p-2 rounded-lg bg-white/10"><span className="font-black text-sm">f</span></a><a href={content.settings.instagramUrl} target="_blank" className="p-2 rounded-lg bg-white/10"><span className="font-black text-sm">◎</span></a><a href={content.settings.githubUrl} target="_blank" className="p-2 rounded-lg bg-white/10"><span className="font-black text-sm">⌘</span></a></div></div></aside>

  <main className="space-y-6"><section className="bg-white/5 border border-white/10 rounded-3xl p-6"><div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-5"><div><h2 className="text-2xl font-black">{mainTitle}</h2><p className="text-sm text-gray-400 mt-1">{lang === 'ar' ? 'كل إضافة أو تعديل يظهر في الموقع مباشرة، ومع تشغيل السيرفر يتم الحفظ في MongoDB.' : 'Every change appears on the site immediately, and saves to MongoDB when the server is running.'}</p></div>{activeTab !== 'settings' && <button onClick={() => startAdd()} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b09b] to-[#00b4db] font-bold flex items-center gap-2"><PlusCircle size={18} />{lang === 'ar' ? 'إضافة جديد' : 'Add new'}</button>}</div>

  {activeTab === 'settings' ? <div className="grid md:grid-cols-2 gap-4">{settingFields.map((key) => <Field key={key} name={key} value={settingsDraft[key]} uploadImage={uploadImage} onChange={(k, v) => setSettingsDraft((s) => ({ ...s, [k]: v }))} />)}<button onClick={() => updateSettings(settingsDraft)} className="md:col-span-2 px-5 py-3 rounded-xl bg-[#00b4db] font-bold flex items-center justify-center gap-2"><Save size={18} />{lang === 'ar' ? 'حفظ الإعدادات' : 'Save settings'}</button></div> : <><div className="bg-black/20 border border-white/10 rounded-2xl p-4 mb-6"><h3 className="font-black mb-4 flex items-center gap-2">{editing ? <Edit3 size={18} /> : <PlusCircle size={18} />} {editing ? (lang === 'ar' ? 'تعديل عنصر' : 'Edit item') : (lang === 'ar' ? 'إضافة عنصر' : 'Add item')}</h3><div className="grid md:grid-cols-2 gap-4">{(sections[activeTab] || []).map((field) => <Field key={field} name={field} value={draft[field]} uploadImage={uploadImage} onChange={changeDraft} />)}<button onClick={saveDraft} className="md:col-span-2 px-5 py-3 rounded-xl bg-[#00b4db] font-bold flex items-center justify-center gap-2"><Save size={18} />{editing ? (lang === 'ar' ? 'حفظ التعديل' : 'Save changes') : (lang === 'ar' ? 'إضافة' : 'Add')}</button></div></div>

  <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="text-gray-400 border-b border-white/10"><tr><th className="text-start py-3">#</th><th className="text-start py-3">{lang === 'ar' ? 'صورة' : 'Image'}</th><th className="text-start py-3">{lang === 'ar' ? 'العنوان / الاسم' : 'Title / Name'}</th><th className="text-start py-3">{lang === 'ar' ? 'التفاصيل' : 'Details'}</th><th className="text-start py-3">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th></tr></thead><tbody>{(content[activeTab] || []).map((item, idx) => <tr key={item.id} className="border-b border-white/5 last:border-0"><td className="py-4 text-gray-500">{idx + 1}</td><td className="py-4">{item.img ? <img src={item.img} className="w-12 h-12 rounded-xl object-cover" /> : <span className="text-gray-600">—</span>}</td><td className="py-4 font-bold">{item.titleAr || item.nameAr || item.name || item.qAr || item.email}</td><td className="py-4 text-gray-400 max-w-xl truncate">{item.descAr || item.quoteAr || item.roleAr || item.aAr || item.message || item.status}</td><td className="py-4"><div className="flex gap-2"><button onClick={() => startEdit(item)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 flex items-center gap-1"><Edit3 size={14} />{lang === 'ar' ? 'تعديل' : 'Edit'}</button><button onClick={() => deleteItem(activeTab, item.id)} className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 flex items-center gap-1"><Trash2 size={14} />{lang === 'ar' ? 'حذف' : 'Delete'}</button></div></td></tr>)}</tbody></table></div></>}
  </section></main></div></div></motion.div>;
}

function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('isweb_admin_auth') === 'true');
  return authed ? <DashboardInner /> : <LoginScreen onLogin={() => setAuthed(true)} />;
}

export default Dashboard;
