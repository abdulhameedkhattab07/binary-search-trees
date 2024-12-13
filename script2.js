class Node{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

function insert(root, key){
    const temp = new Node(key);
    if (root === null) return temp;
    let parent = null;
    let current = root;

    while(current !== null){
        parent = current;
        if (current.key > key) current = current.left;
        else if(current.key < key) current = current.right;
        else return root;

    }

    if (parent.key > key) parent.left = temp;
    else parent.right = temp;

    return root;
}

function inorder(root){
    if (root !== null){
        inorder(root.left);
        console.log(root.key + " ");
        inorder(root.right)
    }
}

/*

The time complexity of inorder traversal is O(n), as each node is visited once. The auxiliary space is O(n), as we use a stack to store nodes for recursion.

*/

let root = new Node(50);
root = insert(root, 30);
root = insert(root, 20);
root = insert(root, 40);
root = insert(root, 70);
root = insert(root, 60);
root = insert(root, 80);

inorder(root)