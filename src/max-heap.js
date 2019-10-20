const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    push(data, priority) {
        const newNode = new Node(data, priority);
        this.insertNode(newNode);
        this.shiftNodeUp(newNode);
        this.length++;
    }

    pop() {
        if (this.isEmpty()) return;
        this.length--;
        const oldRoot = this.detachRoot();
        this.restoreRootFromLastInsertedNode(oldRoot);
        this.shiftNodeDown(this.root);
        return oldRoot.data;
    }

    detachRoot() {
        const oldRoot = this.root;
        if (this.parentNodes.indexOf(oldRoot) > -1) this.parentNodes.shift();
        this.root = null;
        return oldRoot;

    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.isEmpty()) return;
        const newRoot = this.parentNodes.pop();
        if (!this.parentNodes.length) {
            this.parentNodes.push(newRoot)
        } else if (newRoot.parent === detached) {
            this.parentNodes.unshift(newRoot)
        } else if (this.parentNodes.indexOf(newRoot.parent) < 0) {
            this.parentNodes.unshift(newRoot.parent)
        }

        newRoot.remove();
        if (detached.left && detached.left !== newRoot) newRoot.appendChild(detached.left);
        if (detached.right && detached.right !== newRoot) newRoot.appendChild(detached.right);
        this.root = newRoot;
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
        if (node.priority > node.parent.priority) {
            this.swapParentNodes(node, node.parent);
            node.swapWithParent();
            if (!node.parent) this.root = node;
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (!node || !node.left) return;
        const swapWith = (node.right && node.right.priority > node.left.priority && node.right.priority > node.priority)
                         ? node.right
                         : node.left;

        if (swapWith.priority > node.priority) {
            this.shiftNodeUp(swapWith);
            this.shiftNodeDown(node);
        }

    }

    swapParentNodes(bottomNode, topNode) {
        const nodeIndex = this.parentNodes.indexOf(bottomNode);
        const parentIndex = this.parentNodes.indexOf(topNode);
        if (nodeIndex > -1) this.parentNodes[nodeIndex] = topNode;
        if (parentIndex > -1) this.parentNodes[parentIndex] = bottomNode;
    }
}

module.exports = MaxHeap;
