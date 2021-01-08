const copyRandomList = (list) => {
  if (!list) return list

  let copyList = {}
  let map = new Map()
  let tmpCopyList = copyList

  while (list) {
    if (map.has(list)) {
      tmpCopyList.next = map.get(list)
    } else {
      tmpCopyList.next = new Node(list.val, null, null)
      map.set(list, tmpCopyList.next)
    }
    const random = list.random
    if (random) {
      if (map.has(random)) {
        tmpCopyList.next.random = map.get(random)
      } else {
        tmpCopyList.next.random = new Node(random.val, null, null)
        map.set(random, tmpCopyList.next.random)
      }
    }
    list = list.next
    tmpCopyList = tmpCopyList.next
  }

  return copyList.next
}


function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
};

const list = new Node(1, null, null)
list.next = new Node(2)
list.next.next = new Node(3)
list.next.random = list

console.log(copyRandomList(list))
