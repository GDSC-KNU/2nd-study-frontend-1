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

// class BinaryTree {
//   root;
//   constructor(converted: any) {
//     this.root = converted;
//   }

//   getRoot() {
//     return this.root;
//   }

//   dfs(node = this.root, values = []) {
//     if (node.left) {
//       this.dfs(node.left, values);
//     }
//     if (node.right) {
//       this.dfs(node.right, values);
//     }
//     return values;
//   }

//   remove() {}

//   set(converted: any) {
//     this.root = converted;
//   }

//   add(value: number) {
//     let newNode = new Node(value);
//     if (!this.root) {
//       this.root = newNode;
//       return;
//     }
//     let current = this.root;
//     while (true) {
//       if (value < current.value) {
//         if (!current.left) {
//           current.left = newNode;
//           return;
//         }
//         current = current.left;
//       } else {
//         if (!current.right) {
//           current.right = newNode;
//           return;
//         }
//         current = current.right;
//       }
//     }
//   }

//   print() {}

//   convert(arr: any, i: any) {
//     let root = null;

//     if (i < arr.length) {
//       root = new Node(arr[i]);
//       root.left = convert(arr, 2 * i + 1);
//       root.right = convert(arr, 2 * i + 2);
//     }
//     return root;
//   }
// }

function convert(arr: any, i: any) {
  let root = null;

  if (i < arr.length) {
    root = new Node(arr[i]);
    root.left = convert(arr, 2 * i + 1);
    root.right = convert(arr, 2 * i + 2);
  }
  return root;
}
export { convert };
