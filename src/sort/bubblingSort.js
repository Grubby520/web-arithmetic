import { intArray, objArray } from "../util/helper";
/***
 * 冒泡排序
 * n + n-1 + n-2 + ... + 3 + 2 + 1
 * (n + 1) * n/2 -> (n2 + n) -> n2
 * O(N2)
 */
function bubblingSort(arr) {
  function recursiveFn(endPoint) {
    if (endPoint === 1) return;
    for (let i = 0; i < endPoint; i++) {
      // 每次遍历m次
      if (i + 1 < endPoint && arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
    recursiveFn(--endPoint); // 递归n次
  }
  recursiveFn(arr.length);
}

// const array = intArray(50);
// bubblingSort(array);
// console.log(array);

function bubblingSortPlus(arr) {
  function recursiveFn(endPoint) {
    if (endPoint === 1) return;
    for (let i = 0; i < endPoint; i++) {
      // 每次遍历m次
      if (i + 1 < endPoint && arr[i].num > arr[i + 1].num) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
    recursiveFn(--endPoint); // 递归n次
  }
  recursiveFn(arr.length);
}

const array1 = objArray(50);
bubblingSortPlus(array1);
console.log(array1);
