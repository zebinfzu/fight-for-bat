# Promise

> Promise 相关问题

1. 聊一聊 Promise 的原理
2. 使用 Promise 封装 Ajax
3. Promise.all、Promise.allSettled、Promise.race、Promise.any、Promise.resolve、Promise.reject 分别有什么用？
4. 手写 Promise.all、Promise.race、Promise.allSettled、Promise.any、Promise.resolve、Promise.reject
5. 并发请求限制数量手写代码
6. 手写代码实现 Promisify
7. 说一说宏任务微任务的处理方式
8. 手写一个 Promise

代码输出题

1. 代码输出什么

```javascript
setTimeout(() => console.log(1), 0);
new Promise((resolve) => {
  resolve();
  console.log(2);
}).then(() => {
  console.log(3);
});
console.log(4);
```

2. 输出什么

```javascript
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
```

3. 输出什么

```javascript
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
```

4. 输出什么

```javascript
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
```

5. 输出什么

```javascript
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
```

6. 输出什么

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 start");
  return new Promise((resolve, reject) => {
    resolve();
    console.log("async2 promise");
  });
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  });
console.log("script end");
```

7. 输出什么

```javascript
new Promise((resolve, reject) => {
  reject("error");
})
  .then(
    () => {
      console.log("ok 1");
    },
    (err) => {
      console.log("error 1: " + err);
    }
  )
  .then(
    () => {
      console.log("ok 2");
    },
    (err) => {
      console.log("error 2: " + err);
    }
  )
  .catch((err) => {
    console.log("catch 1: " + err);
  });
```
