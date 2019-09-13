import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import route from './routes/routes';


const app = express();

dotenv.config();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.use('*', (req,res)=>{
    res.json({
        message: 'Welcome to Free-Mentors'
    })
})

export default app;
