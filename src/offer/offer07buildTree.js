function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const buildTree = (preorder, inorder) => {
  if (!preorder.length) return null
  let map = new Map()
  inorder.map((item, index) => map.set(item, index))

  const build = (preLLen, preRLen, inLLen, inRLen) => {
    if (preLLen > preRLen) {
      return null
    }
    let node = preorder[preLLen]
    let root = new TreeNode(node)
    if (preLLen === preRLen) {
      return root
    } else {
      let index = map.get(node)
      let leftNodes = index - inLLen
      let rightNodes = inRLen - index
      root.left = build(
        preLLen + 1,
        preLLen + leftNodes,
        inLLen,
        index - 1,
      )
      root.right = build(
        preRLen - rightNodes + 1,
        preRLen,
        index + 1,
        inRLen,
      )
      return root
    }
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1)
}

console.log(buildTree(
  [3,9,20,15,7],
    [9,3,15,20,7]))
