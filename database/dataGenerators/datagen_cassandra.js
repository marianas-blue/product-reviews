const fs = require('file-system');
const faker = require('faker');

const lotsOfData = (file, getData, rowCount) => {
  let i = rowCount;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = getData();
      if (i === 0) {
        data.forEach((val) => {
          file.write(val.join('|') + '\n');
        });
      } else {
        data.forEach((val) => {ok = file.write(val.join('|') + '\n');});
      }
    } while (i > 0 && ok);
    if (i > 0) {
      file.once('drain', write);
    }
  }
};

const generateCategory = (number) => {
  const categoryArr = [
    'electronics',
    'beauty',
    'outdoor',
    'wearables',
    'bath',
    'clothing',
    'board games',
    'food',
    'toys',
    'jewelery',
  ];
  return categoryArr[number % 10];
};

const getDataForReviewPictures = () => {
  let data = [];
  if (Math.floor((Math.random() * 10) + 1) === 10) {
    const n = Math.floor((Math.random() * 5) + 1);
    for (var k = 0; k < n; k++) {
      const picture_url = `https://s3.amazonaws.com/marianas-amazon/cat${k + 1}.jpg`;
      data.push({
        pic: picture_url,
      });
    }
  }
  return data;
};

const getDataForEngagmentsHelpful = () => {
  let data = [];
  if (Math.floor((Math.random() * 10) + 1) === 10) {
    const n = Math.floor((Math.random() * 10) + 1);
    for (var k = 0; k < n; k++) {
      const userName = faker.name.firstName() + " " + faker.name.lastName();
      const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
      data.push({
        user: userName,
        eventTime: timestamp,
      });
    }
  }
  return data;
};


const getDataForComments = () => {
  const data = [];
  if (Math.floor((Math.random() * 100) + 1) === 100) {
    const userName = faker.name.firstName() + " " + faker.name.lastName();
    const comment = faker.lorem.sentence();
    const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
    data.push({
      user: userName,
      body: comment,
      commentTime: timestamp,
    });
  }
  return data;
};

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
    const userName = faker.name.firstName() + " " + faker.name.lastName();
    const headline = faker.lorem.sentence();
    const timestamp = 1551533400 - Math.floor((Math.random() * 14947200) + 1);
    const text = faker.lorem.paragraph();
    const commentsArray = getDataForComments();
    const engagementsArray = getDataForEngagmentsHelpful();
    const pics = getDataForReviewPictures();
    data.push({
      productId: id,
      user: userName,
      head: headline,
      star: stars,
      reviewTime: timestamp,
      body: text,
      comments: commentsArray,
      engagements: engagementsArray,
      pictures: pics,
    });
  }
  return data;
};

const getDataForProducts = () => {
  const data = [];
  const productCategory = JSON.stringify(generateCategory(id));
  const productName = JSON.stringify(`Product ${id}`);
  data.push([id, productName, productCategory, JSON.stringify(getDataForReviews())]);
  id++;
  return data;
};

let id = 1;
const file = fs.createWriteStream(`dummydata_cassandra.csv`, { flag: 'a' });
lotsOfData(file, getDataForProducts, 10000000);
