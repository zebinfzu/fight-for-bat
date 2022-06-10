console.log(1);
setTimeout(function f1() {
  console.log(2);
  Promise.resolve()
    .then(function f2() {
      console.log(3);
      setTimeout(function f3() {
        console.log(4);
      });
    })
    .then(function f4() {
      console.log(5);
    });
}, 0);
console.log(6);
// 1 6 2 3 5 4
