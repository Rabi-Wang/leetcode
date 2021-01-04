enum Status {
  Pending,
  Resolved,
  Rejected,
}

class PromiseAplusTs {
  public status: Status
  public value: any
  private resolveCallbacks: any[]
  private rejectedCallbacks: any[]
  constructor(excutor: (resolve, reject?) => void ) {
    try {
      excutor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  private resolve(val: any): void {
    if (this.status === Status.Pending) {
      this.status = Status.Resolved
      this.value = val
      this.resolveCallbacks.forEach(fn => fn())
    }
  }

  private reject(err: any): void {
    if (this.status === Status.Pending) {
      this.status = Status.Rejected
      this.value = err
      this.rejectedCallbacks.forEach(fn => fn())
    }
  }

  private resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw TypeError('Chaining cycle')
    }
    if (x && typeof x === 'object' || typeof x ==='function') {
      let used
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(x, y => {
            if (used) return
            used = true
            this.resolvePromise(promise2, y, resolve, reject)
          }, err => {
            if (used) return
            used = true
            reject(err)
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
    } else resolve(x)
  }

  public then(
    onResolved: (...args) => any,
    onRejected?: (...args) => any
  ): PromiseAplusTs {
    const promise2 = new PromiseAplusTs((resolve, reject) => {
      if (this.status === Status.Pending) {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.status === Status.Resolved) {
        setTimeout(() => {
          try {
            const x = onResolved(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.status === Status.Rejected) {
        setTimeout(() => {
          try {
            const x = onRejected(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }

  static resolve(param: any) {
    if (param instanceof PromiseAplusTs) {
      return param
    }
    return new PromiseAplusTs(((resolve, reject) => {
      if (param && typeof param === 'object' && typeof param.then === 'function') {
        setTimeout(() => {
          try {
            param.then(resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else {
        this.resolve(param)
      }
    }))
  }

  static reject(param: any) {
    return new PromiseAplusTs(((resolve, reject) => reject(param)))
  }

  static all(promises: any[]): PromiseAplusTs {
    let result: any[] = []
    return new PromiseAplusTs(((resolve, reject) => {
      if (0 === promises.length) resolve(result)
      else {
        promises.forEach((promise, index) => {
          PromiseAplusTs.resolve(promise).then(res => {
            result[index] = res
            if (result.length === promises.length) resolve(result)
          }, err => reject(err))
        })
      }
    }))
  }

  static race(promises: any[]): PromiseAplusTs {
    return new PromiseAplusTs((resolve, reject) =>
      promises.forEach(promise =>
        PromiseAplusTs.resolve(promise).then(res => resolve(res), err => reject(err))))
  }

  public catch(onRejected) {
    return this.then(null, onRejected)
  }

  public finally(callback) {
    return this.then(res => PromiseAplusTs.resolve(callback(res)).then(() => res),
      err => PromiseAplusTs.resolve(err).then(() => { throw err }))
  }
}
