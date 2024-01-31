import express from 'express';
import cors from 'cors';
import { categoryRoute } from './routes.js';

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/clues/random', categoryRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log('Up an running!');
});
