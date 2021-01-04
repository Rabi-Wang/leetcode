function call(_this, ...args) {
  const context = this
  const key = Symbol('call-key')
  _this[key] = context
  const res = args ? _this[key](...args) : _this[key]()
  delete _this[key]
  return res
}

module.exports = {
  call
}
