const mergeTwoLists = (l1, l2) => {
  if (!l2 && !l1) return l1
  let res = {}
  let tmp = res
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tmp.next = l1
      l1 = l1.next
    } else {
      tmp.next = l2
      l2 = l2.next
    }
    tmp = tmp.next
  }

  while (l1) {
    tmp.next = l1
    l1 = l1.next
    tmp = tmp.next
  }

  while (l2) {
    tmp.next = l2
    l2 = l2.next
    tmp = tmp.next
  }

  return res.next
}
