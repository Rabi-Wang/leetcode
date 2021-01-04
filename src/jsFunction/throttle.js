function throttle(fn, delay) {
  let start = 0
  return () => {
    const end = new Date()
    if (end - start >= delay) {
      fn()
      start = end
    }
  }
}

module.exports = {
  throttle
}
