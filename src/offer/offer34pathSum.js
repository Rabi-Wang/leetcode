const pathSum = (root, sum) => {
  let res = []

  function dfs(node, curSum, cur) {
    if (!node) {
      return 0
    }
    cur.push(node.val)
    curSum += node.val
    let newSum = curSum + dfs(node.left, curSum, cur)
    if (newSum === sum && !node.left && !node.right) {
      res.push([...cur])
      cur.pop()
      return 0
    }
    newSum = curSum + dfs(node.right, curSum, cur)
    if (newSum === sum && !node.left && !node.right) {
      res.push([...cur])
      cur.pop()
      return 0
    }
    cur.pop()
    return 0
  }

  dfs(root, 0, [])

  return res
}
