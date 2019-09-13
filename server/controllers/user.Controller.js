import User from '../models/user.model';
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
  const user = new User(req.body.firstName, req.body.lastName, req.body.email,
    req.body.password, req.body.address, req.body.bio, req.body.occupation, req.body.expertise, req.body.role);

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

export const allMentors = async (req, res) => {
  if (req.user.role === 'mentee' || req.user.role === 'admin') {
    const mentors = await db.selectBy('users','role','mentor');
    const result = mentors.rows.map(m => {
      return {
        firstName: m.firstname,
        lastname: m.lastname,
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
      data: result,
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
    if (checkMentor.rows[0] && checkMentor.rows[0].role == 'mentor') {
      
      const session = new Session(req.body.mentorId,
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

export const getMentor = async (req, res) => {
  if (req.user.role === 'mentee') {
    const mentor = await db.selectBy('users', 'userid', req.params.mentorId)
    const {password, ...data} = mentor.rows[0];
    if (mentor.rows[0]) {
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

export const acceptmentorshipRequest = async (req, res) => {
  if (req.user.role === 'mentor') {
    
    const result =  await db.updateSession('accepted',req.params.sessionId,req.user.userId);
    
    if (result.rowCount == 1) {
      return res.status(200).json({
        status: 200,
        message: 'Session changed to accepted',
      });
    }
     
    return res.status(404).json({
      status: 404,
      message: 'Session not found',
    });
  }
  return res.status(403).json({
    status: 403,
    message: 'Not allowed',
  });
};

  

export const rejectmentorshipRequest = async (req, res) => {
  if (req.user.role === 'mentor') {
    const result =  await db.updateSession('rejected',req.params.sessionId,req.user.userId);
    
    if (result.rowCount == 1) {
      return res.status(200).json({
        status: 200,
        message: 'Session changed to rejected',
      });
    }
     
    return res.status(403).json({
      status: 403,
      message: 'session not found',
    });
  }
  return res.status(404).json({
    status: 404,
    message: 'Not allowed',
  });
};

export const changeMenteetoMentor = async (req, res) => {
  if (req.user.role === 'admin') {
    const result =  await db.updateMentee('mentor',req.params.userId);
    
    if (result.rowCount == 1) {
      return res.status(200).json({
        status: 200,
        message: 'User changed from Mentee to Mentor',
      });
    }
     
    return res.status(404).json({
      status: 404,
      message: 'No user found',
    });
  }
  return res.status(403).json({
    status: 403,
    message: 'Not allowed',
  });
};
