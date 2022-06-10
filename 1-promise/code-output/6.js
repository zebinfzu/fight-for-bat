// async 本身就是一个Promise的语法糖
// async 将函数声明成异步的
// function 本身内容任然是同步执行的
// 区别在于返回值将会是一个promise对象
// 当使用了await关键字，之后的内容就是在Promise的then当中执行，这个await就和executor中调度resolve一样，跟在后面的内容会被作为resolve的参数，如果是函数执行该函数将返回值作为resolve的参数
async function async1() {
  console.log("async1 start"); // 还是同步处理的
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
async1(); // 执行
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
// script start 同步代码最先执行
// async1 start 还是同步处理的，按照代码一行行执行的顺序输出
// async2 start 在async1中使用await async2() 会执行async2()等待其返回值
// async2 promise 这一行在executor里面，是同步的输出
// promise1 这行还是同步代码，一样按代码执行顺序一行行执行
// script end 同步的代码
// promise2 微任务输出
// promise3 微任务输出
// async1 end 微任务输出
// setTimeout 宏任务等待到当前的微任务队列清空之后结束
