const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
        this.lastInsertedNode = null;
    }

    push(data, priority) {
        const newNode = new Node(data, priority);
        this.insertNode(newNode);
        this.shiftNodeUp(newNode);
        this.length++;
    }

    pop() {
        if (this.isEmpty()) return;
        const lastNode = this.parentNodes.pop();
        lastNode.remove();
        this.length--;
    }

    detachRoot() {

    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.isEmpty()) return;

    }

    size() {
        return this.length;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    insertNode(node) {
        this.parentNodes.push(node);
        if (!this.root) this.root = node;
        else this.parentNodes[0].appendChild(node);
        if (this.parentNodes[0].left && this.parentNodes[0].right)
            this.parentNodes.shift();

    }

    shiftNodeUp(node) {
        if (!node.parent || node === this.root) return;
        node.swapWithParent();
        //if (node.left && node.right && this.parentNodes.includes(node))
        //    this.parentNodes.splice(this.parentNodes.indexOf(node), 1);
        if (!node.parent) {
            this.root = node;
            //if (this.parentNodes.length) {
			//	const lastNode = this.parentNodes.pop();
			//	this.parentNodes = [];
			//}

        }
        else return shiftNodeUp(node);
    }

    shiftNodeDown(node) {

    }

    restoreParentNodes() {

	}
}

module.exports = MaxHeap;
