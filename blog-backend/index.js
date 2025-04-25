import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './connection/db.js';
import authenticate from './middlewares/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user',[authenticate], userRoutes);

// Start the server
db(); // Connect to the database

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});