const asyncHandler = require('../middleware/async');
const fs = require('fs');
const ENG_FILE_PATH = __dirname + '/../data/allStates.json';
const HINDI_FILE_PATH = __dirname + '/../data/hindi.json';
const DATE_FILE_PATH = __dirname + '/../data/time.json';

//@desc GET all states data
//@route GET /api/v1/states
//@access Public
exports.getAllStates = asyncHandler(async (req, res, next) => {
  const engData = await JSON.parse(fs.readFileSync(ENG_FILE_PATH));
  const hindiData = await JSON.parse(fs.readFileSync(HINDI_FILE_PATH));
  var data = null;
  if (req.query.lang == 'hindi') {
    data = hindiData;
  } else if (req.query.lang == 'english' || req.query.lang == null) {
    data = engData;
  }
  if (!data) {
    return res.status(404).json({
      success: false,
      count: 0,
      data: data,
    });
  }
  const countData = await data.length;
  const date = await JSON.parse(fs.readFileSync(DATE_FILE_PATH));

  res.status(200).json({
    success: true,
    count: countData,
    lastUpdatedAt: date,
    data: data,
  });
});

//@desc GET data of particular state
//@route GET /api/v1/states/:statename
//@access Public
exports.getState = asyncHandler(async (req, res, next) => {
  const engData = await JSON.parse(fs.readFileSync(ENG_FILE_PATH));
  const hindiData = await JSON.parse(fs.readFileSync(HINDI_FILE_PATH));
  var stateData = null;
  if (req.query.lang == 'hindi') {
    await hindiData.forEach((element) => {
      if (element['searchName'] == req.params.name) {
        stateData = element;
      }
    });
  } else if (req.query.lang == 'english' || req.query.lang == null) {
    await engData.forEach((element) => {
      if (element['searchName'] == req.params.name) {
        stateData = element;
      }
    });
  }

  if (!stateData) {
    //if state not found
    return res.status(404).json({
      success: false,
      data: stateData,
    });
  }
  const date = await JSON.parse(fs.readFileSync(DATE_FILE_PATH));

  res.status(200).json({
    success: true,
    lastUpdatedAt: date,
    data: stateData,
  });
});
