setTimeout(() => console.log(1), 0);
new Promise((resolve) => {
  resolve();
  console.log(2);
}).then(() => {
  console.log(3);
});
console.log(4);
// 2 4 3 1
// 1. Promise接收一个executor回调，该函数是同步的立刻被执行，因此输出2
// 2. console.log(4)是同步代码里面，因此输出4
// 3. Promise的then回调是一个微任务，会被添加到微任务队列里面，因此在executor中调度resolve(),微任务队列塞入了()=>{console.log(3)}等待当前同步代码执行完输出了3
// 4. setTimeout是宏任务，在当前微任务队列清空后执行，因此最后输出了1
