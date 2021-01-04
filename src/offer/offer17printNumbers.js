const printNumbers = (n) => {
  let count = 0
  let limit = 1
  let res = []
  while (count < n) {
    limit = `${limit}`.concat('0')
    count++
  }

  count = 1
  while (count <= Number(limit) - 1) {
    res.push(count)
    count++
  }

  return res
}

console.log(printNumbers(3))
