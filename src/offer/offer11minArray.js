const minArray = (numbers) => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      return numbers[i]
    }
  }

  return numbers[0] < numbers[numbers.length - 1] ? numbers[0] : numbers[numbers.length - 1]
}
