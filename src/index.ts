import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as userRouter } from './routes/user'
import { router as itemRouter } from './routes/item';
import { router as cartRouter } from './routes/cart'

const app = express();

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/cart', cartRouter);

const CONNECTION_URL = 'mongodb+srv://mintesnot:Cgm6SfOcV8Fxi3Mj@ma-8745.lxs3s.mongodb.net/ecommerce?retryWrites=true&w=majority'
const PORT = 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));