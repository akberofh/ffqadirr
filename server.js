import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import catagoryRoutes from './routes/catagoryRouter.js';
import qolbaqRoutes from './routes/qolbaqRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware Ayarı
const allowedOrigins = [
  'https://www.ffqadir.az',
  'https://ffqadir.az',
  'https://f-fqadir-adminpanel.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('Gelen Origin:', origin); // Gelen isteği terminalde görebilmek için log atalım

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Gelen isteğe uygun Origin ayarla
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    console.log('CORS engellendi:', origin); // Desteklenmeyen originleri terminale yazdıralım
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API yolları
app.use('/api/users', userRoutes);
app.use('/api/catagory', catagoryRoutes);
app.use('/api/mobile', qolbaqRoutes);

// Ana sayfa rotası
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// Sunucuyu başlat
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
