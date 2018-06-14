var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var should = chai.should();

chai.use(chaiHttp);

describe('Stocks', function() {
it('should get list ALL stocks on /stock/get GET', function(done) {
  chai.request(server)
    .get('/stock/get')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
  
});