import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 1337;

app.get('/', (req, res) => {
  const a = 4;
  console.log(a);
  res.send('Hello World!s');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
