import 'dotenv/config';
import app, { startMongoConnection } from './app.js';

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);

  startMongoConnection().catch((error) => {
    console.warn('MongoDB startup connection failed:', error?.message || error);
  });
});
