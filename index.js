import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';

dotenv.config();
const app = express();

app.use(cors({ origin: "https://blog-editor-frontend-beta.vercel.app", credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
