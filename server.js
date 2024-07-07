import express from 'express';
import urlRouter from './routes/urlRouter.js';
import dbConnect from './dbConnect/dbConfig.js';
import shortURLRouter from './routes/shortURLRouter.js'
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser';
import { restrictUser } from './middlewares/authUser.js';

const app = express();
const PORT = 3000;

dbConnect('mongodb+srv://admin:admin@url-shortner.x5qlpuu.mongodb.net/?retryWrites=true&w=majority&appName=url-shortner');

app.use(express.json());
app.use(cookieParser());
app.use('/url', restrictUser, urlRouter);
app.use('/shortURL', shortURLRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});