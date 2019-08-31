import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);


export default app;
