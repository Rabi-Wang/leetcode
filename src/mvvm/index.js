let data = {
  stage: 'gitChat',
  book: {
    title: 'frontend',
    author: ['Horo']
  }
}

const observe = (data) => {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
    return
  }

  Object.keys(data).forEach((key) => {
    let currentValue = data[key]

    if (typeof currentValue === 'object') {
      observe(currentValue)
      data[key] = new Proxy(currentValue, {
        set(target, property, value, receiver) {
          if (property !== 'length') {
            console.log(`setting ${key} value now, setting value is ${currentValue}`)
          }
          return Reflect.set(target, property, value, receiver)
        }
      })
    } else {
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
          console.log(`getting ${key} value now, getting value is ${currentValue}`)
          return currentValue
        },
        set(v) {
          currentValue = v
          console.log(`setting ${key} value now, setting value is ${currentValue}`)
        }
      })
    }
  })
}

observe(data)

data.book.author.push('test')
console.log(data.book.author)
