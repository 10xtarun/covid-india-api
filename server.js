const express = require('express');

//custom files
const { requestWebPage } = require('./web-scrapper/scraper');

const app = express();

//calling the scrapper repeatedly to work fetch and update data

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
