const offer13movingCount = (m, n, k) => {
  let visited = []

  function check(i, j) {
    const arr1 = `${i}`.split('')
    const arr2 = `${j}`.split('')
    let sum = 0
    arr1.forEach(arr => sum += Number(arr))
    arr2.forEach(arr => sum += Number(arr))

    return sum <= k
  }

  function dfs(row, col) {
    visited[row] = visited[row] || []
    let count = 0
    if (row < m && row >=0 && col < n && col >= 0 && !visited[row][col] && check(row, col)) {
      visited[row][col] = true
      count = 1 + dfs(row - 1, col) +
      dfs(row + 1, col) +
      dfs(row, col - 1) +
      dfs(row, col + 1)
    }
    return count
  }

  return  dfs(0, 0)
}

console.log(offer13movingCount(3, 2, 17))
