const faker = require('faker');
const fs = require('file-system');
const drain = require('./drainer.js');

const schema = 'engagements_helpful';
let review_id = 1;
let engagement_id = 1;


const getDataForEngagmentsHelpful = () => {
  let data = [];
  if (Math.floor((Math.random() * 10) + 1) === 10) {
    const n = Math.floor((Math.random() * 10) + 1);
    for (var k = 0; k < n; k++) {
      const userName = JSON.stringify(faker.name.firstName() + " " + faker.name.lastName()) ;
      const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
      data.push([engagement_id, review_id, userName, timestamp]);
      engagement_id++;
    }
  }
  review_id++;
  return data;
};

const file = fs.createWriteStream(`dummydata_${schema}.csv`, { flag: 'a' });
drain.lotsOfData(file, getDataForEngagmentsHelpful, process.argv.slice(2)[0]);
console.log(`${schema} table is building...`);
