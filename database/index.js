/* eslint-disable no-console */
/* eslint-disable camelcase */
const pg = require('pg');

// const conString = 'postgres://localhost:5432/marianas';
// const pgClient = new pg.Client(conString);
const pgPool = new pg.Pool({
  host: '52.90.84.64',
  user: 'postgres',
  password: 'hackreactor',
  port: 9999,
  database: 'marianas',
  max: 50,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
// pgClient.connect();

pgPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {

  grabAllReviews: (productid, callback) => {
    const queryString = 'select * from rvs.reviews r where r.product_id = $1::int;';
    pgPool.query(queryString, [productid], (error, res) => {
      if (error) {
        callback(error.stack);
      } else {
        callback(null, res.rows);
      }
    });
  },

  grabSummaryEngagements: (productid, callback) => {
    const queryString = 'select count(1) as review_count, sum(case when stars = 5 then 1 else 0 end) as stars_5, sum(case when stars = 4 then 1 else 0 end) as stars_4, sum(case when stars = 3 then 1 else 0 end) as stars_3, sum(case when stars = 2 then 1 else 0 end) as stars_2, sum(case when stars = 1 then 1 else 0 end) as stars_1, avg(stars) as stars_avg from rvs.reviews r join (select * from rvs.products where id = $1::int) p on (p.id = r.product_id);';
    pgPool.query(queryString, [productid], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res.rows);
    });
  },

  grabPicsByReview: (productid, callback) => {
    const queryString = 'select rp.review_id, rp.picture_url from rvs.products p join rvs.reviews r on (p.id = r.product_id) join rvs.review_pictures rp on (r.id = rp.review_id) where p.id = $1::int;';
    pgPool.query(queryString, [productid], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res.rows);
    });
  },

  grabTop8ReviewsRecent: (productid, callback) => {
    const queryString = 'select p.id, r.id, r.username as reviewer, r.headline as review_title, r.stars, r.time_of_review as created_at, r.review as review, count(distinct e.id) as helpful_counter from rvs.products p left join rvs.reviews r on (p.id = r.product_id) left join rvs.engagments_helpful e on (r.id = e.review_id) where p.id = $1::int group by p.id, r.id, r.username, r.headline, r.stars, r.time_of_review, r.review order by time_of_review desc limit 8;';
    pgPool.query(queryString, [productid], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res.rows);
    });
  },

  grabTop8ReviewsRating: (productid, body, callback) => {
    const queryString = 'select r.id, r.username as reviewer, r.headline as review_title, r.stars, r.time_of_review as created_at, r.review as review, count(distinct e.id) as helpful_counter from rvs.reviews r left join rvs.engagments_helpful e on (r.id = e.review_id) where r.product_id = $1::int group by r.id, r.username, r.headline, r.stars, r.time_of_review, r.review order by stars desc limit 8;';
    pgPool.query(queryString, [productid], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res.rows);
    });
  },

  // {"product_ratings":5,"review":"Totally a good thing. I like it!","review_title":"This thing is the best!","reviewer":"This guy","image":"https://s3.amazonaws.com/marianas-amazon/cat5.jpg", "time_of_review": 1543650500}
  postReview: (productid, body, callback) => {
    const queryString = 'INSERT INTO rvs.reviews (product_id, username, headline, stars, time_of_review, review) VALUES ($1::int, $2::text, $3::text, $4::int, $5::int, $6::text) RETURNING id;';
    pgPool.query(queryString, [
      productid,
      body.reviewer,
      body.review_title,
      body.product_ratings,
      body.time_of_review,
      body.review,
    ], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
      if (body.image !== undefined) {
        const queryString2 = 'insert into rvs.review_pictures (review_id, picture_url) values ($1::int, $2::text);';
        pgPool.query(queryString2, [res.rows[0].id, body.image], (err2, res2) => {
          if (err) {
            console.log(err2);
          }
          console.log(res2);
        });
      }
    });
  },

  // {"comment":"Totally a good thing. I like it!","commentor":"This guy","image":"https://s3.amazonaws.com/marianas-amazon/cat5.jpg", "time_of_comment": 1543650500}
  postComment: (productid, reviewid, body, callback) => {
    const queryString = 'INSERT INTO rvs.comments (review_id, username, comment, time_of_comment) VALUES ($1::int, $2::text, $3::text, $4::int)';
    pgPool.query(queryString, [
      reviewid,
      body.commentor,
      body.comment,
      body.time_of_comment,
    ], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
      if (body.image !== undefined) {
        const queryString2 = 'insert into rvs.review_pictures (review_id, picture_url) values ($1::int, $2::text);';
        pgPool.query(queryString2, [reviewid, body.image], (err2, res2) => {
          if (err) {
            console.log(err2);
          }
          console.log(res2);
        });
      }
    });
  },

  editReview: (productid, reviewid, body, callback) => {
    const queryString = 'UPDATE rvs.reviews SET username = $2::text, headline = $3::text, stars = $4::int, time_of_review = $5::int, review = $6::text WHERE id = $1::int;';
    pgPool.query(queryString, [
      reviewid,
      body.reviewer,
      body.review_title,
      body.product_ratings,
      body.time_of_review,
      body.review,
    ], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
      if (body.image !== undefined) {
        const queryString2 = 'UPDATE rvs.review_pictures SET picture_url = $2::text WHERE review_id = $1::int;';
        pgPool.query(queryString2, [reviewid, body.image], (err2, res2) => {
          if (err) {
            console.log(err2);
          }
          console.log(res2);
        });
      }
    });
  },
  // {"username":"turkey","time_of_event":12345}
  addHelpfulReview: (productid, reviewid, body, callback) => {
    const queryString = 'insert into rvs.engagments_helpful (review_id, username, time_of_event) values ($1::int, $2::text, $3::int);';
    pgPool.query(queryString, [
      reviewid,
      body.username,
      body.time_of_event,
    ], (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
    });
  },

};
