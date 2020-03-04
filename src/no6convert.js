function convert(s, numRows) {
    if (s.length <= numRows || numRows === 1) return s
    let matrix = []
    matrix[0] = []
    let row = 0, col = 0
    let res = ''
    let isReserve = false
    for (let sub of s) {
        matrix[row] = matrix[row] || []
        matrix[row][col] = sub
        if (isReserve) {
            row--
            col++
        } else {
            row++
        }
        if (row === 0) isReserve = !isReserve
        if ((row + 1) % numRows === 0) isReserve = !isReserve
    }
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let temp = matrix[i][j] || ''
            res += temp
        }
    }
    return res
}

console.log(convert('ABCD', 3) )
