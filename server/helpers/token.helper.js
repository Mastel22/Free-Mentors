import jwt from 'jsonwebtoken';

const generateToken = (email) => jwt.sign({email: email}, process.env.KEY);
export default generateToken;
