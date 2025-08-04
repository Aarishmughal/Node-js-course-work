const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const writeFilePromise = (file, dataToWrite) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, dataToWrite, (err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};

/*
// Promise 01: Reading File
readFilePromise(`${__dirname}/dog.txt`)
  // Then 01
  .then((data) => {
    console.log(`${data}`);
    // Promise 02: Fetching Image
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  // Then 02
  .then((res) => {
    // Promise 03: Storing Image URL
    return writeFilePromise('dog-image.txt', res.body.message);
  })
  // Then 03
  .then((result) => {
    console.log(`Random ${result} Image Saved!`);
  })
  .catch((err) => {
    console.log(err);
  });
*/

// Async Await Version - Cleaner and Better
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(data);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((res) => res.body.message);
    console.log(images);

    await writeFilePromise('dog-image.txt', images.join('\n'));

    console.log(`Random ${data} Image Saved!`);
    
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2. Ready!';
};

// We are back to using Promises in Async and Await. Avoid it
/*
console.log('1. Getting Dog Pics');
getDogPic()
  .then((result) => {
    console.log(result);
    console.log('2. Done Getting Dog Pics!');
  })
  .catch((err) => {
    console.log(err);
  });
*/

(async () => {
  try {
    console.log('1. Getting Dog Pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3. Done Getting Dog Pics!');
  } catch (err) {
    console.log(err);
  }
})();
