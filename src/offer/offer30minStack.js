/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []
  this.minVal = Infinity
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x)
  this.minVal = Math.min(this.minVal, x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const val = this.stack.pop()
  if (val === this.minVal) {
    this.minVal = Infinity
    this.stack.forEach((v) => {
      this.minVal = Math.min(v, this.minVal)
    })
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  return this.minVal
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
