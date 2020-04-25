const express = require('express');
const dotenv = require('dotenv');
//import Routers
const stateRouter = require('./routes/states');

//import middlewares
const { reqCounter } = require('./middleware/request-counter');

//initialize the express app
const app = express();

//mount the routers
app.use('/api/v1/states/', stateRouter);
app.use(reqCounter);

//load the PORT number
const PORT = process.env.PORT || 5000;

//server listener
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//for testing purpose export the app
module.exports = app;
