const treeToDoublyList = (root) => {
  if (!root) return root
  let pre = null
  function dfs(node) {
    if (!node) {
      return
    }
    dfs(node.left)
    if (pre) {
      node.left = pre
      pre.right = node
    }
    pre = node
    dfs(node.right)
  }

  let left = null
  function getLeft(node) {
    if (!node) {
      left = pre
      return
    }
    pre = node
    getLeft(node.left)
  }

  let right = null
  function getRight(node) {
    if (!node) {
      right = pre
      return
    }
    pre = node
    getRight(node.right)
  }

  dfs(root)
  getLeft(root)
  getRight(root)
  right.right = left
  left.left = right
  return left
}
