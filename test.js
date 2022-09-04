let p = new Promise((resolve, reject) => {
  const a = 1 + 21;
  if (a === 2) {
    resolve("Success");
  } else {
    reject("Faild");
  }
});

p.then((message) => {
  console.log(`This process was a ${message}`);
}).catch((message) => {
  console.log(`This process was a ${message}`);
});
