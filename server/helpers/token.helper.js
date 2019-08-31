import jwt from "jsonwebtoken";

export const generateToken = (email) => {
    return jwt.sign({email: email}, 'process.env.KEY');
}