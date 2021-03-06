const nodeFetch = require('node-fetch');
const cheerio = require('cheerio');
const slugify = require('slugify');
const fs = require('fs');
const DATA_FILE_PATH = __dirname + '/../data/allStates.json';
const { saveDataInHindi } = require('../utils/save-data-hindi');

var fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'text/html',
    'Accept-Encoding': 'gzip, deflate',
  },
};

//handling client and server errors
function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw res.statusText;
  }
}
var jsonData = [];

function requestWebPage() {
  //fetching data from URL
  nodeFetch('https://www.mohfw.gov.in/')
    .then(checkStatus)
    .then((res) => res.text())
    .then((body) => {
      let $ = cheerio.load(body);
      //collecting data wrt state data
      let stateData = $('#state-data > div > div > div > div > table > tbody');

      var stateText = stateData.contents().text().trim();
      stateText = stateText.split('\n\t\n\t');

      for (var i = 0; i < stateText.length; i++) {
        if (stateText[i] == '' || stateText[i] == '\n') {
          stateText.splice(i, 1);
        }
      }
      for (var i = 0; i < stateText.length; i++) {
        if (stateText[i] == '' || stateText[i] == '\n') {
          stateText.splice(i, 1);
        }
        temp = stateText[i].split('\n\t').filter((ele) => {
          return ele != '\n' && ele != '' && ele != "'";
        });
        jsonData.push({
          id: parseInt(temp[0]),
          stateName: temp[1],
          totalCases: parseInt(temp[2]),
          cured: parseInt(temp[3]),
          death: parseInt(temp[4]),
          searchName: slugify(temp[1], { replacement: '-', lower: true }),
        });
        if (parseInt(temp[0]) == 32) {
          break;
        }
      }
      dumpData(jsonData);
      jsonData = [];
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports.requestWebPage = requestWebPage;
function dumpData(data) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data), { flag: 'w+' });
    saveDataInHindi();
    var date = new Date();
    fs.writeFileSync(
      __dirname + '/../data/time.json',
      JSON.stringify({
        lastUpdatedAt:
          date.getDate() +
          '-' +
          date.getMonth() +
          '-' +
          date.getFullYear() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes(),
      }),
      {
        flag: 'w+',
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports.requestWebPage = requestWebPage;
