const spiralOrder = (matrix) => {
  if (matrix.length <= 0) return []
  let row = 0
  let rowLength = matrix.length - 1
  let col = 0
  let colLength = matrix[0].length - 1
  let res = []
  while (row < rowLength && col < colLength) {
    for (let j = col; j <= colLength; j++) {
      res.push(matrix[row][j])
    }
    for (let i = row + 1; i <= rowLength; i++) {
      res.push(matrix[i][colLength])
    }
    for (let j = colLength - 1; j >= col; j--) {
      res.push(matrix[rowLength][j])
    }
    for (let i = rowLength - 1; i > row; i-- ) {
      res.push(matrix[i][col])
    }
    col++
    row++
    rowLength--
    colLength--
  }
  if (row === rowLength) {
    for (let i = col; i <= colLength; i++) {
      res.push(matrix[row][i])
    }
  } else if (col === colLength) {
    for (let i = row; i <= rowLength; i++) {
      res.push(matrix[i][col])
    }
  }
  return res
}

let matrix = [
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25],
]

console.log(spiralOrder(matrix))
