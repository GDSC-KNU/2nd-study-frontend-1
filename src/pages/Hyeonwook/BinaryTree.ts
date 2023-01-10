class Node {
  data: number;
  left: any;
  right: any;
  constructor(data: any) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: any;
  constructor(converted: any) {
    this.root = converted;
  }

  remove() {}

  add() {}

  print() {}
}

function convert(arr: any, i: any) {
  let root = null;

  if (i < arr.length) {
    root = new Node(arr[i]);
    root.left = convert(arr, 2 * i + 1);
    root.right = convert(arr, 2 * i + 2);
  }
  console.log(root);
  return root;
}

let arr = [1, 2, 3, 4, 5, 6, 7];
let converted = convert(arr, 0);

let BT = new BinaryTree(converted);

export { BinaryTree, convert };
