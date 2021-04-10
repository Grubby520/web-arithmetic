"use strict";

/***
 * 初级版桶排序
 * O(2*(m + n)) -> O(M+N)
 * Question:
 * 1、需要提前知道需要准备多少个桶；
 * 2、浪费空间（[0,1,10000],对三个数排序，你需要10000个桶）；
 * 3、数组下标是整数，如果是负数和小数就行不通了；
 * 2、排序之后数据与原始数据丢失映射关系,比如分数最高的8分，对应的是e同学；
 */
function bucketSort(arr, max) {
  const result = [],
        tempArr = new Array(max).fill(0); // m(桶的个数)

  arr.forEach(item => tempArr[item] += 1); // n(需排序个数)

  tempArr.forEach((item, index) => {
    // m
    if (item) {
      result.push(...new Array(item).fill(index)); // n(最终要push n次)
    }
  });
  return result;
}

const array = [5, 3, 5, 2, 8];
const result = bucketSort(array, 10);
console.log(result); // 实际场景可能是这样, 8对应的是e同学

const arr = [{
  name: 'a',
  count: 5
}, {
  name: 'b',
  count: 3
}, {
  name: 'c',
  count: 5
}, {
  name: 'd',
  count: 2
}, {
  name: 'e',
  count: 8
}];