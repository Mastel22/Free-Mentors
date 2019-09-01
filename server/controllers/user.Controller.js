import User from '../models/user.model';
import users from '../db/data';
import generateToken from '../helpers/token.helper';

export const signin = (req, res) => {
  const token = generateToken(req.body.email);

  return res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
};

export const signup = (req, res) => {
  const user = new User(users.length + 1, req.body.firstName, req.body.lastName, req.body.email,
    req.body.password,
    req.body.address, req.body.bio, req.body.occupation, req.body.expertise, req.body.role);
  users.push(user);

  const token = generateToken(user.email);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
    },
  });
};
9
export const allMentors = (req, res) => {
  if (req.user.role === 'mentee' || 'admin') {
    const mentors = users.filter((user) => user.role === 'mentor');
    console.log(mentors);
    return res.status(200).json({
      status: 200,
      data: {
        mentors,
      },
    });
  }

  return res.status(204).json({
    status: 204,
    message: 'Access Denied',

  });
};
