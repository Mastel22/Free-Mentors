import jwt from "jsonwebtoken";
import { users } from "../db/data";

export function tokenVerifier (req, res, next) {
    const token = req.header('token');

    if(!token) return res.status(401).json({
        'status': 401,
        'message': 'You should first Login.'
    });

    try {
        const verified = jwt.verify(token, process.env.KEY); 
        const user = users.find(user => user.email == verified.email);
        req.user = {
            'token': verified,
            'email': verified.email,
            'role': user.role
        }; 
        
        next(); 
    } catch (error) {
        res.status(400).json({
            'status': 400,
            'message': 'Invalid token!'
        });
    }
}