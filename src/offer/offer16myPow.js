var myPow = function (x, n) {
  if (n === 0) return 1
  if (x === 1) return 1
  if (x === 0) return 0
  if (x === -1) {
    if (n % 2 === 0) return 1
    else return -1
  }

  let res = 1
  let count = 0
  let limit = Math.floor(Math.abs(n) / 2)

  while (count < limit) {
    res *= x
    count++
  }

  if (n % 2 === 0) {
    res *= res
  } else {
    res *= res
    res *= x
  }

  if (n > 0) {
    return res
  } else {
    return 1 / res
  }
}

// console.log(Math.pow(2, 31))
console.log(Math.pow(-2.00000, -56))
console.log(myPow(-2.00000, -56))
