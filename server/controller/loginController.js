import logindb from '../db/logindb';
import loginValidation from '../helper/loginValidation';
import login from '../db/logindb';

class LoginController{

    static loginController(req,res){
        let loginEmail;
        let loginPassword;
        
        if (loginValidation){
            if(loginEmail===(db.find(user => user.Email == req.params.Email))||loginPassword===db.find(user => user.password == req.params.password))
        {
            res.status(200).json({
                status: 200,
            message: "User is successfully succesfully logged in",
            data: {
                token: "token data",
                
            }
            });
        }
        else{
            res.status(400).json({
                status: 400,
            message: "Invalid input",
            data: {
                token: "token data",
                
            }
            });
        }

        }
        
    
    }
    

}