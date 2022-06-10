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
// error 1: error 第一个Promise中调度了reject，then方法获取到参数输出
// ok 2 链式调用的新promise默认执行resolve
