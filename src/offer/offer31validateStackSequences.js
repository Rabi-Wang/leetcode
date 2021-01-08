const validateStackSequences = (pushed, poped) => {
  if (pushed.length !== poped.length) return false
  let tmp = []
  let j = 0

  for (let i = 0; i < pushed.length; i++) {
    tmp.push(pushed[i])
    while (tmp.length && tmp[tmp.length - 1] === poped[j]) {
      tmp.pop()
      j++
    }
  }

  return tmp.length === 0
}

let pushed = [0,2,1], popped = [0,1,2]

console.log(validateStackSequences(pushed, popped))
