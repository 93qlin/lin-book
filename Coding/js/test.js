/* var arr = [
    {name: "张三", age: 12},
    {name: "李四", age: 13},
    {name: "王五", age: 14}
]

arr.sort(function(a, b) {
    if(a.age !== b.age ){
        return a.age > b.age ? 1 : -1 
    }
    return a.name > a.name ? 1 : a.name === a.name ? 0 : -1
}) */

/* //斐波那契数列就是从 0 和 1 开始后面的数都是前两个数之和:0，1, 1, 2, 3
function Fibonacci(n, ac1 = 0, ac2 = 1) {
    if(n <= 1) return ac2
    return Fibonacci(n - 1, ac2, ac1 + ac2)
} */


/*  求阶乘实现第一项为1，后一项是（前面所有项之和）*2
1，2，6，18
function num(n,sum = 0) {
    if(n == 1) return 1
    while(n > 1) {
        sum += 2 * num(n -1)
        n--
    }
    return  sum 
}

function sum(n) {
    if(n == 1) return 1
    if(n == 2) return 2
    return 3*sum(n-1) 
}

sum(n) = (sum(n-1) + sum(n-2) +++ ... sum(1))*2
sum(n-1) = (sum(n-2) + sum(n-3) +++ ... sum(1))*2
sum(n)  = 3*sum(n-1) */

/* 动态规划解决
function sum(n) {
    let val = [];
    for(let i =1; i<=n; i++){
        val[i] = 0
    }
    if( n == 1 ){
        return 1
    }
    else if( n == 2 ){
        return 2
    } else {
        val[0] = 1
        val[1] = 2
        for (let index = 2; index <= n; index++) {
            val[index] = 3[index-1]
        }
        return val[index] 
    }
} */

/* 查找之二分法
function binSearch(arr,data) {
    let left = 0;
    let right = arr.length-1;
    while (left <= right) {
        let cur = (left+right) >> 1;
        if(arr[cur] == data) {
            return cur;
        } else if (arr[cur] > data) {
            left  = ++cur
        } else {
            right  = --cur
        }
    } 
    return -1
} */

function BinarySearchTree(arr) {
    let root = null; // 根元素
    // 一个Node类来表示树中的每个节点
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    // 向树中插入一个节点
    this.insert = function(key) {
        // 1.创建用来表示新节点的Node类实例
        var newNode = new Node(key);
        if (root == null) {
            root = newNode;
        } else {
            insertNode(root,newNode);
        }
    };
    // 一个私有的辅助函数,将节点加在非根节点的其他位置
    var insertNode = function(parentNode,newNode) {
        if (newNode.key < parentNode.key) {
            if (parentNode.left == null) {
                parentNode.left = newNode;
            } else {
                insertNode(parentNode.left,newNode)
            }
        } else { // 右侧节点存储（比父节点）大（或者等于）的值
            if (parentNode.right == null) {
                parentNode.right = newNode;
            } else {
                insertNode(parentNode.right,newNode)
            }
        }
    };
    // 中序遍历
    this.inOrderTraverse = function (callBack) {
        inOrderTraverseNode(root, callBack);
    };
    var inOrderTraverseNode = function(node,callBack) {
        if(!!node) {
            inOrderTraverseNode(node.left, callBack);
            callBack(node.key);
            inOrderTraverseNode(node.right, callBack);
        }
    }
    // 查找最小值
    this.min = function() {
        return minNode(root)
    }
    var minNode = function (node) {
        if (node) {
            while(node && node.left){
                node = node.left
            }
            return node.key
        }
        return null
    }
    // 查找最小值
    this.max = function() {
        return maxNode(root)
    }
    var maxNode = function (node) {
        if (node) {
            while(node && node.right){
                node = node.right
            }
            return node.key
        }
        return null
    }
    // 广度优先（层次遍历）
    this.wideTraversal = function(callBack) {
        wideTraversalNode(callBack)
    }
    var wideTraversalNode = function(callBack,stackNode = [root], count = 0){
        let node = stackNode[count]
        if (node) {
            callBack(node.key)
            if (node.left) {
                stackNode.push(node.left)
            }
            if (node.right) {
                stackNode.push(node.right)
            }
            count ++;
            wideTraversalNode(callBack,stackNode,count)
        }
    };
    // 最难的：删除一个节点(关键是理解下面代码中所有返回node的作用)
    // 返回node的作用：当节点的值已经为null了，父节点指向它的指针也要接收到这个值(对应的父节点指针要赋予null值)，这也是我们要在函数中返回节点的值的原因。
    this.remove = function (key) {
        root = removeNode(root,key)
    };
    var removeNode = function(node, key) {
        if(node == null) {
            return null;
        }
        if(key < node.key){
            node.left = removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
            return node;
        } else { // 找到node
            // 第一种情况node是一个叶节点
            if (node.right == null && node.left == null) {
                node = null
                return node;
            } 
            // 第二种情况node只有一个叶节点
            if (node.left == null) {
                node = node.right
                return node
                
            } else if(node.right == null){
                node = node.left
                return node
            }
            // 第三种node有两个子节点
            var minNode = findMinNode(node)
            node.key = minNode.key
            node.right = removeNode(node.right, minNode.key);
            return node

        }
    };
    var findMinNode = function (node) {
        while(node.left && node.key !== null) {
            node = node.left;
        }
        return node
    }

}
function printNode(val) {
    console.log(val);
}
var tree  = new BinarySearchTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(6);
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(8);
tree.insert(9);
tree.wideTraversal(printNode)
tree.remove(9)
tree.wideTraversal(printNode)
