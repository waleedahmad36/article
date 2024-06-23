import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import articleRoutes from './routes/articleRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', articleRoutes);

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
