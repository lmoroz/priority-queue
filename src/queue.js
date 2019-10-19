const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.size() >= this.maxSize) throw new Error('Queue out of size');
		this.heap.push(data,priority);
	}

	shift() {
		if(this.isEmpty()) throw new Error('Queue is empty');
		const node = this.heap.pop();
		return node;
	}

	size() {

	}

	isEmpty() {
		return !this.size();
	}
}

module.exports = PriorityQueue;
