function bind(_this, ...args) {
  const context = this
  return () => {
    const key = Symbol('bind-key')
    _this[key] = context
    const res = args ? _this[key](...args) : _this[key]
    delete _this[key]
    return res
  }
}

module.exports = {
  bind
}
