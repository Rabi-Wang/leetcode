const levelOrder = (root) => {
  if (!root) return []
  let res = []
  let stack = []
  let count = 0
  stack.push(root)

  while (stack.length) {
    let cur = []
    let i = 0
    let len = stack.length
    while (i < len) {
      const node = stack.shift()
      cur.push(node.val)
      const left = node.left
      const right = node.right
      if (left) {
        stack.push(left)
      }
      if (right) {
        stack.push(right)
      }
      i++
    }
    if (count % 2 === 1) {
      cur = cur.reverse()
    }
    res.push(cur)
    count++
  }
  return res
}
