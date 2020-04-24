const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
//function to be tested
const { requestWebPage } = require('../try-outs/2.cheerio');

//function to read data dumped by cheerio
const fs = require('fs');
function readData() {
  var data = JSON.parse(fs.readFileSync('data/allStates.json'));
  return data;
}

describe('Testing return values from web scraping function', () => {
  it('should return data length of 32, and have following property', async () => {
    const data = await readData();
    console.log(data);
    expect(data.length).to.equal(32);
    expect(data[0]).to.have.property('id');
    expect(data[0]).to.have.property('stateName');
    expect(data[0]).to.have.property('totalCases');
    expect(data[0]).to.have.property('cured');
    expect(data[0]).to.have.property('death');
  });
});
