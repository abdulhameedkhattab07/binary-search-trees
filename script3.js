// delete
class Node{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// note that it is not a generic inorder successor function. it mainly works when the right child is not empty, which is the case we need in BST delete
function getSuccessor(current){
    current = current.right;
    while (current !== null && current.left !== null){
        current = current.left;
    }
    return current;
}

// this function deletes a given key from the given BST and returns the modified root of the BST if it is modified.
function delNode(root, key){
    // base case
    if (root === null) return root;
    
    // if key to be searched is in a subtree
    if(root.key > key) root.left = delNode(root.left, key);
    else if (root.key < key) root.right = delNode(root.right, key);
    else{
        // if root matches with the given key
        // cases when root has 0 children or only right child
        if (root.left === null) return root.right;
        // when root has only left child
        if (root.right === null) return root.left;
        // when both children are present
        let succ = getSuccessor(root);
        root.key = succ.key;
        root.right = delNode(root.right, succ.key);
    }
    return root;
}

function inorder(root){
    if (root !== null){
        inorder(root.left);
        console.log(root.key + " ");
        inorder(root.right)
    }
}

let root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
root.right.left = new Node(12);
root.right.right = new Node(18);
let x = 15;

root = delNode(root, x);
inorder(root);
console.log();