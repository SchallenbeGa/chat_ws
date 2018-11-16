
let Salon = require('../models/salon');

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

describe('GET /salon', () => {
    it('it should GET all the salons', (done) => {
          chai.request('http://localhost:3000')
          .get('/salon')
          .set('Authorization',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');  
            done();
          });
    });
});

describe('POST /salon/create', () => {
    it('it should create a test salon', (done) => {
          chai.request('http://localhost:3000')
          .post('/salon/create')
          .send('salonName=testSalon')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');  
            done();
          });
    });
});

describe('DELETE /salon/delete', () => {
    it('it should delete the salon where salonName = testSalon', (done) => {
          chai.request('http://localhost:3000')
          .delete('/salon/delete')
          .send('salonName=testSalon')
          .set('Authorization',token)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});