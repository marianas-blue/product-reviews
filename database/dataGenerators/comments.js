const faker = require('faker');
const fs = require('file-system');
const drain = require('./drainer.js');

const schema = 'comments';
let review_id = 1;
let comment_id = 1;

const getDataForComments = () => {
  let data = [];
  if (Math.floor((Math.random() * 100) + 1) === 100) {
    const userName = JSON.stringify(faker.name.firstName() + " " + faker.name.lastName());
    const comment = JSON.stringify(faker.lorem.sentence());
    const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
    data.push([comment_id, review_id, userName, comment, timestamp]);
    comment_id++;
  }
  review_id++;
  return data;
};


const file = fs.createWriteStream(`dummydata_${schema}.csv`, { flag: 'a' });
drain.lotsOfData(file, getDataForComments, process.argv.slice(2)[0]);
console.log(`${schema} table is building...`);
