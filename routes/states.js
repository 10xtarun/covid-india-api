const express = require('express');

//import controllers
const { getAllStates, getState } = require('../controllers/states');

const router = express.Router();

//routing
router.route('/').get(getAllStates);

router.route('/:statename').get(getState);

module.exports = router;
