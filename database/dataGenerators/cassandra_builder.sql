CREATE KEYSPACE rvs
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

use rvs;

CREATE TABLE reviews(
   product_id int PRIMARY KEY,
   product_name text,
   product_category text,
   reviews text
   );

COPY rvs.reviews (product_id, product_name, product_category, reviews) 
FROM './dummydata_cassandra.csv' WITH DELIMITER = '|';

-- cqlsh -e "COPY rvs.reviews (product_id, product_name, product_category, reviews) FROM './dummydata_cassandra.csv' WITH HEADER = false and DELIMITER = '|' and MAXBATCHSIZE=200;"
