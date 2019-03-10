/* eslint-disable prefer-destructuring */
require('newrelic');

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const reqMethods = require('../database/index.js');

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3008;

app.use(express.static(`${__dirname}/../client/dist`));


// //////////////////// ******* routes ******** ///////////////////

// /// gets

app.get('/api/product/:id/reviews_all', (req, res) => {
  const id = req.params.id;
  reqMethods.grabAllReviews(id, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.get('/api/product/:id/summary_engagements', (req, res) => {
  const id = req.params.id;
  reqMethods.grabSummaryEngagements(id, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.get('/api/product/:id/pictures', (req, res) => {
  const id = req.params.id;
  reqMethods.grabPicsByReview(id, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.get('/api/product/:id/reviews_top8/recent', (req, res) => {
  const id = req.params.id;
  reqMethods.grabTop8ReviewsRecent(id, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.get('/api/product/:id/reviews_top8/rating', (req, res) => {
  const id = req.params.id;
  reqMethods.grabTop8ReviewsRating(id, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

// /// posts

app.post('/api/product/:id/savereview', (req, res) => {
  const id = req.params.id;
  reqMethods.postReview(id, req.body, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.post('/api/product/:pid/savecomment/:rid', (req, res) => {
  const pid = req.params.pid;
  const rid = req.params.rid;
  reqMethods.postComment(pid, rid, req.body, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

app.post('/api/product/:pid/editreview/:rid', (req, res) => {
  const pid = req.params.pid;
  const rid = req.params.rid;
  reqMethods.editReview(pid, rid, req.body, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

// /api/product/{product-id-number}/helpful_flag/review/{review-id-number}

app.post('/api/product/:pid/helpful_flag/review/:rid', (req, res) => {
  const pid = req.params.pid;
  const rid = req.params.rid;
  reqMethods.addHelpfulReview(pid, rid, req.body, (err, dat) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200).send(dat);
  });
});

// /api/product/{product-id-number}/helpful_flag/comment/{review-id-number}/{comment-id-number}

// ///////////////////////////////////////////////////

// the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => console.log(`Now listening on port ${port}!`));
