const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;

describe('Testing return values from web scraping function', () => {
  it('should return data length of 32, and have following property', async () => {
    const resp = await supertest(app).get('');
  });
});
