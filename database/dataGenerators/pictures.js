const fs = require('file-system');
const drain = require('./drainer.js');

const schema = 'review_pictures';
let review_id = 1;
let picture_id = 1;


const getDataForReviewPictures = () => {
  let data = [];
  if (Math.floor((Math.random() * 10) + 1) === 10) {
    const n = Math.floor((Math.random() * 5) + 1);
    for (var k = 0; k < n; k++) {
      const picture_url = `https://s3.amazonaws.com/marianas-amazon/cat${k + 1}.jpg`;
      data.push([picture_id, review_id, picture_url]);
      picture_id++;
    }
  }
  review_id++;
  return data;
};

const file = fs.createWriteStream(`dummydata_${schema}.csv`, { flag: 'a' });
drain.lotsOfData(file, getDataForReviewPictures, process.argv.slice(2)[0]);
console.log(`${schema} table is building...`);