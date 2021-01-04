const reverseList = (head) => {
  if (!head) return head
  let re = {}
  let data = []

  while (head) {
    data.push(head.val)
    head = head.next
  }

  let i = data.length - 1
  let tmp = re
  while (i >= 0) {
    tmp.next = new ListNode(data[i--])
    tmp = tmp.next
  }

  return re.next
}
