function debounce(fn, delay) {
  debugger
  let timer
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

module.exports = {
  debounce
}
