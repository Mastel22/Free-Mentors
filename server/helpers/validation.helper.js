import Joi from '@hapi/joi';

const signupSchema = {
  firstName: Joi.string().strict().trim().required(),
  lastName: Joi.string().strict().trim().required(),
  email: Joi.string().strict().trim().required()
    .email(),
  password: Joi.string().strict().trim().min(6)
    .required(),
  address: Joi.string().strict().trim().required(),
  bio: Joi.string().strict().trim().required(),
  occupation: Joi.string().strict().trim().required(),
  expertise: Joi.string().strict().trim().required(),
};

const signinSchema = {
  email: Joi.string().strict().trim().required()
    .email(),
  password: Joi.string().strict().trim().min(6)
    .required(),
};


export default {
  '/auth/signup': signupSchema,
  '/auth/signin': signinSchema,
};
