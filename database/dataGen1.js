const faker = require('faker');
const fs = require('file-system');

let schema;

function lotsOfData(file, getData, rowCount) {
  let i = rowCount;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      data = getData();
      if (i === 0) {
        data.forEach(function(val) {
          file.write(val.join(', ') + '\n');
        });
      } else {
        data.forEach(function(val) {
          ok = file.write(val.join(', ') + '\n');
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      file.once('drain', write);
    }
  }
};

// products data
schema = 'products';
var id = 1;
var getDataForProducts = () => {
  let data = [];
  const productCategory = JSON.stringify(faker.commerce.product());
  const productName = JSON.stringify(faker.commerce.productAdjective() + ' ' + faker.commerce.productAdjective() + ' ' + productCategory);
  data.push([id, productName, productCategory]);
  id++;
  return data;
};
var file = fs.createWriteStream(`dummydata_${schema}.csv`, {flag: "a"});
lotsOfData(file, getDataForProducts, 10000000)
console.log(`${schema} table is building...`);



// reviews data
schema = 'reviews';
var id = 1;
let review_id = 1
var getDataForReviews = () => {
  let randomTop;
  if (id % 10 === 0) randomTop = 0;
  if (id % 10 === 1) randomTop = 1;
  if (id % 10 === 2) randomTop = 1;
  if (id % 10 === 3) randomTop = 2;
  if (id % 10 === 4) randomTop = 3;
  if (id % 10 === 5) randomTop = 5;
  if (id % 10 === 6) randomTop = 8;
  if (id % 10 === 7) randomTop = 13;
  if (id % 10 === 8) randomTop = 21;
  if (id % 10 === 9) randomTop = 34;
  let iter = Math.floor((Math.random() * randomTop));
  let data = [];
  for (var i = 0; i < iter; i++) {
    const stars = Math.floor((Math.random() * 5) + 1);
    const userName = JSON.stringify(faker.name.firstName() + " " + faker.name.lastName()) ;
    const headline = JSON.stringify(faker.lorem.sentence());
    const timestamp = faker.date.past();
    const text = JSON.stringify(faker.lorem.paragraph());
    data.push([review_id, id, userName, headline, stars, timestamp, text]);
    review_id++;
  }
  id++;
  return data;
};
var file = fs.createWriteStream(`dummydata_${schema}.csv`, {flag: "a"});
lotsOfData(file, getDataForReviews, 10000000)
console.log(`${schema} table is building...`);



//comments data;

/*
count lines in the reviews file an use this count as the 3rd arg on line 110;
*/
schema = 'comments';

let review_id = 1
let comment_id = 1;

var getDataForComments = () => {
  let data = [];
  if (Math.floor((Math.random() * 100) + 1) === 100) {
    const userName = JSON.stringify(faker.name.firstName() + " " + faker.name.lastName()) ;
    const comment = JSON.stringify(faker.lorem.sentence());
    const timestamp = faker.date.past();
    data.push([comment_id, review_id, userName, comment, timestamp]);
    comment_id++;
  }
  review_id++;
  return data;
}

var file = fs.createWriteStream(`dummydata_${schema}.csv`, {flag: "a"});
lotsOfData(file, getDataForComments, 39508068)
console.log(`${schema} table is building...`);