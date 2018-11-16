
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

describe('user', () => {
	beforeEach((done) => {
		User.remove({}, (err) => { 
		   done();		   
		});		
    })
})

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