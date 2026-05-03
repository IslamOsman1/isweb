# IsWeb Studio

واجهة `React + Vite` مع لوحة تحكم `/admin` وواجهة API مبنية بـ `Express` وتخزين محتوى عبر `MongoDB`.

## هيكل المشروع

- `client/`: واجهة `React + Vite`
- `server/`: API وملفات `Express` و`MongoDB`

## التشغيل المحلي

```bash
npm install
cp .env.example .env
npm run dev:full
```

- الموقع: `http://localhost:5173`
- لوحة التحكم: `http://localhost:5173/admin`
- الـ API: `http://localhost:5050/api`

## إعداد ملف البيئة

عدّل القيم داخل `.env` بعد نسخه من `.env.example`:

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=5050
CLIENT_ORIGIN=http://localhost:5173,http://localhost:*,http://127.0.0.1:*,http://*:5173
VITE_API_URL=/api
ADMIN_PASSWORD=change_this_admin_password
VITE_ADMIN_PASSWORD=change_this_admin_password
```

مهم:

- اجعل `ADMIN_PASSWORD` و `VITE_ADMIN_PASSWORD` نفس القيمة.
- `CLIENT_ORIGIN` يسمح بالوصول من `localhost` و من أي جهاز آخر في نفس الشبكة
- لا ترفع ملف `.env` إلى GitHub.
- على Vercel أضف نفس المتغيرات من إعدادات المشروع.

**اقرأ [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) لتفاصيل نشر على Vercel مع MongoDB Atlas**

## Cloudinary (رفع الصور للسحابة)

لرفع الصور من لوحة التحكم أضف بيانات كلودينيري في `.env`:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**اقرأ [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) للتعليمات الكاملة** | **Read [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) for full instructions**

### الخطوات السريعة:
1. أنشئ حساب مجاني على [Cloudinary.com](https://cloudinary.com)
2. انسخ بيانات اعتمادك من [API Keys](https://cloudinary.com/console/settings/api-keys)
3. أضفها إلى `.env`
4. أعد تشغيل الخادم: `npm run dev:full`

---

## مشكلة: التعديلات لا تظهر على أجهزة أخرى?

**اقرأ [SYNC_GUIDE.md](./SYNC_GUIDE.md)** لحل مشكلة التعديلات المحلية والتزامن بين الأجهزة المختلفة.

الحل الأساسي: تأكد من تشغيل الخادم الكامل:
```bash
npm run dev:full
```

إذا لم تضف مفاتيح Cloudinary سيستخدم المشروع صورة `base64` محليًا كحل بديل.

## النشر على Vercel

المشروع مجهز الآن لـ:

- بناء الواجهة عبر `Vite`
- تشغيل الـ API من خلال `Vercel Functions`
- إعادة توجيه SPA بشكل صحيح عبر `vercel.json`

بعد ربط المستودع في Vercel أضف متغيرات البيئة التالية:

- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `VITE_ADMIN_PASSWORD`
- `VITE_API_URL` وقيمتها `/api`
- `CLIENT_ORIGIN` وضع رابط موقعك بعد النشر
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## ملاحظات

- نقطة الصحة: `/api/health`
- المحتوى العام: `/api/content`
- رفع الصور: `/api/upload`
