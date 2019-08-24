import express from 'express';
import db from './db/userdb';
import bodyParser from 'body-parser';
import route from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);

const PORT = 3001;

app.listen( PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
});
