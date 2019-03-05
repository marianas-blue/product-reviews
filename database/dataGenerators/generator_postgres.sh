
# Data generation scripts

node products.js;

node reviews.js;

COUNT=$(tail -n 1 dummydata_reviews.csv | cut -d ',' -f1)

node comments.js ${COUNT}

node engagements.js ${COUNT}

node pictures.js ${COUNT}