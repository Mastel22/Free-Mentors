import express from 'express';

import validation from '../middleware/validation.middleware';
import { authenticate, hashPassword, emailUsed } from '../middleware/user.middleware';
import {
  signup, signin,
  allMentors, sessionCreate, getMentor, acceptmentorshipRequest,
} from '../controllers/user.Controller';
import tokenVerifier from '../middleware/token.middleware';

const route = express.Router();


route.post('/auth/signup', validation, emailUsed, hashPassword, signup);
route.post('/auth/signin', validation, authenticate, hashPassword, signin);
route.get('/mentors', tokenVerifier, allMentors);
route.post('/sessions', tokenVerifier, sessionCreate);
route.get('/mentors/:mentorId', tokenVerifier, getMentor);
route.patch('/sessions/:sessionId', tokenVerifier, acceptmentorshipRequest);


export default route;
