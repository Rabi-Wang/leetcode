const getKthFromEnd = (head, k) => {
  let count = 1
  let kHead = head

  while (count <= k) {
    kHead = kHead.next
    count++
  }

  while (head && kHead) {
    head = head.next
    kHead = kHead.next
  }

  return head
}
