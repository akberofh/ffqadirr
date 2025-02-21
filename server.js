import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import catagoryRoutes from './routes/catagoryRouter.js';
import qolbaqRoutes from './routes/qolbaqRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware Ayarı
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'https://ffqadir.az',
  'https://www.ffqadir.az',
  'https://f-fqadir-adminpanel.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy hatası: Erişim engellendi.'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// OPTIONS Preflight Middleware (CORS için gereklidir)
app.options('*', cors());

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
