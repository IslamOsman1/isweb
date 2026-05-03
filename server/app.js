import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Content from './models/Content.js';

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/isweb_studio';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change_this_admin_password';
const ENV = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development';

// استخراج domain من referrer أو استخدام Vercel domain
function getAllowedOrigins() {
  const baseOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];

  if (process.env.VERCEL_URL) {
    baseOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.CUSTOM_DOMAIN) {
    baseOrigins.push(`https://${process.env.CUSTOM_DOMAIN}`);
  }

  if (process.env.CLIENT_ORIGIN) {
    baseOrigins.push(...process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim()));
  }

  return baseOrigins.filter(Boolean);
}

function corsOrigin(origin, callback) {
  if (!origin) return callback(null, true);
  const allowedOrigins = getAllowedOrigins();
  if (!process.env.CLIENT_ORIGIN && !process.env.VERCEL_URL && !process.env.CUSTOM_DOMAIN) {
    return callback(null, true);
  }
  if (allowedOrigins.includes(origin)) return callback(null, true);
  callback(new Error(`CORS not allowed for origin ${origin}`));
}

let mongoReady = false;
let mongoConnectionPromise = globalThis.__iswebMongoConnectionPromise;

if (!mongoConnectionPromise) {
  mongoose.set('strictQuery', true);
  mongoConnectionPromise = mongoose
    .connect(MONGODB_URI)
    .then(() => {
      mongoReady = true;
      console.log('MongoDB connected');
    })
    .catch((err) => {
      mongoReady = false;
      console.warn('MongoDB not connected:', err.message);
    });

  globalThis.__iswebMongoConnectionPromise = mongoConnectionPromise;
} else if (mongoose.connection.readyState === 1) {
  mongoReady = true;
}

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '15mb' }));

app.use((_req, _res, next) => {
  if (mongoose.connection.readyState === 1) {
    mongoReady = true;
  }
  next();
});

function requireAdmin(req, res, next) {
  if (req.method === 'GET' && req.path === '/api/content') return next();
  if (req.get('x-admin-password') === ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Invalid admin password' });
}

function makeCloudinarySignature(params, apiSecret) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return crypto.createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex');
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mongoReady,
    cloudinaryReady: Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET,
    ),
  });
});

app.get('/api/content', async (_req, res) => {
  if (!mongoReady) return res.status(503).json({ error: 'MongoDB is not connected' });
  const doc = await Content.findOne({ key: 'site' }).lean();
  res.json(doc || null);
});

app.put('/api/content', requireAdmin, async (req, res) => {
  if (!mongoReady) return res.status(503).json({ error: 'MongoDB is not connected' });
  const payload = { ...req.body, key: 'site' };
  const doc = await Content.findOneAndUpdate({ key: 'site' }, payload, { new: true, upsert: true }).lean();
  res.json(doc);
});

app.post('/api/upload', requireAdmin, async (req, res) => {
  const { file, folder = 'isweb-studio' } = req.body || {};
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!file) return res.status(400).json({ error: 'No file was provided' });
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(503).json({ error: 'Cloudinary credentials are missing' });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = makeCloudinarySignature({ folder, timestamp }, CLOUDINARY_API_SECRET);
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', CLOUDINARY_API_KEY);
  form.append('timestamp', String(timestamp));
  form.append('folder', folder);
  form.append('signature', signature);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  });
  const data = await uploadRes.json();

  if (!uploadRes.ok) {
    return res.status(uploadRes.status).json({ error: data.error?.message || 'Cloudinary upload failed' });
  }

  res.json({ url: data.secure_url, publicId: data.public_id });
});

export default app;
