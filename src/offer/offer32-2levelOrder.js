const levelOrder = (root) => {
  if (!root) return []
  let stack = []
  let res = []
  stack.push(root)

  while (stack.length) {
    let cur = []
    let i =  0
    let length = stack.length
    while (i < length) {
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
    res.push(cur)
  }

  return res
}
