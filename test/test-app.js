const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiXml = require('chai-xml');
const mockery = require('mockery');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiXml);


describe('SDK Starter', function() {
  let server;

  before(function(){
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    function randosMock() {
      return '4'; // chosen by fair dice roll
                  // guaranteed to be random
    }


    // replace the module `request` with a stub object
    mockery.registerMock('./randos', randosMock);
    server = require('../app');
  });

  after(function(){
    mockery.disable();
  });

  it('should render config on /config GET', (done) => {
    const properties = [
      'TWILIO_ACCOUNT_SID',
      'TWILIO_NOTIFICATION_SERVICE_SID',
      'TWILIO_API_KEY',
      'TWILIO_API_SECRET',
      'TWILIO_CHAT_SERVICE_SID',
      'TWILIO_SYNC_SERVICE_SID'
    ];
    chai.request(server)
      .get('/config')
      .end(
        (err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            expect(res.body).to.have.property(property);
            expect(res.body[property]).to.exist;
          }
          done();
        }
      );
  });

  it('should give a JWT token on /token GET', (done) => {
    chai.request(server)
      .get('/token')
      .end(
        (err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('identity');
          console.log(res.body.identity);
          done();
        }
      );
  });

});
