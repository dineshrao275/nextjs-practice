import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './connection/db.js';
import authenticate from './middlewares/authMiddleware.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user',[authenticate], userRoutes);
app.use('/api/blog',[authenticate], blogRoutes);
// app.use('/api/category',[authenticate], categoryRoutes);
// app.use('/api/comment',[authenticate], commentRoutes);
// app.use('/api/like',[authenticate], likeRoutes);

// Start the server
db(); // Connect to the database

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});