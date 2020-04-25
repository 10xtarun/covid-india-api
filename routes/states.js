const express = require('express');

//import controllers
const { getAllStates, getState } = require('../controllers/states');

const router = express.Router();

//routing
//all states
//router.route('/states').get(getAllStates);

//all states in hindi
router.route('/states').get(getAllStates);

router.route('/state/:name').get(getState);

module.exports = router;
