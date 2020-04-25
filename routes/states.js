const express = require('express');

//import controllers
const { getAllStates } = require('../controllers/states');

const router = express.Router();

//routing
router.route('/').get(getAllStates);

module.exports = router;
