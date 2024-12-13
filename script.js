class Node {
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

const insert = (root, key) => {
    if (root === null) return new Node(key)
    if (root.key === key) return root;
    if (key < root.key) root.left = insert(root.left, key);
    else if (key > root.key) root.right = insert(root.right, key);

    return root;
}

const inorder = (root) => {
    if (root !== null){
        inorder(root.left);
        console.log(root.key + " ");
        inorder(root.right)
    }
}

/*
Time complexity
The worst-case time complexity of insert operations is O(h) where h is the height of the binary search tree.
In the worst-case, we maay have to travel from the root to the deepest leaf node. the height of a skewed tree may become n and the time complexity of insertion operation may become O(n).
The Auxiliary sapce complexity of insertion into binary is O(1)
*/

let root = new Node(50);
root = insert(root, 30);
root = insert(root, 20);
root = insert(root, 40);
root = insert(root, 70);
root = insert(root, 60);
root = insert(root, 80);

inorder(root)