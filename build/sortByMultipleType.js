"use strict";

function helpers(length = 1) {
  const result = [];

  while (length--) {
    const cI = Math.floor(Math.random() * colors.length);
    const sI = Math.floor(Math.random() * sizes.length);
    result.push([colors[cI], sizes[sI]]);
  }

  return result;
}

const colors = ['r', 'g', 'b'];
const sizes = ['xs', 'sm', 'md', 'lg'];
/**
 * 根据几种类型综合进行排序
 * @param {Array} array 
 * @returns {Array}
 * Question：
 * 1、没有自己实现sort，而是使用了Array.prototype.sort
 * 2、sort的复杂度是多少？ 最糟的情况 O(N2), 平均O(NlogN)
 */

function sortByMultipleType(array) {
  // 权重关系：colors > sizes
  array.sort(function (prev, next) {
    const cIPrev = colors.indexOf(prev[0]);
    const cINext = colors.indexOf(next[0]);

    if (cIPrev !== cINext) {
      return cIPrev - cINext; // 升序
    } else {
      const sIPrev = sizes.indexOf(prev[1]);
      const sINext = sizes.indexOf(next[1]);
      return sIPrev - sINext; // 升序
    }
  });
  return array;
}

const result = sortByMultipleType(helpers(100));
console.log(result);