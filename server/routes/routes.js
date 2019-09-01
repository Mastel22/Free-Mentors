import express from 'express';

import validation from '../middleware/validation.middleware';
import { authenticate, hashPassword, emailUsed } from '../middleware/user.middleware';
import {
  signup, signin,
  allMentors, sessionCreate,
} from '../controllers/user.Controller';
import tokenVerifier from '../middleware/token.middleware';

const route = express.Router();


route.post('/auth/signup', validation, emailUsed, hashPassword, signup);
route.post('/auth/signin', validation, authenticate, hashPassword, signin);
route.get('/mentors', tokenVerifier, allMentors);
route.post('/sessions', tokenVerifier, sessionCreate);

export default route;
