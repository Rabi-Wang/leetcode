function apply(_this, args) {
  const context = this
  const key = Symbol('apply-key')
  _this[key] = context
  const res = args ? _this[key](...args) : _this[key]()
  delete _this[key]
  return res
}

module.exports = {
  apply
}
