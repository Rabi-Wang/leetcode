const isMatch = (s, p) => {
  let reg = new RegExp(p)
  let match = s.match(reg)
  return match ? match[0] === s : false
}

console.log(isMatch('aaa', '.*'))
