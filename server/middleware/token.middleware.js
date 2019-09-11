import jwt from 'jsonwebtoken';
import Database from '../db/db';

const db = new Database();

const tokenVerifier = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'You should first Login.',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.KEY);
    const user = await db.selectBy('users','email',verified.email);
    req.user = {
      token: verified,
      email: verified.email,
      role: user.rows[0].role,
      userId: user.rows[0].userid,
    };

    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid token!',
    });
  }
};
export default tokenVerifier;
