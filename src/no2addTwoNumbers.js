function ListNode(val) {
    this.val = val
    this.next = null
}

function addTwoNumbers(l1, l2) {
    let plus = 0
    let res = new ListNode(0)
    let tmp = res
    while(l1 !== null && l2 !== null) {
        let current = l1.val + l2.val + plus
        plus = current > 9 ? 1 : 0
        current = new ListNode(current % 10)
        tmp.next = current
        l1 = l1.next
        l2 = l2.next
        tmp = tmp.next
    }
    (function (l) {
        while (l !== null) {
            let current = l.val + plus
            plus = current > 9 ? 1 : 0
            current = new ListNode(current % 10)
            tmp.next = current
            tmp = tmp.next
            l = l.next
        }
    })(l1 || l2)
    if (plus > 0) {
        tmp.next = new ListNode(plus)
    }
    return res.next
}

function makeListNode(l) {
    let tmp = l
    for(let i = 0; i < 3; i++) {
        tmp.next = new ListNode(parseInt(Math.random()))
        tmp = tmp.next
    }
}

let l1 = new ListNode(5)
// makeListNode(l1)
// console.log(l1)
let l2 = new ListNode(5)
// makeListNode(l2)
// console.log(l2)
console.log(addTwoNumbers(l1, l2))