function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  let pre = head
  let cur = pre.next
  if (pre.val === val) {
    return pre.next
  }
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next
      return head
    }
    cur = cur.next
    pre = pre.next
  }
};

let root = new ListNode(4)
root.next = new ListNode(1)
root.next.next = new ListNode(5)
root.next.next.next = new ListNode(9)

console.log(deleteNode(root, 5))
