const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const { app } = require('../server');
const fs = require('fs');
var stats = JSON.parse(
  fs.readFileSync(__dirname + '/../stats/request-logs.json')
);

describe('Testing request logger function by analyzing the data dumped from the function', async () => {
  it("should return the data belonging to the successful routes and should of type 'number'", () => {
    expect(typeof stats['GET /api/v1/states 200']).to.equal('number');
    expect(typeof stats['GET /api/v1/state/:name 200']).to.equal('number');
  });
});
