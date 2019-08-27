import express from 'express';
import userController from '../controller/userController';
import UserController from '../controller/userController';


const route = express.Router();


route.get('/', (req,res)=>{

    res.status(200).json({
        message: "Welcome to Free-Mentors"
    });

});
route.post('/api/auth/signup', UserController.userCreate);

export default route;
