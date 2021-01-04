const exist = (board, word) => {
  if (board.length === 1 && board[0].length === 1) {
    return board[0][0] === word
  }
  let res = false
  let visited = []

  function dfs(row, col, index) {
    if (!word[index]) {
      return true
    }
    visited[row] = visited[row] || []
    if (row >= 0 && row < board.length && col >= 0 && col < board[0].length && word[index] === board[row][col] && !visited[row][col]) {
      visited[row][col] = true
      res = dfs(row - 1, col, index + 1) ||
        dfs(row + 1, col, index + 1) ||
        dfs(row, col - 1, index + 1) ||
        dfs(row, col + 1, index + 1)
      if (!res) {
        visited[row][col] = false
      }
    }
    return res
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(i, j, 0)) {
        return true
      }
    }
  }

  return res
}

console.log(exist([['a', 'a']], 'aa'))
