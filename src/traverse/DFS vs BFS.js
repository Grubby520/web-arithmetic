/**
 * DFS: depth first search
 * BFS: breadth first search
 * 用途：走迷宫 。。。
 * 1st
 */

// 生成 tree 数据结构
function generateTreeData(depth = 4, breadth = 2) {
  let tree = [
    {
      name: 'root',
      children: []
    }
  ]

  function create(tree, depth) {
    if (--depth > 0) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i], name = item.name
        new Array(breadth).fill(1).forEach((val, index) => {
          item.children.push({ name: name + '-' + index, children: [] }) // 深拷贝
        })
        // item.children = new Array(breadth).fill({name: name + '-' + i, children: []}) // 浅拷贝引用问题
        create(item.children, depth, item.name)
      }
    }
  }
  create(tree, depth)
  return tree
}

let tree = generateTreeData()
console.log(tree)

/**
 * DFS 深度优先遍历
 * 特点：
 * 1.递归下去
 * 2.回溯上来
 * 按预定的规则（比如：二叉树，有左走左，否则才走右）先一条路走到底；
 * 如果没成功，再回退到上一步，继续走没有走的路；
 * 如此反正，直到成功。
 * 应用：
 * vue patch阶段，生成 vnode 的过程，就是一个DFS
 */

// coding...

/**
 * BFS 广度优先遍历
 * 特点：
 * 1.状态的选取和标记
 * 从起点触发，记录所有的岔路口，并标记走一步就可以达到的点；
 * 按一定规则：比如优先左，其次右的方向 选择下一步，记录分叉口，标记达到点的步数；
 * 重复上一步；
 * 最终，我们把所有可行的路径都找出来了。
 * 总结：
 * 可以看出是逐步求解的，反复的进入与退出，将当前的所有可行解都记录下来，然后逐个去查看。
 */

// coding

/**
 【总结】
  1.数据结构上的运用
  DFS用递归的形式，用到了栈结构，先进后出。
  BFS选取状态用队列的形式，先进先出。

  2.复杂度
  DFS的复杂度与BFS的复杂度大体一致，不同之处在于遍历的方式与对于问题的解决出发点不同，DFS适合目标明确，而BFS适合大范围的寻找。

  3.思想
  思想上来说这两种方法都是穷竭列举所有的情况。
 */
