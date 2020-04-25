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
