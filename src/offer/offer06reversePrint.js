const reversePrint = (head) => {
  let res = []
  while (head) {
    res.push(head.val)
    head = head.next
  }

  return res.reverse()
}
