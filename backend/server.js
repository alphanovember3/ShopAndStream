import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound , errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'
dotenv.config();

//importing the connect to DB function
import connectDB from './config/db.js';

//importing routes:
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkOutRoutes from './routes/checkOutRoutes.js'

const port = process.env.PORT || 5000;

//connecting to DB:
connectDB();

//creating a express app:
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkOutRoutes)
app.use(notFound);
app.use(errorHandler);

app.get('/' , (req,res) => {
  res.send('Api is running bro!');
})

app.listen(port, () => {
  console.log(`server is running on the port : ${port}`);
})