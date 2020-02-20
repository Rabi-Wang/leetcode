function twoSum(nums, target) {
    let res = []
    nums.forEach((num, index) => {
        nums.forEach((n, i) => {
            if (index === i) return
            if (n + num === target) res = [index, i]
        })
    })
    return res
}
let nums = [2, 7, 4, 6, 11, 15], target = 8
console.log(twoSum(nums, target))

function twoSumMap(nums, target) {
    let map = new Map()
    let res = []
    nums.forEach((num, index) => {
        let tmp = target - num
        if(map.has(tmp)){
            res = [index, map.get(tmp)]
            return
        } else {
            map.set(num, index)
        }
    })
    return res
}
console.log(twoSumMap(nums, target))