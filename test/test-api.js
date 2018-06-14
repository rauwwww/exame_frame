var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var should = chai.should();

chai.use(chaiHttp);

describe('Stocks', function() {
it('should list ALL stocks on /share/get GET', function(done) {
  chai.request(server)
    .get('/share/get')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
  it('should add a single Share on /share/post POST', function(done) {
    chai.request(server)
      .post('/share/post')
      .send({'name': 'NewStock'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('stockPrice');
        res.body.stockPrice.should.be.a('array');
        res.body.should.have.property('name');
        res.body.name.should.equal('NewStock');
        done();
      });
  });
  it('should add a Price to a existing Stock on /share/sharePost POST', function(done) {
    chai.request(server)
      .post('/share/sharePost')
      .send({'id': '5b212a2c8a7faf10409fce82', "price": "13.37"})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('message');
        res.body.message.should.equal('Price saved');
        done();
      });
  });
});