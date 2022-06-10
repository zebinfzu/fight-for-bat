const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";
class MYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 当前还没有实现then方法，因此resolve和reject也是同步的
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        console.log("resolve被调用");
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_REJECTED) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        console.log("reject被调用");
      }
    };
    executor(resolve, reject);
  }
}
const promise = new MYPromise((resolve, reject) => {
  console.log("pending状态");
  resolve(1111);
  reject(2222);
});
console.log("证明目前的resolve是同步的");
