const isSymmetric = (root) => {
  let res = true
  if (!root) return true
  function judge(A, B) {
    if ((!B && A) || (!A && B)) {
      return false
    }
    if (!B && !A) {
      return true
    }
    if (A.val !== B.val) {
      return false
    }
    if (A.val === B.val) {
      return true
    }
  }

  function dfs(A, B) {
    if (!judge(A, B)) {
      res = false
      return
    }
    if (!A || !B) return;
    dfs(A.left, B.right)
    dfs(A.right, B.left)
  }

  dfs(root.left, root.right)
  return res
}

function TreeNode(v) {
  this.val = v
  this.left = this.right = null
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(2)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.right = new TreeNode(4)

console.log(isSymmetric(root))
