const fs = require('file-system');
const drain = require('./drainer.js');

const schema = 'products';
let id = 1;

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

const getDataForProducts = () => {
  let data = [];
  const productCategory = JSON.stringify(generateCategory(id));
  const productName = JSON.stringify(`Product ${id}`);
  data.push([id, productName, productCategory]);
  id++;
  return data;
};
const file = fs.createWriteStream(`dummydata_${schema}.csv`, { flag: 'a' });
drain.lotsOfData(file, getDataForProducts, 10000000);
console.log(`${schema} table is building...`);
