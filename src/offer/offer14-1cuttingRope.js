const cuttingRope = (n) => {
  if (n === 2) return 1
  if (n === 3) return 2
  let count = Math.floor(n / 3)
  let tail = n % 3
  if (tail === 2) {
    return Math.pow(3, count) * 2
  } else if (tail === 1) {
    return Math.pow(3, count - 1) * 2 * 2
  } else {
    return Math.pow(3, count)
  }
}

console.log(cuttingRope(5))
