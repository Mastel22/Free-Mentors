import db from '../db/userdb';
import userValidation from '../helper/userValidation';


class UserController{
    static userCreate(req,res){
        const {
            firstName,
            lastName,
            Email,
            password,
            address,
            bio,
            occupation,
            expertise
        }=req.body;

        if(!userValidation(firstName,Email,password)){
            return res.status(400).json({
                message: "FirstName,Email and Password are required"
            })
        }

        const newUser = {
            id: db.length+1,
            firstName,
            lastName,
            Email,
            password,
            address,
            bio,
            occupation,
            expertise
        };
        db.push(newUser);

        return res.status(201).json({
            status: 201,
            message: "user successfully created",
            data: {
                token: "token data",
                newUser
            }
        });
    }
}

export default UserController;
