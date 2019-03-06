/* eslint-disable no-console */
/* eslint-disable camelcase */
const pg = require('pg');
const cassandra = require('cassandra-driver');

const cassClient = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });

const conString = 'postgres://localhost:5432/marianas';
const pgClient = new pg.Client(conString);
pgClient.connect();

function grabProductPostGres(productid, callback) {
  pgClient.query('select r.review from rvs.reviews r join (select * from rvs.products where id = $1::int) p on (p.id = r.product_id);', [productid], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows);
  });
}

function grabProductCassandra(productid, callback) {
  cassClient.execute('select product_id, reviews from rvs.reviews where product_id = ?;', [productid], { prepare: true }, (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows);
  });
}
module.exports.grabProductPostGres = grabProductPostGres;
module.exports.grabProductCassandra = grabProductCassandra;
