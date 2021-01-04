const findNumberIn2DArray = (matrix, target) => {
  return matrix.flat().includes(target)
}

console.log(findNumberIn2DArray([
  [1,   4,  7, ],
  [2,   5,  8, ],
  [3,   6,  9, ],
  [10, 13, 14, ],
  [18, 21, 23, ]
], 21))
