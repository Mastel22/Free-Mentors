import express from 'express';

import {validation} from "../middleware/validation.middleware";
import {authenticate, hashPassword,emailUsed} from "../middleware/user.middleware";
import {signup,signin} from '../controllers/user.Controller';

const route = express.Router();



route.post('/auth/signup', validation, emailUsed,hashPassword, signup);
route.post('/auth/signin', validation, authenticate, hashPassword, signin);

export default route;