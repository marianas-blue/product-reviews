/* eslint-disable prefer-destructuring */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const grabProductPostGres = require('../database/index.js').grabProductPostGres;
const grabProductCassandra = require('../database/index.js').grabProductCassandra;

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3008;

// bundle
app.use(express.static(`${__dirname}/../client/dist`));

// ////////////////////added routes///////////////////

app.get('/api/productPostGres/:id', (req, res) => {
  const id = req.params.id;
  const startTime = Date.now();
  grabProductPostGres(id, (err, num) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(num);
    console.log('the time it took for PostGres was: ', (Date.now() - startTime));
  });
});

app.get('/api/productCassandra/:id', (req, res) => {
  const id = req.params.id;
  const startTime = Date.now();
  grabProductCassandra(id, (err, num) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(num);
    console.log('the time it took for Cassandra was: ', (Date.now() - startTime));
  });
});

// ///////////////////////////////////////////////////

// the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => console.log(`Now listening on port ${port}!`));
