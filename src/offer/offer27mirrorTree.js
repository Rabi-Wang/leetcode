const mirrorTree = (tree) => {
  if (!tree) return tree

  function dfs(node) {
    if (!node) return
    let tmp = node.left
    node.left = node.right
    node.right = tmp
    dfs(node.left)
    dfs(node.right)
  }

  return dfs(tree)
}
