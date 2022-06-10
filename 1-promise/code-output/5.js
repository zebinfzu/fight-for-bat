const pro = new Promise(function f1(resolve) {
  const innerpro = new Promise(function f2(resolve) {
    setTimeout(function f3() {
      resolve(1);
    }, 0);
    console.log(2);
    resolve(3);
  });
  innerpro.then(function f4(res) {
    console.log(res);
  });
  resolve(4);
  console.log(5);
});
pro.then(function f5(res) {
  console.log(res);
});
console.log(6);

// 2 5 6 3 4
