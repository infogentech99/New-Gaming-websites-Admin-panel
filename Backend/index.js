import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; 
import userRoutes from './route/user.route.js';
import adminRoutes from './route/admin.route.js';
import betRoutes from './route/bet.route.js';
import settleBets from './bettingService.js';

const app = express();

dotenv.config();
const URI = process.env.MONGO_URI;
const URL = process.env.URL;
const PORT = process.env.PORT || 4000;

// Configure CORS to allow the frontend's origin and include credentials
const corsOptions = {
  origin: 'http://localhost:5173', // allow only this origin
  credentials: true,               // enable Access-Control-Allow-Credentials
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the configured CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight OPTIONS requests

app.use(cookieParser());

try {
  mongoose.connect(URI);
} catch (error) {
  console.error("MongoDB connection error: ", error);
}

app.use('/user', userRoutes);
app.use('/bet', betRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('hello');
});

// Uncomment and use this for bet settlement scheduling if needed
// function scheduleBetSettlement() {
//   settleBets().finally(() => {
//     // Schedule the next execution after 1 minute
//     setTimeout(scheduleBetSettlement, 60 * 1000);
//   });
// }
// scheduleBetSettlement();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
