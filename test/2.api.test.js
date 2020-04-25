const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const { app } = require('../server');

describe('Testing return values from web scraping function', () => {
  it('should return data length of 32, and have following property', async () => {
    const resp = await supertest(app).get('/api/v1/states');
    expect(resp.status).to.equal(200);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.have.property('lastUpdated');
    expect(resp.body.data.length).to.equal(32);
    expect(resp.body.data[0]).to.have.property('stateName');
    expect(resp.body.data[0]).to.have.property('totalCases');
    expect(resp.body.data[0]).to.have.property('cured');
    expect(resp.body.data[0]).to.have.property('death');
  });

  it('should return data length of 32, and have following property', async () => {
    const resp = await supertest(app).get('/api/v1/states?lang=hindi');
    expect(resp.status).to.equal(200);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.have.property('lastUpdated');
    expect(resp.body.data.length).to.equal(32);
    expect(resp.body.data[0]).to.have.property('stateName');
    expect(resp.body.data[0]).to.have.property('totalCases');
    expect(resp.body.data[0]).to.have.property('cured');
    expect(resp.body.data[0]).to.have.property('death');
  });

  it('should return the data of requested state', async () => {
    const resp = await supertest(app).get('/api/v1/state/maharashtra');

    //tested with live input of values
    expect(resp.status).to.equal(200);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.have.property('lastUpdated');
    expect(resp.body.data.totalCases).to.equal(6817);
    expect(resp.body.data.stateName).to.equal('Maharashtra');
    expect(resp.body.data.cured).to.equal(957);
  });

  it('should return the data of requested state', async () => {
    const resp = await supertest(app).get(
      '/api/v1/state/maharashtra?lang=hindi'
    );
    //tested with live inputs of values
    expect(resp.status).to.equal(200);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.have.property('lastUpdated');
    expect(resp.body.data.totalCases).to.equal('६८१७');
    expect(resp.body.data.stateName).to.equal('महाराष्ट्र');
    expect(resp.body.data.cured).to.equal('९५७');
  });
});
