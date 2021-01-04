const PENDING = 'pending'
const FULLFILLED = 'fullFilled'
const REJECTED = 'rejected'

class Promise {
  constructor(excutor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.resolveCallbacks = []
    this.rejectedCallbacks = []

    function resolve(value) {
      let self = this
      if (self.status === PENDING) {
        self.status = FULLFILLED
        self.value = value
        self.resolveCallbacks.forEach(fn => fn())
      }
    }

    function rejected(reason) {
      let self = this
      if (self.status === PENDING) {
        self.status = REJECTED
        self.reason = reason
        self.rejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      excutor(resolve.bind(this), rejected.bind(this))
    } catch (e) {
      rejected.call(this, e)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

    function resolvePromise(promise2, x, resolve, reject) {
      if (promise2 === x) {
        reject(new TypeError('Chaining cycle'))
      }
      if (x && typeof x === 'object' || typeof x === 'function') {
        let used
        try {
          let then = x.then
          if (typeof then === 'function') {
            then.call(x, y => {
              if (used) return
              used = true
              resolvePromise(promise2, y, resolve, reject)
            }, r => {
              if (used) return
              used = true
              reject(r)
            })
          } else {
            if (used) return
            used = true
            resolve(x)
          }
        } catch (e) {
          if (used) return
          used = true
          reject(e)
        }
      } else {
        resolve(x)
      }
    }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onResolved(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.status === FULLFILLED) {
        setTimeout(() => {
          try {
            let x = onResolved(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then(data => Promise.resolve(callback()).then(() => data),
      err => Promise.resolve(callback()).then(() => { throw err }))
  }

  static resolve(param) {
    if (param instanceof Promise) {
      return param
    }
    return new Promise((resolve, reject) => {
      if (param && typeof param === 'object' && typeof param.then === 'function') {
        setTimeout(() => {
          param.then(resolve, reject)
        })
      } else {
        resolve(param)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    const tmpPromises = Array.from(promises)
    return new Promise((resolve, reject) => {
      let result = []
      if (0 === tmpPromises.length) {
        resolve(result)
      } else {
        tmpPromises.forEach((promise, index) => Promise.resolve(promise).then(data => {
          result[index] = data
          if (result.length === tmpPromises.length) {
            resolve(result)
          }
        }, e => reject(e)))
      }
    })
  }

  static race(promises) {
    const tmpPromises = Array.from(promises)
    return new Promise((resolve, reject) => tmpPromises.forEach(promise =>
        Promise.resolve(promise).then(data => resolve(data), e => reject(e)))
    )
  }
}

var promise1 = new Promise((resolve, reject) => {
  resolve(3);
})
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values); //[3, 42, 'foo']
},(err)=>{
  console.log(err)
});
//
// var p = Promise.all([]); // will be immediately resolved
// var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
// console.log(p);
// console.log(p2)
// setTimeout(function(){
//   console.log('the stack is now empty');
//   console.log(p2);
// });

// Promise.race([
//   new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
//   undefined,
//   new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
// ]).then((data) => {
//   console.log('success ', data);
// }, (err) => {
//   console.log('err ',err);
// });
//
// Promise.race([
//   new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
//   new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
//   new Promise((resolve, reject) => { setTimeout(() => { reject(300) }, 100) })
// ]).then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// });

// let p = new Promise(r => r(100))
// p.then((v) => console.log(v)).finally(() => console.log(1))
//
// Promise.defer = Promise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// }

module.exports = Promise
