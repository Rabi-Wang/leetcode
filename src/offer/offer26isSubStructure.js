const isSubStructure = (A, B) => {
  if (!A || !B) return false

  function judge(A, B) {
    if (!B) {
      return true
    }
    if (!A) {
      return false
    }
    if (A.val !== B.val) {
      return false
    }
    return judge(A.left, B.left) && judge(A.right, B.right)
  }

  function dfs (A, B) {
    if (!B) {
      return false
    }
    if (!A) {
      return false
    }
    if (judge(A, B)) {
      return true
    }
    return dfs(A.left, B) || dfs(A.right, B)
  }

  return dfs(A, B)
}
