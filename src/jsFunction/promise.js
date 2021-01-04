const resolve = Symbol('resolve')
const reject = Symbol('reject')

class MyPromise {
  constructor(fn) {
    this.status = 'pending'
    this.resolveCallback = []
    this.rejectCallback = []
    this.val = ''
    this.error = ''
    try {
      fn(this[resolve].bind(this), this[reject].bind(this))
    } catch (e) {
      this[reject].call(this, fn)
    }
  }

  [resolve](val) {
    if (this.status === 'pending') {
      this.status = 'resolved'
      this.val = val
      this.resolveCallback.forEach(fn => fn())
    }
  }

  [reject](error) {
    if (this.status === 'pending') {
      this.status === 'rejected'
      this.error =error
      this.rejectCallback.forEach(fn => fn())
    }
  }

  then(resolved, rejected) {
    if (this.status === 'resolved') {
      return new MyPromise((resolve, reject) => {
        const val = resolved(this.val)
        resolve(val)
      })
    } else if (this.status === 'rejected') {
      return new MyPromise((resolve, reject) => {
        const err = rejected(this.error)
        reject(err)
      })
    } else {
      this.resolveCallback.push(() => setTimeout(resolved))
      this.rejectCallback.push(() => setTimeout(rejected))
    }
  }

  static resolve(v) {
    if (v instanceof MyPromise)
      return v
    return new MyPromise((resolve, reject) => {
      resolve(v)
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      const arr = [...promises]
      arr.forEach((item) => {
        MyPromise.resolve(item).then(data => resolve(data))
      })
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const arr = [...promises]
      let res = []
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then((data) => {
          res[index] = data
          if (res.length === arr.length) {
            console.log(res)
            resolve(res)
          }
        })
      })
    })
  }
}

let p = new MyPromise(r => r(100))
p.then((v) => console.log(v))

var promise1 = new MyPromise((resolve, reject) => {
  resolve(3);
})
var promise2 = 42;
var promise3 = new MyPromise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

MyPromise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values); //[3, 42, 'foo']
},(err)=>{
  console.log(err)
});

