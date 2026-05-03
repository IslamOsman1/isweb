# Cloudinary Integration Guide

## دليل تكامل كلودينيري

---

## English

### What is Cloudinary?
Cloudinary is a cloud-based image and video management platform that allows you to store, transform, and deliver images and videos efficiently. It's perfect for web applications that need to handle media uploads.

### Setup Steps

#### 1. Create a Cloudinary Account
- Go to [Cloudinary.com](https://cloudinary.com/)
- Sign up for a free account
- Verify your email

#### 2. Get Your Credentials
- Log in to your Cloudinary dashboard
- Go to [Settings → API Keys](https://cloudinary.com/console/settings/api-keys)
- Copy the following credentials:
  - **Cloud Name**: The unique identifier for your account
  - **API Key**: For accessing the API
  - **API Secret**: For signing requests (keep this private!)

#### 3. Update Environment Variables
Edit the `.env` file in the project root:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the values with your actual credentials from Cloudinary.

#### 4. Restart Your Server
```bash
npm run dev:full
```

#### 5. Test the Upload
- Go to the admin dashboard (Dashboard tab)
- Try uploading an image to any section
- The image should be uploaded to Cloudinary and appear in your content

### How It Works

1. **Admin uploads an image** → Image is sent to your backend server
2. **Backend authenticates** → Verifies admin password
3. **Backend signs the request** → Uses Cloudinary API Secret to create a secure signature
4. **Backend uploads to Cloudinary** → Sends file and signature to Cloudinary
5. **Cloudinary returns URL** → Image URL is returned and stored in your database
6. **Image displays on website** → The URL is used to display the image

### Image Organization
Images are organized in Cloudinary folders named `isweb-studio`. You can view them in your Cloudinary dashboard under **Media Library**.

### Security Notes
- ✅ The API Secret is only used on the server side (never exposed to the client)
- ✅ Admin password protection ensures only authorized users can upload
- ✅ Cloudinary URLs use HTTPS for secure delivery
- ⚠️ Never commit your `.env` file to version control
- ⚠️ Never share your `API_SECRET` with anyone

---

## العربية

### ما هي كلودينيري؟
كلودينيري هي منصة سحابية لإدارة الصور والفيديوهات تسمح لك بتخزين وتحويل وتوزيع الصور والفيديوهات بكفاءة. وهي مثالية لتطبيقات الويب التي تحتاج إلى التعامل مع رفع الملفات.

### خطوات الإعداد

#### 1. إنشاء حساب كلودينيري
- انتقل إلى [Cloudinary.com](https://cloudinary.com/)
- أنشئ حساب مجاني
- تحقق من بريدك الإلكتروني

#### 2. الحصول على بيانات المصادقة
- سجل الدخول إلى لوحة تحكم كلودينيري
- انتقل إلى [Settings → API Keys](https://cloudinary.com/console/settings/api-keys)
- انسخ بيانات الاعتماد التالية:
  - **Cloud Name**: معرف الحساب الفريد الخاص بك
  - **API Key**: للوصول إلى الواجهة البرمجية
  - **API Secret**: لتوقيع الطلبات (احتفظ بها سرية!)

#### 3. تحديث متغيرات البيئة
عدّل ملف `.env` في جذر المشروع:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

استبدل القيم ببيانات اعتمادك الفعلية من كلودينيري.

#### 4. إعادة تشغيل الخادم
```bash
npm run dev:full
```

#### 5. اختبار الرفع
- انتقل إلى لوحة التحكم (Dashboard)
- حاول رفع صورة إلى أي قسم
- يجب أن تُرفع الصورة إلى كلودينيري وتظهر في محتواك

### كيفية عمله

1. **المسؤول يرفع صورة** → يتم إرسال الصورة إلى خادمك الخلفي
2. **المصادقة الخلفية** → التحقق من كلمة مرور المسؤول
3. **التوقيع الخلفي للطلب** → استخدام سر API من كلودينيري لإنشاء توقيع آمن
4. **الرفع إلى كلودينيري** → إرسال الملف والتوقيع إلى كلودينيري
5. **كلودينيري ترجع عنوان URL** → يتم إرجاع عنوان URL الخاص بالصورة وتخزينه في قاعدة البيانات
6. **الصورة تظهر على الموقع** → يتم استخدام عنوان URL لعرض الصورة

### تنظيم الصور
يتم تنظيم الصور في مجلدات كلودينيري باسم `isweb-studio`. يمكنك عرضها في لوحة تحكم كلودينيري تحت **Media Library**.

### ملاحظات الأمان
- ✅ يتم استخدام سر API فقط على جانب الخادم (لا يتم الكشف عنه للعميل)
- ✅ حماية كلمة مرور المسؤول تضمن أن يتمكن المستخدمون المصرحون فقط من الرفع
- ✅ تستخدم عناوين URL من كلودينيري HTTPS لتوصيل آمن
- ⚠️ لا تلتزم ملف `.env` بمراقبة الإصدار
- ⚠️ لا تشارك `API_SECRET` مع أي شخص

---

## Architecture / المعمارية

```
Client Browser / متصفح العميل
        ↓
   React Dashboard / لوحة تحكم React
        ↓ (admin password)
  Node.js Server / خادم Node.js
        ↓ (create signature / إنشاء توقيع)
  Cloudinary API / واجهة برمجية كلودينيري
        ↓ (return URL / إرجاع عنوان URL)
  MongoDB Database / قاعدة بيانات MongoDB
```

## Testing / الاختبار

```bash
# Check if everything is connected / تحقق من الاتصال
curl http://localhost:5050/api/health

# Expected response / الرد المتوقع:
# {"ok": true, "mongoReady": true, "cloudinaryReady": true}
```

## Troubleshooting / استكشاف الأخطاء

### Upload fails with "Cloudinary credentials are missing"
- Check that `.env` file exists in the project root
- Verify all three variables are set: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Restart your server after updating `.env`

### Upload says "Invalid admin password"
- Make sure both `ADMIN_PASSWORD` and `VITE_ADMIN_PASSWORD` are set to the same value in `.env`
- Restart your server

### Check server health / تحقق من صحة الخادم
```bash
npm run dev:api  # in one terminal
```

Then in another terminal:
```bash
curl http://localhost:5050/api/health
```

This will show you which services are ready.
