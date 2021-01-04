const findRepeatNumber = (nums) => {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return nums[i]
    } else {
      map.set(nums[i], 0)
    }
  }
}

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]))
