function lengthOfLongestSubstring(s) {
    if (s) {
        let count = 1
        let res = 1
        let history = []
        for(let i = 0; i < s.length; i++) {
            count = 1
            history = []
            for (let j = i ; j < s.length - 1; j++) {
                if (s[j + 1] !== s[i] && history.indexOf(s[j + 1]) === -1) {
                    count++
                    history.push(s[j + 1])
                } else {
                    break
                }
            }
            res = res > count ? res : count
        }
        return res
    }
    return 0
}
console.log(lengthOfLongestSubstring(''))