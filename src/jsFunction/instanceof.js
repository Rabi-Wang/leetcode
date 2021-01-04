function instanceOf(obj1, obj2) {
  let con = obj1.__proto__
  let pro = obj2.prototype
  while (con) {
    if (pro === con) return true
    con = con.__proto__
  }
  return false
}

module.exports = {
  instanceOf
}
