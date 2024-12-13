// Factory const to create a Node
const Node = (data, left = null, right = null) => {
    return { data, left, right };
};

const Tree = (array) => {
    // Build a tree object with a root property
    const root = buildTree([...new Set(array)].sort((a, b) => a - b));

    function buildTree(array) {
        // Base case: if the array is empty, return null
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const rootNode = Node(array[mid]);

        // Recursively build the left and right subtrees
        rootNode.left = buildTree(array.slice(0, mid));
        rootNode.right = buildTree(array.slice(mid + 1));

        return rootNode;
    }


    const insert = (value, node = root) => {
        // Base case: if the node is null, create a new node
        if (node === null) return Node(value);

        // If the value is less, move to the left subtree
        if (value < node.data) {
            node.left = insert(value, node.left);
        }

        // If the value is greater, move to the right subtree
        else if (value > node.data) {
            node.right = insert(value, node.right);
        }

        return node; // Return the node after insertion
    }

    const deleteItem = (value, node = root) => {
        // Base case: if the node is null, return null
        if (node === null) return null;

        // If the value is less, move to the left subtree
        if (value < node.data) {
            node.left = remove(value, node.left);
        }
        // If the value is greater, move to the right subtree
        else if (value > node.data) {
            node.right = remove(value, node.right);
        }
        // If the value matches the current node
        else {
            // Case 1: No children
            if (node.left === null && node.right === null) return null;

            // Case 2: One child
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Case 3: Two children
            const minValue = findMin(node.right).data;
            node.data = minValue;
            node.right = remove(minValue, node.right);
        }

        return node; // Return the node after deletion
    }

    const findMin = (node) => {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    const find = (value, node = root) => {
        if (node === null || node.data === value) return node;

        if (value < node.data) return find(value, node.left);
        return find(value, node.right);
    }

    // Level-order traversal
    const levelOrder = () => {
        if (!root) return [];
        const queue = [root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.data);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    // Inorder traversal
    const inorder = (node = root, result = []) => {
        if (node === null) return result;

        inorder(node.left, result);
        result.push(node.data);
        inorder(node.right, result);

        return result;
    }

    // Preorder traversal
    const preorder = (node = root, result = []) => {
        if (node === null) return result;

        result.push(node.data);
        preorder(node.left, result);
        preorder(node.right, result);

        return result;
    }

    // Postorder traversal
    const postorder = (node = root, result = []) => {
        if (node === null) return result;

        postorder(node.left, result);
        postorder(node.right, result);
        result.push(node.data);

        return result;
    }

    // Find the height of the tree
    const height = (node = root) => {
        if (node === null) return -1;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Find the depth of a node
    const depth = (value, node = root, currentDepth = 0) => {
        if (node === null) return -1; // Value not found
        if (node.data === value) return currentDepth;

        if (value < node.data) return depth(value, node.left, currentDepth + 1);
        return depth(value, node.right, currentDepth + 1);

    }

    // Return all tree methods for use
    // Pretty print the tree (for debugging purposes)
    function prettyPrint(node = root, prefix = "", isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    return {
        root,
        insert,
        deleteItem,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        prettyPrint,
    };
}

// Example Usage
const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
tree.prettyPrint();
tree.insert(9);
tree.prettyPrint();
console.log("Inorder:", tree.inorder());
console.log("Height:", tree.height());