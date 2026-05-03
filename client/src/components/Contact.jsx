import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contact() {
  const { t, lang } = useLanguage();
  const { content, addRequest } = useSiteData();
  const form = useRef(null);
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    const formElement = form.current;
    const data = new FormData(formElement);
    const requestPayload = {
      name: data.get('user_name'),
      email: data.get('user_email'),
      service: data.get('service_type'),
      message: data.get('message'),
    };

    try {
      await addRequest(requestPayload);

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            user_name: requestPayload.name,
            user_email: requestPayload.email,
            service_type: requestPayload.service,
            message: requestPayload.message,
            to_email: content.settings.email,
          },
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          },
        );
      }

      formElement.reset();
      setIsSent(true);
      setTimeout(() => setIsSent(false), 4500);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setErrorMessage(t('contact.error'));
      setTimeout(() => setErrorMessage(''), 4500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 bg-[#0b101e] py-24">
      <div className="container relative mx-auto px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-md md:p-14">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-black md:text-5xl">
                {t('contact.title1')} <span className="text-[#00b4db]">{t('contact.title2')}</span>
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-gray-400">{t('contact.desc')}</p>

              <div className="space-y-6">
                <div className="group flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-[#00b4db]/20">
                    <Mail className="text-[#00b4db]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">{t('contact.email')}</p>
                    <p className="text-lg font-bold" dir="ltr">
                      {content.settings.email}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-[#00b09b]/20">
                    <Phone className="text-[#00b09b]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">{t('contact.phone')}</p>
                    <p className="text-lg font-bold" dir="ltr">
                      {content.settings.phone}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-[#00b4db]/20">
                    <MapPin className="text-[#00b4db]" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">{t('contact.address')}</p>
                    <p className="text-lg font-bold">
                      {lang === 'ar' ? content.settings.addressAr : content.settings.addressEn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={content.settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:text-[#00b4db]"
                >
                  <span className="font-black">f</span> Facebook
                </a>
                <a
                  href={content.settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:text-[#00b4db]"
                >
                  <span className="font-black">IG</span> Instagram
                </a>
                <a
                  href={content.settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:text-[#00b4db]"
                >
                  <span className="font-black">GH</span> GitHub
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/5 bg-[#0b101e] p-8 shadow-inner">
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -top-12 w-full rounded-xl border border-green-500/50 bg-green-500/20 p-3 text-center text-sm font-bold text-green-400"
                >
                  {t('contact.success')}
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -top-12 w-full rounded-xl border border-red-500/50 bg-red-500/20 p-3 text-center text-sm font-bold text-red-300"
                >
                  {errorMessage}
                </motion.div>
              )}

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder={t('contact.namePlace')}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00b4db] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder={t('contact.emailPlace')}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00b4db] focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    {t('contact.serviceLabel')}
                  </label>
                  <select
                    name="service_type"
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00b4db] focus:outline-none"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <option className="bg-[#0b101e]">{t('contact.opt1')}</option>
                    <option className="bg-[#0b101e]">{t('contact.opt2')}</option>
                    <option className="bg-[#0b101e]">{t('contact.opt3')}</option>
                    <option className="bg-[#0b101e]">{t('contact.opt4')}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    {t('contact.msgLabel')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder={t('contact.msgPlace')}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00b4db] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition ${
                    isSending
                      ? 'cursor-not-allowed bg-gray-600'
                      : 'bg-gradient-to-r from-[#00b4db] to-[#00b09b] hover:opacity-90'
                  }`}
                >
                  {isSending ? t('contact.sending') : t('contact.send')}
                  {!isSending && <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
