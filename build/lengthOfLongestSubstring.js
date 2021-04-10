"use strict";

/** 2021.4.8
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
 * @param {String | Number} string 
 * @returns {String}
 */
function lengthOfLongestSubstring(string) {
  // console.log(string)
  const length = string.length;
  let substring = '',
      // substringArr = [],
  maxSubstring = '';

  for (let i = 0; i < length; i++) {
    const cur = string[i];

    if (i === 0) {
      substring = maxSubstring = cur;
    } else {
      if (substring.indexOf(cur) !== -1) {
        // substringArr.push(substring)
        if (substring.length > maxSubstring.length) {
          maxSubstring = substring;
        }

        substring = substring.split(cur)[1]; // 截取不重复后的后半部分，继续遍历
      }

      substring += cur; // 获取遍历结束的值

      if (i === length - 1) {
        // substringArr.push(substring)
        if (substring.length > maxSubstring.length) {
          maxSubstring = substring;
        }
      }
    }
  } // console.log(substringArr)


  return maxSubstring.length;
}

const str = Math.random().toString(30).substr(2);
const maxLen = lengthOfLongestSubstring(str);
console.log(maxLen);