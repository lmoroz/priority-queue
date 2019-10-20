class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (this.left && this.right) return;
        if (!this.left) this.left = node;
        else this.right = node;
        node.parent = this;
    }

    removeChild(node) {
        if (this.left === node) this.left = null;
        else if (this.right === node) this.right = null;
        else throw new Error('the node is not in my childrens list');
        node.parent = null;
    }

    remove() {
        if (!this.parent) return;
        this.parent.removeChild(this);
    }

    swapWithParent() {
        if (!this.parent) return;

        const old_parent = this.parent;
        const parent_parent = this.parent.parent;

        const i_am_left = (this.parent.left && this.parent.left === this);
        const i_am_right = (this.parent.right && this.parent.right === this);
        const top_at_left = (parent_parent && parent_parent.left && parent_parent.left === this.parent);
        const top_at_right = (parent_parent && parent_parent.right && parent_parent.right === this.parent);

        const my_right = this.right;
        const my_left = this.left;

        if (top_at_left) parent_parent.left = this;
        if (top_at_right) parent_parent.right = this;

        if (i_am_right) {
            this.right = old_parent;
            this.left = this.right.left;
            if (this.left) this.left.parent = this;
        } else if (i_am_left) {
            this.left = old_parent;
            this.right = this.left.right;
            if (this.right) this.right.parent = this;
        }

        if (my_left) my_left.parent = old_parent;
        if (my_right) my_right.parent = old_parent;

        old_parent.parent = this;
        old_parent.left = my_left;
        old_parent.right = my_right;
        this.parent = parent_parent;

    }
}

module.exports = Node;
