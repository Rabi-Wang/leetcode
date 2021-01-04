var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Resolved"] = 1] = "Resolved";
    Status[Status["Rejected"] = 2] = "Rejected";
})(Status || (Status = {}));
var PromiseAplusTs = /** @class */ (function () {
    function PromiseAplusTs(excutor) {
        try {
            excutor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    PromiseAplusTs.prototype.resolve = function (val) {
        if (this.status === Status.Pending) {
            this.status = Status.Resolved;
            this.value = val;
            this.resolveCallbacks.forEach(function (fn) { return fn(); });
        }
    };
    PromiseAplusTs.prototype.reject = function (err) {
        if (this.status === Status.Pending) {
            this.status = Status.Rejected;
            this.value = err;
            this.rejectedCallbacks.forEach(function (fn) { return fn(); });
        }
    };
    PromiseAplusTs.prototype.resolvePromise = function (promise2, x, resolve, reject) {
        var _this = this;
        if (promise2 === x) {
            throw TypeError('Chaining cycle');
        }
        if (x && typeof x === 'object' || typeof x === 'function') {
            var used_1;
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (used_1)
                            return;
                        used_1 = true;
                        _this.resolvePromise(promise2, y, resolve, reject);
                    }, function (err) {
                        if (used_1)
                            return;
                        used_1 = true;
                        reject(err);
                    });
                }
                else {
                    if (used_1)
                        return;
                    used_1 = true;
                    resolve(x);
                }
            }
            catch (e) {
                if (used_1)
                    return;
                used_1 = true;
                reject(e);
            }
        }
        else
            resolve(x);
    };
    PromiseAplusTs.prototype.then = function (onResolved, onRejected) {
        var _this = this;
        var promise2 = new PromiseAplusTs(function (resolve, reject) {
            if (_this.status === Status.Pending) {
                _this.resolveCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onResolved(_this.value);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });
                _this.rejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.value);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });
            }
            else if (_this.status === Status.Resolved) {
                setTimeout(function () {
                    try {
                        var x = onResolved(_this.value);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            else if (_this.status === Status.Rejected) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.value);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        });
        return promise2;
    };
    PromiseAplusTs.resolve = function (param) {
        var _this = this;
        if (param instanceof PromiseAplusTs) {
            return param;
        }
        return new PromiseAplusTs((function (resolve, reject) {
            if (param && typeof param === 'object' && typeof param.then === 'function') {
                setTimeout(function () {
                    try {
                        param.then(resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            else {
                _this.resolve(param);
            }
        }));
    };
    PromiseAplusTs.reject = function (param) {
        return new PromiseAplusTs((function (resolve, reject) { return reject(param); }));
    };
    PromiseAplusTs.all = function (promises) {
        var result = [];
        return new PromiseAplusTs((function (resolve, reject) {
            if (0 === promises.length)
                resolve(result);
            else {
                promises.forEach(function (promise, index) {
                    PromiseAplusTs.resolve(promise).then(function (res) {
                        result[index] = res;
                        if (result.length === promises.length)
                            resolve(result);
                    }, function (err) { return reject(err); });
                });
            }
        }));
    };
    PromiseAplusTs.race = function (promises) {
        return new PromiseAplusTs(function (resolve, reject) {
            return promises.forEach(function (promise) {
                return PromiseAplusTs.resolve(promise).then(function (res) { return resolve(res); }, function (err) { return reject(err); });
            });
        });
    };
    PromiseAplusTs.prototype["catch"] = function (onRejected) {
        return this.then(null, onRejected);
    };
    PromiseAplusTs.prototype["finally"] = function (callback) {
        return this.then(function (res) { return PromiseAplusTs.resolve(callback(res)).then(function () { return res; }); }, function (err) { return PromiseAplusTs.resolve(err).then(function () { throw err; }); });
    };
    return PromiseAplusTs;
}());

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise
