const nodeFetch = require('node-fetch');
const cheerio = require('cheerio');

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

var intervalId = setInterval(function () {
  requestWebPage();
}, 3000);

function requestWebPage() {
  //fetching data from URL
  nodeFetch('https://www.mohfw.gov.in/')
    .then(checkStatus)
    .then((res) => res.text())
    .then((body) => {
      let $ = cheerio.load(body);
      //collecting state headers/titles
      let stateHeaders = $(
        '#state-data > div > div > div > div > table > thead > tr'
      );
      //console.log('reached', body);
      var headText = stateHeaders.contents().text().trim();
      headText = headText.split('\n\t');
      console.log(headText);
    })
    .catch((err) => {
      console.log(err);
    });

  clearInterval(intervalId);
}
requestWebPage();
