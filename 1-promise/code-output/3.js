setTimeout(function f1() {
  console.log(1);
});

new Promise(function f2(resolve) {
  resolve();
  console.log(2);
}).then(function f3() {
  console.log(3);
  Promise.resolve()
    .then(function f4() {
      console.log(4);
    })
    .then(function f5() {
      Promise.resolve().then(function f6() {
        console.log(5);
      });
    });
});

console.log(6);

// 2 6 3 4 5 1
// 同步代码最优先执行，因此先输出2 6
// 然后按顺序处理微任务队列，输出 3 4 5
// 清空当前的微任务队列最后执行宏任务输出1
