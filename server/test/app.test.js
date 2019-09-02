import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../server';

chai.use(chaiHttp);

describe('Users: ', () => {
  const data = {
    firstName: 'Pierrette',
    lastName: 'MASTEL',
    address: 'Kigali',
    email: 'mastel@gmail.com',
    password: '0788969674',
    bio: ' dkk',
    occupation: 'tyui',
    expertise: 'Java',
  };
  it('should create new user.', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(data).end((_err, res) => {
      chai.expect(res.status).to.eq(201);
      done();
    });
  });

//   it('should return error if all required fields are not supplied', (done) => {
//     const userData = {
//       firstName: 'Pierrette',
//       lastName: 'Mastel',
//       address: 'Kigali',
//       password: '0788969674',
//       bio: 'jk',
//       occupation: 'rtyu',
//       expertise: 'Java',
//     };
//     chai.request(server).post('/api/v1/auth/signup').send(userData).end((err, res) => {
//       chai.expect(res.status).to.eq(400);
//       done();
//     });
//   });

  it('should return error if email already exists', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send(data).end((err, res) => {
      chai.expect(res.status).to.eq(409);
      done();
    });
  });

  it('should return a token and user details', () => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'mastel@gmail.com',
      password: '0775315500',
    }).then((res) => {
      chai.expect(res.status).to.eq(200);
    })
      .catch((error) => {
        throw error;
      });
  });
});
