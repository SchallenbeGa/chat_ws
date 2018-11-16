
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let jwt= require('jsonwebtoken');

let server = require('../bin/www');
let secret = require('../config/secret')

let should = chai.should();

const payload = {
    user: 'test'};
      var token = jwt.sign(payload,secret.secret, {
        expiresIn: 5
      });

chai.use(chaiHttp)

describe('GET /user', () => {
    it('it should GET all the users', (done) => {
          chai.request('http://localhost:3000')
          .get('/user')
          .set('Authorization',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');  
            done();
          });
    });
});

describe('POST /register', () => {
    it('it should register a test user', (done) => {
          chai.request('http://localhost:3000')
          .post('/register')
          .send('userName=test&userPass=test&passConf=test')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');  
            done();
          });
    });
});


describe('DELETE /user/delete', () => {
    it('it should delete the user where id = 1', (done) => {
          chai.request('http://localhost:3000')
          .delete('/user/delete')
          .send('userName=test')
          .set('Authorization',token)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});




