
CREATE DATABASE IF NOT EXISTS marianas;
-- DROP SCHEMA rvs CASCADE;
-- CREATE SCHEMA rvs;

-- id, productName, productCategory
CREATE TABLE rvs.products(
id SERIAL primary key,
productName text,
productCategory text
);
-- psql -d marianas -c "\copy rvs.products FROM 'dummydata_products.csv' delimiter ',' csv;"

-- review_id, id, userName, headline, stars, timestamp, text
CREATE TABLE rvs.reviews(
id SERIAL primary key,
product_id INT,
username text,
headline text,
stars int,
time_of_review int,
review text,
FOREIGN KEY (product_id) REFERENCES rvs.products (id)
);
-- psql -d marianas -c "\copy rvs.reviews  FROM 'dummydata_reviews.csv' delimiter ',' csv;"

-- -- comment_id, review_id, userName, comment, timestamp
CREATE TABLE rvs.comments(
id SERIAL primary key,
review_id INT,
username text,
comment text,
time_of_comment int,
FOREIGN KEY (review_id) REFERENCES rvs.reviews (id)
);
-- psql -d marianas -c "\copy rvs.comments  FROM 'dummydata_comments.csv' delimiter ',' csv;"

-- -- engagement_id, review_id, userName, timestamp

CREATE TABLE rvs.engagments_helpful(
id SERIAL primary key,
review_id INT,
username text,
time_of_event int,
FOREIGN KEY (review_id) REFERENCES rvs.reviews (id)
);

-- psql -d marianas -c "\copy rvs.engagments_helpful  FROM 'dummydata_engagements_helpful.csv' delimiter ',' csv;"

CREATE TABLE rvs.review_pictures(
id SERIAL primary key,
review_id INT,
picture_url text,
FOREIGN KEY (review_id) REFERENCES rvs.reviews (id)
);

-- psql -d marianas -c "\copy rvs.review_pictures  FROM 'dummydata_review_pictures.csv' delimiter ',' csv;"