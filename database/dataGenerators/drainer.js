
exports.lotsOfData = (file, getData, rowCount) => {
  let i = rowCount;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = getData();
      if (i === 0) {
        data.forEach((val) => {
          file.write(val.join(', ') + '\n');
        });
      } else {
        data.forEach((val) => {
          ok = file.write(val.join(', ') + '\n');
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      file.once('drain', write);
    }
  }
};
