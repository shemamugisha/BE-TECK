import { it, describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.expect();
chai.use(chaiHttp);

describe('Testing Server', () => {
  it('Testing Welcome endPoint', async () => {
    const res = await chai.request(server).get('/api/v1/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Welcome to ZipTech Api');
  });

  it('Testing unknown endPoint', async () => {
    const res = await chai.request(server).get('/unknown');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('message');
  });
});
