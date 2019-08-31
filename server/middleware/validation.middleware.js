import Joi from "@hapi/joi";
import Schemas from "../helpers/validation.helper";

export const validation =(req, res, next) =>{
    const methodsSupported = ['post', 'put', 'patch'];
    const path = req.route.path;
    const method = req.method.toLowerCase();

    if(methodsSupported.includes(method) && Schemas[path]  !=undefined){
        const schema = Schemas[path];

        return Joi.validate(req.body, schema, (error, data) =>{
            if(error){
                res.status(400).json({
                    'status' : 400,
                    'error' :error.details[0].message
                });
            }
            else{
                req.body = data;
                next();
            }
        });
        
    }
};