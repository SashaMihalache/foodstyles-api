import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandling } from './middlewares/errorHandling';

dotenv.config();

const app = express();
const port = process.env.PORT || 1337;

app.use('/', router);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
