function subsetsWithDup(nums) {
    let res = []
    nums.sort((a, b) => a - b)
    console.log(nums)
    function selectPath(start, pathSelected) {
        res.push([...pathSelected])
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue
            }
            pathSelected.push(nums[i])
            selectPath(i + 1, pathSelected)
            pathSelected.pop()
        }
    }
    selectPath(0, [])
    return res
}

console.log(subsetsWithDup([4,4,4,1,4]))
