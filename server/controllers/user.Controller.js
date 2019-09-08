import User from '../models/user.model';
import { users, sessions } from '../db/data';
import generateToken from '../helpers/token.helper';
import Session from '../models/session.model';
import Database from '../db/db';

const db = new Database();

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

export const signup = async (req, res) => {
  const user = new User(users.length + 1, req.body.firstName, req.body.lastName, req.body.email,
    req.body.password, req.body.address, req.body.bio, req.body.occupation, req.body.expertise, req.body.role);
  // users.push(user);

  await db.insertIntoUser(user);

  const token = generateToken(user.email);

  return res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
    },
  });
};

export const allMentors = (req, res) => {
  if (req.user.role === 'mentee' || req.user.role === 'admin') {
    const mentors = users.filter((user) => user.role === 'mentor').map(m => {
      return {
        firstname: m.firstName,
        lastname: m.lastName,
        email: m.email,
        address: m.address,
        bio: m.bio,
        occupation: m.occupation,
        expertise: m.expertise,
        role: m.role
      }
    });

    return res.status(200).json({
      status: 200,
      data: {
        mentors,
      },
    });
  }

  return res.status(401).json({
    status: 401,
    message: 'Access Denied',
  });
};

export const sessionCreate = async (req, res) => {
  if (req.user.role == 'mentee') {
    const checkMentor = await db.selectBy('users','userId',req.body.mentorId);
    //const checkMentor = users.find((user) => user.userId == req.body.mentorId && user.role === 'mentor');
    if (checkMentor.rows[0] && checkMentor.rows[0].role == 'mentor') {
      const session = new Session(sessions.length + 1, req.body.mentorId,
        req.user.userId, req.body.questions, req.user.email);

      await db.insertIntoSession(session);
      
      return res.status(201).json({
        status: 201,
        message: 'Session created',
        data: session,
      });
    }
    else{
      return res.status(404).json({
        status: 404,
        message: 'Mentor not found',
      
      });
    }

  }
  return res.status(403).json({
    status: 403,
    message: 'Forbidden access',
  });
};

export const getMentor = (req, res) => {
  if (req.user.role === 'mentee') {
    const mentor = users.find((user) => user.userId == req.params.mentorId && user.role === 'mentor');
    const {password, ...data} = mentor;
    if (mentor) {
      return res.status(200).json({
        status: 200,
        data: data,
      });
    }
    else {
      return res.status(404).json({
        status: 404,
        message: 'Mentor not foud'
      })
    }
  }
  return res.status(403).json({
    message: 'Forbidden',
  });
};

export const acceptmentorshipRequest = (req, res) => {
  if (req.user.role === 'mentor') {
    const index = sessions.findIndex((session) => session.sessionId.toString()
      === req.params.sessionId);
    if (index !== -1) {
      sessions[index].status = 'accepted';
      return res.status(200).json({
        status: 200,
        data: sessions[index],
      });
    }
    return res.status(403).json({
      status: 403,
      message: 'no session found',
    });
  }
  return res.status(409).json({
    status: 409,
    message: 'Not allowed',
  });
};

export const rejectmentorshipRequest = (req, res) => {
  if (req.user.role === 'mentor') {
    const index = sessions.findIndex((session) => session.sessionId.toString()
      === req.params.sessionId);
    if (index !== -1) {
      sessions[index].status = 'rejected';
      return res.status(200).json({
        status: 200,
        data: sessions[index],
      });
    }
    return res.status(403).json({
      status: 403,
      message: 'no session found',
    });
  }
  return res.status(409).json({
    status: 409,
    message: 'Not allowed',
  });
};

export const changeMenteetoMentor = (req, res) => {
  if (req.user.role === 'admin') {
    const index = users.findIndex((user) => user.userId.toString()
      === req.params.userId);
    if (index !== -1) {
      users[index].role = 'mentor';
      return res.status(200).json({
        status: 200,
        data: users[index],
      });
    }
    return res.status(403).json({
      status: 403,
      message: 'no user found',
    });
  }
  return res.status(409).json({
    status: 403,
    message: 'Not allowed',
  });
};
