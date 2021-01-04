const exchange = (nums) => {
  let odd = []
  let event = []
  nums.forEach((num) => {
    if (num % 2 === 0) {
      event.push(num)
    } else {
      odd.push(num)
    }
  })

  return [...odd, ...event]
}
