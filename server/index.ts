import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';
import adminRoutes from './routes/admin';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Network: http://0.0.0.0:${PORT}`);
});
