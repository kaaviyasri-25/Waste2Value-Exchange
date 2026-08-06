import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

console.log(process.env.MONGO_URI);
// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Waste2Value Exchange API is Running');
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

app.get('/', (req, res) => {
  res.send('Waste2Value Exchange API is Running');
});