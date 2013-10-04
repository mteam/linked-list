var ObjectPool = require('object-pool');

function LinkedList() {
  this.pool = new ObjectPool(Node);
  this.next = null
  this.last = null;
}

LinkedList.prototype.append = function(value) {
  var node = this.pool.create(value);

  if (this.next == null) {
    this.next = this.last = node;
  } else {
    this.last.next = node;
    this.last = node;
  }
};

LinkedList.prototype.empty = function() {
  var node = this;
  
  while (node = node.next) {
    this.pool.free(node);
  }

  this.next = this.last = null;
};

LinkedList.prototype.each = function(fn, that) {
  var node = this;

  while (node = node.next) {
    fn.call(that, node.value);
  }
};

LinkedList.prototype.length = function() {
  var node = this;
  var count = 0;

  while (node = node.next) {
    count++;
  }

  return count;
};

function Node(value) {
  this.value = value;
  this.next = null;
}

module.exports = LinkedList;
