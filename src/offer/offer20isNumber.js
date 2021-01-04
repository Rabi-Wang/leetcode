function isNumber(s) {
  s = s.trim()
  if (s.length === 0) return false
  let res = Number(s)
  console.log(res)
  return !Number.isNaN(res)
}

// console.log(Number('1ee+1'))
console.log(isNumber(" "))
