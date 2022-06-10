new Promise(function f1(resolve) {
  console.log(1);
  setTimeout(function f2() {
    console.log(2);
  });
  resolve(1);
}).then(function f3(res) {
  console.log(3);
});

setTimeout(function f4() {
  console.log(4);
});

console.log(5);

// 1 5 3 2 4
