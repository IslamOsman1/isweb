# Vercel Deployment Guide 🚀

## المشكلة الشائعة: MongoDB غير متصل على Vercel

عندما تستخدم MongoDB محلي (`127.0.0.1`)، لن يعمل على Vercel لأن Vercel لا يمكنها الوصول لقاعدة البيانات المحلية.

---

## الحل: استخدام MongoDB Atlas (السحابة)

### الخطوة 1: إنشاء حساب MongoDB Atlas

1. اذهب إلى [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. سجل مستخدم جديد (حساب مجاني متوفر)
3. تحقق من بريدك الإلكتروني

### الخطوة 2: إنشاء Cluster

1. في Dashboard، اضغط **Create Deployment**
2. اختر **Free Tier**
3. اختر configuration:
   - **Provider**: AWS
   - **Region**: اختر الأقرب لموقعك
4. أكمل الخطوات

### الخطوة 3: الحصول على Connection String

1. بعد إنشاء Cluster، اضغط **Connect**
2. اختر **Drivers**
3. انسخ Connection String (يبدو هكذا):

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**استبدل:**
- `username`: اسم المستخدم
- `password`: كلمة المرور
- `cluster0.xxxxx`: قيمة cluster الخاصة بك

### الخطوة 4: تحديث Vercel Environment Variables

1. اذهب إلى [vercel.com/dashboard](https://vercel.com/dashboard)
2. افتح project `isweb-studio`
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف المتغيرات:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/isweb_studio?retryWrites=true&w=majority
```

**أضف أيضًا:**

```
ADMIN_PASSWORD=your_strong_password
VITE_ADMIN_PASSWORD=your_strong_password
CLOUDINARY_CLOUD_NAME=your_cloud_name (اختياري)
CLOUDINARY_API_KEY=your_api_key (اختياري)
CLOUDINARY_API_SECRET=your_api_secret (اختياري)
```

### الخطوة 5: إعادة Deployment

```bash
git add .
git commit -m "Update Vercel deployment configuration"
git push
```

Vercel ستقوم بـ redeploy تلقائيًا.

---

## التحقق من أن كل شيء يعمل

1. افتح Vercel app: `https://isweb.vercel.app/admin`
2. في Dashboard، تحقق من **Mongo status**:
   - ✅ **Online** = كل شيء يعمل بشكل صحيح
   - 🔴 **Local** = MongoDB غير متصل

### إذا كان Mongo status: Local

1. تحقق من Environment Variables على Vercel:
   - `Settings` → `Environment Variables`
   - تأكد من وجود `MONGODB_URI`

2. تحقق من Connection String:
   - هل تحتوي على كلمة المرور الصحيحة؟
   - هل لديك whitelist IP للـ MongoDB Atlas؟
     - اذهب إلى MongoDB Atlas → Security → Network Access
     - أضف `0.0.0.0/0` (السماح من أي IP)

3. جرّب حفظ تغيير بسيط وتفقد Vercel logs:
   - `https://vercel.com/your-account/isweb-studio/deployments`

---

## Vercel API Logs

لمراقبة الأخطاء:

```bash
# استخدم Vercel CLI (إذا كان مثبتًا)
vercel logs --tail
```

أو اذهب للـ Vercel Dashboard وافتح **Deployments** → **last deployment** → **Logs**

---

## ملخص البيئات

| البيئة | MONGODB_URI | VITE_API_URL | CLIENT_ORIGIN |
|--------|------------|------------|------------|
| **Local** | `mongodb://127.0.0.1:27017/isweb_studio` | `/api` | `http://localhost:5173` |
| **Vercel** | `mongodb+srv://...` | `/api` | `https://isweb.vercel.app` |

---

## المشاكل الشائعة

### 1. "MongoDB is not connected"
- ✅ تحقق من `MONGODB_URI` صحيح
- ✅ تأكد من IP Whitelist في MongoDB Atlas
- ✅ جرّب إعادة deployment

### 2. "Invalid admin password"
- ✅ تحقق من `ADMIN_PASSWORD` و `VITE_ADMIN_PASSWORD` متطابقة
- ✅ أعد deployment بعد التغيير

### 3. CORS errors
- ✅ الآن يتم حلها تلقائيًا في الكود المحدث
- ✅ الـ domain يتم اكتشافه تلقائيًا من Vercel

### 4. الحقول الفارغة عند الفتح من جهاز آخر
- ✅ انتظر قليلاً ثم أعد تحميل الصفحة
- ✅ تأكد من اتصالك بالإنترنت
- ✅ افتح console (F12) وتفقد الأخطاء

---

## خطوات الاختبار النهائي

```bash
# 1. محليًا - تأكد من أنه يعمل
npm run dev:full

# 2. ثم push للـ GitHub
git push

# 3. Vercel سيقوم بـ build و deploy تلقائيًا

# 4. افتح https://isweb.vercel.app/admin

# 5. أضف محتوى واختبره من جهاز آخر
```

---

## للمساعدة الإضافية

- MongoDB Atlas Support: [docs.mongodb.com](https://docs.mongodb.com)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- اتصل بـ Support في كلا الخدمتين إذا استمرت المشاكل
