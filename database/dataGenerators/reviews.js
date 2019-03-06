const faker = require('faker');
const fs = require('file-system');
const drain = require('./drainer.js');

const schema = 'reviews';
let id = 1;
let review_id = 1


const getDataForReviews = () => {
  let randomTop = 0;
  if (id % 10 === 5) randomTop = 5;
  if (id % 10 === 6) randomTop = 8;
  if (id % 10 === 7) randomTop = 13;
  if (id % 10 === 8) randomTop = 21;
  if (id % 10 === 9) randomTop = 34;
  const iter = Math.floor((Math.random() * randomTop));
  const data = [];
  for (let i = 0; i < iter; i++) {
    const stars = Math.floor((Math.random() * 5) + 1);
    const userName = JSON.stringify(faker.name.firstName() + " " + faker.name.lastName()) ;
    const headline = JSON.stringify(faker.lorem.sentence());
    const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
    const text = JSON.stringify(faker.lorem.paragraph());
    data.push([review_id, id, userName, headline, stars, timestamp, text]);
    review_id++;
  }
  id++;
  return data;
};
const file = fs.createWriteStream(`dummydata_${schema}.csv`, { flag: 'a' });
drain.lotsOfData(file, getDataForReviews, 10000000);
console.log(`${schema} table is building...`);
