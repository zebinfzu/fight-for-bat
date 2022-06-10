// 这个版本实现then被同一个实例多次调用以及链式调用返回新Promise对象的效果
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

// 工具函数
function execFunctionWithCatchError(execFN, value, resolve, reject) {
  try {
    const result = execFN(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class MYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log("resolve被调用");
          // 执行onFulfilledFns队列
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log("reject被调用");
          // 执行onFulfilledFns队列
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    return new MYPromise((resolve, reject) => {
      // 这里使用了箭头函数，因此返回的是新的Promise实例但箭头函数里面的this还是当前实例的this
      // 状态已经确定，就立即调度
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      } else if (this.status === PROMISE_STATUS_REJECTED) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      } else {
        // 将回调压倒数组里面
        this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
        });
        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
        });
      }
    });
  }
}
