const replaceSpace = (s) => {
  return s.replace(new RegExp(' ', 'g'), '%20')
}

console.log(replaceSpace('we are hacker'))
