# 手写简单版符合 PromiseA+规范的 Promise

今天手写一个符合 promiseA+规范的 promise，这个知识点可能快被写烂了吧，但还是作为学习比较加深自己对 Promise 的理解。
先来了解 Promise 是什么，promise 的出现为了解决什么问题，最后我们根据 promiseA+自己手写实现一个 promise

## 一、Promise 是什么？

贴一段 MDN 的介绍
`Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值..... Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象。`
通俗点来说就是解决异步操作问题的一个类。
[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise](url)

## 二、Promise 的出现为了解决什么问题？

相信接触过异步操作的同学都经历过回调地狱，一个异步接着一个异步如下所示

```js
asyncFunc1(opt, (...args1) => {
  asyncFunc2(opt, (...args2) => {
    asyncFunc3(opt, (...args3) => {
      asyncFunc4(opt, (...args4) => {
        // some operation
      });
    });
  });
});
```

这样的代码不仅难以维护，可读性也差简直痛苦，Promise 的出现通过链式调用可以很大程度上解决回调地狱的问题，通过 Promise 可以写成这样

```
asyncFunc1('...“).then(res=> {
    return asyncFunc2(res);
}).then(res => {
    return asyncFunc3(res);
}).then(res => {
   return asyncFunc4(res);
}).then(res =>{
console.log(res)
})
```

这样的每一次的 then 的返回值都可以作为下一个的异步操作的参数，这样回调地狱的问题就轻易解决了。
本文对 Promise 的用法不多做介绍跟多的用法可看阮一峰老师的 es6 入门[http://es6.ruanyifeng.com/](url)

## 三、手写一个符合 PromiseA+规范的 Promise

开始写之前贴上 PromiseA+规范的链接 [http://www.ituring.com.cn/article/66566](url)
**1、首先 Promise 有三种状态等待(pending),
成功态(fulfilled,规范中称为执行态我认为解释为成功态或者完成态更好理解),
失败(rejected),并且只能为以上三种状态的其实一种，等待态可改变为成功态或者失败态，成功态有成功的值不能改变为其他任何状态，失败态有失败的值不能改变为其他任何状态。
2、Promise 接受一个函数作为参数文档中称为‘executor’翻译过来就是执行者说明在构造函数一调用的时候就被执行，这个 executor 函数有两个参数分别是 resolve,reject，当 executor 函数中的 resovle 函数被调用时状态改变为成功态(fulfiiled)，reject 函数被调用时状态就改变为失败态(rejected),当 executor 函数执行出错时就直接调用 reject 方法，因此我们要捕获 executor 函数执行时的异常。**

根据这两条我们写初始的代码

```js
class Promise {
  constructor(executor) {
    //状态
    this.status = 'pending';
    //失败的值
    this.reason = null;
    //成功的值
    this.value = null;

    let resolve = value => {
      if (this.status == 'pending') {
        this.status = 'fulfilled';
        this.value = value;
      }
    };
    let reject = reason => {
      if (this.status == 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    };
    //当调用构造函数时就调用executor函数并捕获异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}
```

**3、promiseA+规定必须要有一个 then 方法可以访问其成功或失败时候的返回值，then 方法接受两个参数分别为 onFulfilled 和 onRejectd，并且还规定了当两个参数不是函数时其值被忽略**
**4、当 onFulfilled 和 onRejected 是函数时，onFulfilled 函数只能被调用一次，在 promise 执行成功结束后，并将 promise 的返回值作为终值，onReject 函数只能被调用一次，当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因。**

根据这两条我们来写 then 的初始方法

```js
//then方法接受两个参数onFulfilled,onRejected
 then(onFulfilled, onRejected) {
     //如果非函数就直接返回值
     onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v
     // 错误的就直接抛错不在执行
     onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
     //成功后立即执行,并将其结果作为参数
     if (this.status == 'fulfilled') {
         onFulfilled(this.value)
     }
     // 失败后立即执行,并将其拒因作为参数
     if (this.status == 'rejected') {
         onRejected(this.reason)
     }
 }
}
```

**5、then 方法可以被同一个 promise 多次调用，如下所示
let p = new Promise()
p.then()
p.then()
当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调**

以上代码只能解决同步问题，所以当我们异步执行的时候我们要有两个队列(当多次调用的时候)在等待状态的时候分别存放成功和失败时候的回调，并在状态改变的时候依次取出来执行

在构造函数添加代码

```js
//成功回调存放
this.resolvedCallbacks = [];
//失败回调存放
this.rejectedCallbacks = [];
let resolve = value => {
  if (this.status == 'pending') {
    this.status = 'fulfilled';
    this.value = value;
    //依次取出回调执行
    this.resolvedCallbacks.map(cb => cb());
  }
};
let reject = reason => {
  if (this.status == 'pending') {
    this.status = 'rejected';
    this.reason = reason;
    //依次取出回调执行
    this.rejectedCallbacks.map(cb => cb());
  }
};
```

在 then 函数添加 pending 状态判断

```js
//当时等待状态时候存放失败或成功的回调
if (this.status == 'pending') {
  this.rejectedCallbacks.push(() => {
    onRejected(this.reason);
  });
  this.resolvedCallbacks.push(() => {
    onFulfilled(this.value);
  });
}
```

**6、规范规定 then 函数必须返回一个 promise 对象，因为我们知道规范中的 promise 是和链式调用的如 p.then().then()这样形式的调用用来解决回调地狱的问题，所以我们要返回一个 promise 对象可供链式调用，规范中称它为 promise2 `promise2 = promise1.then(onFulfilled, onRejected);`  
7、then 会有个返回值规范中称它为 x 并作为下一个 promise 的参数进行传递，
这个 x 值就是 onFulfilled 或者 onRejected 执行后的返回值，
并且这个 x 值需要做判断，判断的函数为 resolvePromise，
如果 x 是普通值就直接作为 promise2 的终值，如果 x 是 promise 就取得 x 的最终状态作为 promise2 的结果。 resolvePromise 有四个参数 promise2,x,resolve,reject,其中 resolve 和 reject 为 promise2 的。**

根据这两条得出以下代码

```js
 //then方法接受两个参数onFulfilled,onRejected
    then(onFulfilled, onRejected) {
        // 返回promise对象
        let promise2 = new Promise((resolve, reject) => {
            //如果非函数就直接返回值
            onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v
            // 错误的就直接抛错不在执行
            onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
            //成功后立即执行,并将其结果作为参数
            if (this.status == 'fulfilled') {
                //x 为onFufilled的值
                let x = onFulfilled(this.value)
                // 判断x的函数
                resolvePromise(promise2, x, resolve, reject)
            }
            // 失败后立即执行,并将其拒因作为参数
            if (this.status == 'rejected') {
                onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
            //当时等待状态时候存放失败或成功的回调
            if (this.status == 'pending') {
                this.rejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.resolvedCallbacks.push(() => {
                    onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
        })
        return promise2
    }
```

**8、resolvePromise 实现的功能主要就是判断 x 的值规范规定了以下几点 1.如果 x 指向同一对象就抛错，防止相互引用的情况出现，并且 x 不为空， 2.如果 x 是普通值就直接 resolve 3.如果 x 是函数或者对象(包括 promise)
.定义 then 并使得 then = x.then()----promiseA+原文‘Otherwise, if x is an object or function,Let then be x.then’，并捕获取 then 过程的异常如果出错就直接 reject()
.如果 then 是函数就调用 call 执行 this 为当前的 x,后面分别是成功和失败的回调，如果 then 非函数就直接 resolve
.并且成功和失败只能被调用一次，因此我们要定义一个 called 来标记是否已经执行过成功或失败的回调，如果成功的返回值仍然是 Promise 就递归调用 resovlePromise 函数**

根据这条我们来写 resovlePromise 函数

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x == promise2) {
    return new TypeError('Error');
  }
  let called = false; //定义标志，防止重复调用
  // x 不能为空，且为对象或者函数时，为普通值就直接resovle
  if (x != null && (typeof x == 'object' || typeof x == 'function')) {
    //定义then 并捕获异常
    try {
      let then = x.then();
      //如果then为函数，默认为promise对象就继续递归解析
      if (typeof then == 'function') {
        then.call(
          x,
          y => {
            //只允许被调用一次
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          err => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
```

好了这样我们就完成了一个符合规范的 Promise

附上 all,race,resolve,reject，catch,finlly 代码

```js
Promise.resolve = function(v) {
  return new Promise((resolve, reject) => {
    resolve(v);
  });
};
Promise.reject = function(err) {
  return new Promise((resolve, reject) => {
    resolve(err);
  });
};
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
Promise.all = function(promises) {
  let arr = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        addResult(i, data);
      }, reject);
    }
    function addResult(i, data) {
      if (index == arr.length) {
        resolve(arr);
      }
      index++;
      arr[i].push(data);
    }
  });
};
Promise.catch = function(errFn) {
  return this.then(null, errFn);
};
Promise.finally = function(fn) {
  this.then(
    () => {
      fn();
    },
    () => {
      fn();
    }
  );
  return this;
};
```

完整代码

```js

class Promise {
    constructor(executor) {
        //状态
        this.status = 'pending'
        //失败的值
        this.reason = null
        //成功的值
        this.value = null
        //成功回调存放
        this.resolvedCallbacks = []
        //失败回调存放
        this.rejectedCallbacks = []
        let resolve = (value) => {
            if (this.status == 'pending') {
                this.status = 'fulfilled'
                this.value = value
                //依次取出回调执行
                this.resolvedCallbacks.map(cb => cb())
            }
        }
        let reject = (reason) => {
            if (this.status == 'pending') {
                this.status = 'rejected'
                this.reason = reason
                //依次取出回调执行
                this.rejectedCallbacks.map(cb => cb())
            }
        }
        //当调用构造函数时就调用executor函数并捕获异常
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    //then方法接受两个参数onFulfilled,onRejected
    then(onFulfilled, onRejected) {
        // 返回promise对象
        let promise2 = new Promise((resolve, reject) => {
            //如果非函数就直接返回值
            onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v
            // 错误的就直接抛错不在执行
            onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
            //成功后立即执行,并将其结果作为参数
            if (this.status == 'fulfilled') {
                //x 为onFufilled的值
                let x = onFulfilled(this.value)
                // 判断x的函数
                resolvePromise(promise2, x, resolve, reject)
            }
            // 失败后立即执行,并将其拒因作为参数
            if (this.status == 'rejected') {
                onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
            //当时等待状态时候存放失败或成功的回调
            if (this.status == 'pending') {
                this.rejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.resolvedCallbacks.push(() => {
                    onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
        })
        return promise2
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x == promise2) {
        return new TypeError('Error')
    }
    let called = false //定义标志，防止重复调用
    // x 不能为空，且为对象或者函数时，为普通值就直接resovle
    if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        //定义then 并捕获异常
        try {
            let then = x.then()
            //如果then为函数，默认为promise对象就继续递归解析
            if (typeof then == 'function') {
                then.call(x, y => {
                    //只允许被调用一次
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
Promise.resolve = function (v) {
    return new Promise((resolve, reject) => {
        resolve(v)
    })
}
Promise.reject = function (err) {
    return new Promise((resolve, reject) => {
        reject(err)
    })
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then((resolve,reject));
        }
    })
}
Promise.all = function (promises) {
    let arr = []
    let index = 0;
   let resultarr =[];
   let count = 0;
   len asynclen = promises.length
    return new Promise((resolve, reject) => {
        for (let i = 0; i <asynclen ; i++) {
            promises[i].then((value) => {
                count++;
                resultarr.push(value);
               if(count==asynclen ){
                      resolve(resultarr)
                 }
            }, reject)
        }
    })
}
Promise.catch = function (errFn) {
    return this.then(null, errFn);
}
Promise.finally = function (fn) {
    this.then(() => {
        fn();
    }, () => {
        fn();
    });
    return this;
}

```
