// 当前的这个版本并不能实现then队列调度，同一个实例调度一次then方法只能使用最新的then传递的回调，之前的会丢失
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class MYPromise {
  constructor() {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 在调度resolve的时候必须是pending状态才可以变成fulfilled
        // 状态的迁移是同步的
        this.status = PROMISE_STATUS_FULFILLED;
        // 按照ECMAScript标准，回调应该放到微任务队列中执行
        queueMicrotask(() => {
          this.value = value;
          console.log("调用了resolve");
          // 执行then方法传进来的第一个函数
          this.onFulfilled(this.value);
        });
      }
      const reject = (reason) => {
        if (this.status === PROMISE_STATUS_PENDING) {
          this.status = PROMISE_STATUS_REJECTED;
          queueMicrotask(() => {
            this.reason = reason;
            console.log("调用了reject");
            // 执行this传进来的第二个函数
            this.onRejected(this.reason);
          });
        }
      };
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
}
