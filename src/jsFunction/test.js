const { apply } = require('./apply')
const { call } = require('./call')
const { bind } = require('./bind')
const { throttle } = require('./throttle')
const { debounce } = require('./debounce')
const { instanceOf } = require('./instanceof')

Function.prototype.myApply = apply
Function.prototype.myCall = call
Function.prototype.myBind = bind

var person = {
  fullName: function(...args) {
    console.log(args)
    return this.firstName + " " + this.lastName;
  }
}
var person1 = {
  firstName: "Bill",
  lastName: "Gates",
}

function Person() {

}

console.log(person.fullName.myApply(person1, [1, 2, 3]))
console.log(person.fullName.myCall(person1, 1, 2, 3))
console.log(person.fullName.myBind(person1, 1, 2, 3)())

console.log(person.fullName instanceof Function)
console.log(person.fullName instanceof Person)
console.log(instanceOf(person.fullName, Function))
console.log(instanceOf(person.fullName, Person))
