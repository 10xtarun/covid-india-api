//with help of request counter you can trigger scrapper after certain number of request
const fs = require('fs');
const FILE_PATH = __dirname + '/../stats/request-logs.json';
const { saveDataInHindi } = require('../utils/save-data-hindi');

//import scrapper function
const { requestWebPage } = require('../web-scrapper/scraper');

module.exports.reqCounter = reqCounter = (req, res, next) => {
  res.on('finish', () => {
    const stats = readStats(); //load the stats
    const routeEvent = `${req.method} ${getRoute(req)} ${res.statusCode}`;
    stats[routeEvent] = stats[routeEvent] ? stats[routeEvent] + 1 : 1;
    dumpStats(stats);
    if (
      (stats['GET /api/v1/states 200'] + stats['GET /api/v1/state/:name 200']) %
        5 ==
      0
    ) {
      //after every fifth request the data wil be update by scrapper
      requestWebPage();
    }
  });
  next();
};

//helper function get proper handler path
function getRoute(req) {
  const route = req.route ? req.route.path : ''; //check if handler exists
  const baseUrl = req.baseUrl ? req.baseUrl : ''; //adding the base url
  //if the handler is child of another handler

  return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route';
}
//read json object from file
module.exports.readStats = readStats = () => {
  let result = {};
  try {
    result = JSON.parse(fs.readFileSync(FILE_PATH));
  } catch (err) {
    console.error(err);
  }
  return result;
};

//function to dump stats of how many request have been requested
const dumpStats = (stats) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
  } catch (err) {
    console.error(err);
  }
};
