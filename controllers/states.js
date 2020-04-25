const asyncHandler = require('../middleware/async');
const fs = require('fs');
const READ_FILE_PATH = 'data/allStates.json';

//@desc GET all states data
//@route GET /api/v1/states
//@access Public
exports.getAllStates = asyncHandler(async (req, res, next) => {
  const data = await JSON.parse(fs.readFileSync(READ_FILE_PATH));
  const countData = await data.length;

  res.status(200).json({
    success: true,
    count: countData,
    data: data,
  });
});

//@desc GET data of particular state
//@route GET /api/v1/states/:statename
//@access Public
exports.getState = asyncHandler(async (req, res, next) => {
  const data = await JSON.parse(fs.readFileSync(READ_FILE_PATH));
  var stateData = null;

  await data.forEach((element) => {
    if (element['searchName'] == req.params.statename) {
      stateData = element;
    }
  });

  if (!stateData) {
    //if state not found
    return res.status(404).json({
      success: false,
      data: stateData,
    });
  }

  res.status(200).json({
    success: true,
    data: stateData,
  });
});
