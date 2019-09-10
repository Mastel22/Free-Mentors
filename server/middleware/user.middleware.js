import bcrypt from 'bcrypt';
import Database from '../db/db';

const db = new Database();

export const emailUsed = async (req, res, next) => {
  const result = await db.selectCount('users', 'email', req.body.email);
  
  if (result.rows[0].count !== '0') {
    return res.status(409).json({
      status: 409,
      message: 'Email already used',
      data: req.body.email,
    });
  }
  next();
  return 0;
};

export const hashPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;
  next();
};


export const authenticate = async (req, res, next) => {
  const user = await db.selectBy('users','email',req.body.email);
  if (user.rowCount > 0 ) {
    console.log(user.rowCount);
    
    const validPassword = await bcrypt.compare(req.body.password, user.rows[0].password);
    if (validPassword) {
      next();
    } else {
      return res.status(404).json({
        status: 404,
        message: 'Incorrect Password.',
      });
    }
  } else {
    return res.status(404).json({
      status: 404,
      message: 'Email  not found.',
    });
  }
  return 0;
};
