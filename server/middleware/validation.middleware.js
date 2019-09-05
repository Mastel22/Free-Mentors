import Joi from '@hapi/joi';
import Schemas from '../helpers/validation.helper';

const validation = (req, res, next) => {
  const methodsSupported = ['post', 'put', 'patch'];
  const { path } = req.route;
  const method = req.method.toLowerCase();

  if (methodsSupported.includes(method) && Schemas[path] !== undefined) {
    const schema = Schemas[path];

    return Joi.validate(req.body, schema, (error, data) => {
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      
      req.body = data;
      next();
    });
  }else{
    res.status(405).json({
      status: 405
    })
  }
  
};

export default validation;
