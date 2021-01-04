var CQueue = function() {
  this.stack1 = []
  this.stack2 = []
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop())
  }
  const res = this.stack2.length ? this.stack2.pop() : -1
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop())
  }
  return res
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
