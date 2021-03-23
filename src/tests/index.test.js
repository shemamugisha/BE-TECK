import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { it, describe } = mocha;

chai.expect();
chai.use(chaiHttp);

describe('Testing Server', () => {
  it('Testing Welcome endPoint', async () => {
    const res = await chai.request(server).get('/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
  });

  it('Testing unknown endPoint', async () => {
    const res = await chai.request(server).get('/unknow');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('success', false);
  });
});
