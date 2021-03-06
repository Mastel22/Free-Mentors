import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('App: ', () => {

  let token;
  let token1;
  let token2;
  let adminToken;
  let mentorToken;

  const data = {
    "firstName": "Mastel",
    "lastName": "Mahoro",
    "email": "ooo@gmail.com",
    "address": "Kigali",
    "password": "0775315500",
    "bio": "code",
    "occupation": "Andela Fellow",
    "expertise": "Swift"
  };

  it('should create a new user', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(data).end((error, res) => {
      chai.expect(res.status).to.be.eq(201);
      chai.expect(res.body.message).to.be.eq('User created successfully');
      chai.expect(res.body.data.token.length).to.be.gt(10)
      token = res.body.data.token;
      done();
    });
  });

  it('should create a new user', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send({
      "firstName": "Mastel",
      "lastName": "Mahoro",
      "email": "gggg@gmail.com",
      "address": "Kigali",
      "password": "0775315500",
      "bio": "code",
      "occupation": "Andela Fellow",
      "expertise": "Swift"
    }).end((error, res) => {
      chai.expect(res.status).to.be.eq(201);
      chai.expect(res.body.message).to.be.eq('User created successfully');
      chai.expect(res.body.data.token.length).to.be.gt(10)
      token1 = res.body.data.token;
      done();
    });
  });

  it('should create a new user', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send({
      "firstName": "Mastel",
      "lastName": "Mahoro",
      "email": "ggjgg@gmail.com",
      "address": "Kigali",
      "password": "0775315500",
      "bio": "code",
      "occupation": "Andela Fellow",
      "expertise": "Swift"
    }).end((error, res) => {
      chai.expect(res.status).to.be.eq(201);
      chai.expect(res.body.message).to.be.eq('User created successfully');
      chai.expect(res.body.data.token.length).to.be.gt(10)
      token2 = res.body.data.token;
      done();
    });
  });

  it('should signin a user', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: data.email, password: data.password }).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      chai.expect(res.body.message).to.be.eq('User is successfully logged in');
      done();
    })
  });

  it('login as an admin', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: "admin@freementors.com", password: "mastel" }).end((error, res) => {
      adminToken = res.body.data.token;
      chai.expect(res.status).to.be.eq(200);
      done();
    })
  });

  it('it should change mentee to mentor', (done) => {
    chai.request(app).patch('/api/v1/user/2').set('token', adminToken).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      chai.expect(res.body.message).to.be.eq('User changed from Mentee to Mentor');
      done();
    })
  });

  it('it should forbid access', (done) => {
    chai.request(app).patch('/api/v1/user/3').set('token', token).end((error, res) => {
      chai.expect(res.status).to.be.eq(403);
      chai.expect(res.body.message).to.be.eq('Not allowed');
      done();
    })
  });


  it('should login a mentor', (done) => {;
    chai.request(app).post('/api/v1/auth/signin').send({email: "ooo@gmail.com", password: "0775315500"}).end((error, res) => {
      mentorToken = res.body.data.token;
      chai.expect(res.status).to.be.eq(200);
      chai.expect(res.body.message).to.be.eq('User is successfully logged in');
      done();
    })
  });

  it('should return all mentors', (done) => {;
    chai.request(app).get('/api/v1/mentors').set('token', token2).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      done();
    })
  });

  it('should return a specific mentor', (done) => {;
    chai.request(app).get('/api/v1/mentors/2').set('token', token2).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      done();
    })
  });

  it('should create a session', (done) => {
    const session = {
      "mentorId": 2,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', token1).end((error, res) => {
      chai.expect(res.status).to.be.eq(201);
      done();
    })
  });

  it('should create a session', (done) => {
    const session = {
      "mentorId": 2,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', token1).end((error, res) => {
      chai.expect(res.status).to.be.eq(201);
      done();
    })
  });

  it('should return message not found', (done) => {
    const session = {
      "mentorId": 4,
      "question": "When should we begin",
    };
    chai.request(app).post('/api/v1/sessions').send(session).set('token', token2).end((error, res) => {
      chai.expect(res.status).to.be.eq(404);
      done();
    })
  });

  it('it should change a session from pending to accepted', (done) => {
    chai.request(app).patch('/api/v1/sessions/1/accept').set('token', mentorToken).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      chai.expect(res.body.message).to.be.eq('Session changed to accepted');
      done();
    })
  });

  it('it should change a session from pending to rejected', (done) => {
    chai.request(app).patch('/api/v1/sessions/2/reject').set('token', mentorToken).end((error, res) => {
      chai.expect(res.status).to.be.eq(200);
      chai.expect(res.body.message).to.be.eq('Session changed to rejected');
      done();
    })

  });

});
