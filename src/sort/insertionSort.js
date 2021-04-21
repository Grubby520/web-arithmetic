/**插入排序
 * 空间复杂度 O(1)
 * 时间复杂度 O(M2+m) -> 最坏O(N2) 平均O(NlogN)
 */

import { intArray, objArray } from "../util/helper";

function insertionSort(array, compareFn) {
  if (!compareFn || typeof compareFn !== "function") {
    compareFn = (x, y) => {
      return x - y;
    };
  }
  // 第一个基准值base，从第二个值target开始
  for (let i = 1; i < array.length; i++) {
    // m次
    /* 
    第二个值的左边是已完成排序的，从右向左遍历cur，
    1.cur>target,cur后移一位
    2.直到找到cur<=target，将target插入到cur的后面
    3.走到头都没找到，将插入到开头的位置
    */
    const target = array[i];
    let preIndex = i - 1;
    while (preIndex >= 0) {
      // 最坏的情况- 1+2+3...+m-2+m-1 -> m2/2 -> m2
      const cur = array[preIndex];
      const order = compareFn(cur, target);
      if (order > 0) {
        array[preIndex + 1] = cur; // 后移一位
        preIndex--;
      } else {
        break; // 可能找到了，也可能没找到
      }
    }
    array[preIndex + 1] = target; // 插入到最终的位置上 (最坏的情况，preIndex为-1)
  }
}

const array = intArray({ length: 10 });
insertionSort(array);

console.log(array);

const arr = objArray({ length: 10 });
insertionSort(arr, (a, b) => a.num - b.num); // 小到大
console.log(arr);

const arr1 = objArray({ length: 10 });
insertionSort(arr1, (a, b) => b.num - a.num); // 大到小
console.log(arr1);
