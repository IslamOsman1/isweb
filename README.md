# IsWeb Studio

مشروع IsWeb Studio يعمل على Vercel مع واجهة React + Vite + Tailwind، ومع API Serverless يحافظ على MongoDB و Cloudinary.

## المهم

لم يتم حذف MongoDB أو السيرفر. الملفات التالية ما زالت موجودة وتعمل:

- `server/app.js`
- `server/server.js`
- `server/models/Content.js`
- `api/index.js` لاستخدام Express API على Vercel

## التشغيل المحلي

```bash
npm install
cp .env.example .env
npm run dev:full
```

- الموقع: `http://localhost:5173`
- لوحة التحكم: `http://localhost:5173/admin`
- API: `http://localhost:5050/api`

## متغيرات البيئة المطلوبة على Vercel

أضف من Settings > Environment Variables:

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
VITE_ADMIN_PASSWORD=your_admin_password
VITE_API_URL=/api
CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

اجعل `ADMIN_PASSWORD` و `VITE_ADMIN_PASSWORD` نفس القيمة.

## إعدادات Vercel

```txt
Framework: Vite
Build Command: npm run build
Output Directory: client/dist
Install Command: npm install
```

## الاختبار

```bash
npm run build
```

بعد النشر جرّب:

- `/api/health`
- `/api/content`
