import bcrypt from 'bcrypt';
import users from '../db/data';

export const emailUsed = (req, res, next) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user) {
    return res.status(409).json({
      status: 409,
      message: 'Email already used',
      data: user.email,
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
  const user = users.find((user) => user.email === req.body.email);

  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
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
};
