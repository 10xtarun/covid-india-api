var fs = require('fs');

function converter(num) {
  switch (num) {
    case 0:
      return '०';
    case 1:
      return '१';
    case 2:
      return '२';
    case 3:
      return '३';
    case 4:
      return '४';
    case 5:
      return '५';
    case 6:
      return '६';
    case 7:
      return '७';
    case 8:
      return '८';
    case 9:
      return '९';
    default:
      return '-1';
  }
}

module.exports.EngToHindi = function (num) {
  var str = '';
  if (typeof num == 'number') {
    if (num == 0) {
      return '०';
    }
    while (num) {
      str = converter(num % 10) + str;
      num = Math.floor(num / 10);
    }
    return str;
  } else {
    return 'wrong format of number provided.';
  }
};
