import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);

describe('App: ', () => {

  let token;
  let mentorToken;

  const data = {
    "firstName": "Mastel",
    "lastName": "Mahoro",
    "email": "amstell@gmail.com",
    "address": "Kigali",
    "password": "0775315500",
    "bio": "code",
    "occupation": "Andela Fellow",
    "expertise": "Swift"
  };

  it('should create a new user', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(data).end((error, res) => {
      res.should.have.status(201);
      token = res.body.data.token;
      done();
    })
  });

  

  it('should signin a user', (done) => {;
    chai.request(app).post('/api/v1/auth/signin').send({email: data.email, password: data.password}).end((error, res) => {
      res.should.have.status(200);
      done();
    })
  });

  it('should create of a mentor', (done) => {;
    chai.request(app).post('/api/v1/auth/signin').send({email: "master@gmail.com", password: "jeanluc"}).end((error, res) => {
      mentorToken = res.body.data.token;
      res.should.have.status(200);
      done();
    })
  });

  it('should return all mentors', (done) => {;
    chai.request(app).get('/api/v1/mentors').set('token', token).end((error, res) => {
      res.should.have.status(200);
      done();
    })
  });

  

  it('should create a session', (done) => {
    const session = {
      "mentorId": 2,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', token).end((error, res) => {
      res.should.have.status(201);
      done();
    })
  });

  it('should return message not found', (done) => {
    const session = {
      "mentorId": 3,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', token).end((error, res) => {
      res.should.have.status(404);
      done();
    })
  });
  it('should return message Forbidden access', (done) => {
    const session = {
      "mentorId": 3,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', mentorToken).end((error, res) => {
      res.should.have.status(403);
      done();
    })
  });


});
