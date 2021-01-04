function cuttingRope(n) {
  if (n === 2) return 1
  if (n === 3) return 2
  let count = Math.floor(n / 3)
  let tail = n % 3

  function deal(count) {
    let i = 0
    let res = 1
    while (i < count) {
      res *= 3
      res = res % 1000000007
      i++
    }
    return res
  }

  if (tail === 2) {
    return deal(count) * 2 % 1000000007
  } else if (tail === 1) {
    return deal(count - 1) * 2 * 2 % 1000000007
  } else {
    return deal(count) % 1000000007
  }
}

console.log(cuttingRope(120))
