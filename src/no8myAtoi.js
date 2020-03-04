function myAtoi(str) {
    if (str.length === 0) return 0
    let res = parseInt(str)
    if (res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1
    if (res < -Math.pow(2, 31)) return -Math.pow(2, 31)
    if (Number.isNaN(res)) return 0
    return res
}

console.log(myAtoi('-91283472332'))