const hammingWeight = (n) => {
  let count = 0

  while (n) {
    let tail = n % 2
    n = Math.floor(n / 2)
    if (tail === 1) {
      count++
    }
  }

  return count
}

console.log(hammingWeight(3))
