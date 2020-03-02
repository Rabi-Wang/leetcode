function findMedianSortedArrays(arr1, arr2) {
    let arr = [...arr1]
    arr2.forEach(item => {
        arr.push(item)
    })
    arr.sort((a, b) => {return a < b ? -1 : 1})
    let halfLength = parseInt(arr.length / 2)
    let res = arr.length % 2 === 0 ? (arr[halfLength] + arr[halfLength - 1]) / 2 : arr[halfLength]
    return res
}

let arr1 = [1, 2, 3, 4]
let arr2 = [2, 4, 6]

console.log(findMedianSortedArrays(arr1, arr2))