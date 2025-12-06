import express from 'express';
import cors from 'cors';
import path from 'path';
import movieRoutes from './routes/movies';
import adminRoutes from './routes/admin';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static files from dist folder
app.use(express.static(path.join(process.cwd(), 'dist')));

app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

// Serve React app for all non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Network: http://0.0.0.0:${PORT}`);
  console.log(`Frontend + Backend served together`);
});
