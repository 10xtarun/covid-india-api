const { EngToHindi } = require('../utils/language-converter');

const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;

describe('Testing English number conversions to Hindi number strings', () => {
  it('should return the string', async () => {
    var data = await EngToHindi(123);
    expect(typeof data).to.equal('string');
  });

  it('should return following format in hindi', async () => {
    var data = await EngToHindi(6817);
    expect(data).to.equal('६८१७');
  });

  it('should return null when non-number type of data is provided', async () => {
    var data = await EngToHindi('6817');
    expect(data).to.equal(null);
  });

  it('should return proper format for 0 (zero)', async () => {
    var data = await EngToHindi(0);
    expect(data).to.equal('०');
  });
});
