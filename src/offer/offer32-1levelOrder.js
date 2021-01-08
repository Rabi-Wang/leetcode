const levelOrder = (root) => {
  if (!root) return []
  let stack = []
  let res = []
  stack.push(root)

  while (stack.length) {
    const node = stack.shift()
    res.push(node.val)
    const left = node.left
    const right = node.right
    if (left) {
      stack.push(left)
    }
    if (right) {
      stack.push(right)
    }
  }

  return res
}
