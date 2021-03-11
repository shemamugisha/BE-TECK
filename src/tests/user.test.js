import { it, describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {
  signin,
  noname,
  signup,
  wrongEmail,
  wrongPass,
  requiredPass,
} from './Mocks/mocksUser';

chai.expect();
chai.use(chaiHttp);

describe('Testing User', () => {
  it('Testing signUp endPoint', async () => {
    const res = await chai.request(server).post('/user/signup').send(signup);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
  });
  it('Testing signIn endPoint', async () => {
    const res = await chai.request(server).post('/user/signin').send(signin);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
  });
  it('Wrong password', async () => {
    const res = await chai.request(server).post('/user/signin').send(wrongPass);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('success', false);
  });
  it('Wrong email', async () => {
    const res = await chai
      .request(server)
      .post('/user/signin')
      .send(wrongEmail);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('success', false);
  });
  it('No password', async () => {
    const res = await chai
      .request(server)
      .post('/user/signin')
      .send(requiredPass);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('success', false);
  });
  it('User already exists', async () => {
    const res = await chai.request(server).post('/user/signup').send(noname);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('success', false);
  });
});
