const { EngToHindi } = require('./language-converter');
const fs = require('fs');
const FILE_PATH = __dirname + '/../data/';

module.exports.saveDataInHindi = function () {
  //read the english data saved already
  var allData = JSON.parse(fs.readFileSync(FILE_PATH + 'allStates.json'));
  var hindiData = JSON.parse(fs.readFileSync(FILE_PATH + 'hindi.json'));
  for (var i = 0; i < hindiData.length; i++) {
    hindiData[i]['totalCases'] = EngToHindi(allData[i]['totalCases']);
    hindiData[i]['cured'] = EngToHindi(allData[i]['cured']);
    hindiData[i]['death'] = EngToHindi(allData[i]['death']);
  }
  fs.writeFileSync(FILE_PATH + 'hindi.json', JSON.stringify(hindiData), {
    flag: 'w+',
  });
};
