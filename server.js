const express = require('express');
//import middlewares
const { reqCounter, readStats } = require('./middleware/request-counter');

const app = express();

app.use(reqCounter);

app.get('/api/', (req, res) => {
  res.sendStatus(200);
});

app.get('/stats/', (req, res) => {
  res.json(readStats());
});

app.listen(5000, () => {
  console.log('App listening on port 5000!');
});
