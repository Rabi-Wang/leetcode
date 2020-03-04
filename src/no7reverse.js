function reverse(x) {
    if (x === 0) return 0
    let isPlus = true
    if (x < 0) {
        isPlus = false
    }
    let num = Math.abs(x)
    let res = isPlus ? '' : '-'
    while (num !== 0) {
        let last = num % 10
        res += last
        num = parseInt(num / 10)
    }
    res = parseInt(res)
    return res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31) ? 0 : res
}

console.log(reverse(0))