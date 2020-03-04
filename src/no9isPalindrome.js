function isPalindrome(x) {
    if (x < 0) return false
    let tmpX = `${x}`
    let res = ''
    for (let i = tmpX.length - 1; i >= 0; i--) {
        res += tmpX[i]
    }
    return res == x
}

console.log(isPalindrome(-121))