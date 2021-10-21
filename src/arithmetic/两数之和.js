/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  const bk= JSON.parse(JSON.stringify(nums)) // 拷贝
  nums = nums.sort((a, b) => a < b) // 假设实现了快排

  // 缩小查找范围
  // const getMaxIndex = (nums, target) => {
  const getRange = (start, end ) => {
    let middle = Math.round((start + end) / 2)
    // ending condition
    if (end - start <= 2) {
      return middle
    }
    if (nums[end] <= target) {
      return end
    }
    let value = nums[middle]
    if (value > target) {
      getRange(start, middle)
    } else if (value < target) {
      getRange(middle, end)
    } else {
      return middle
    }
  }
  const rIndex =  getRange(0, nums.length)
  // }

  // let rIndex = getMaxIndex(nums, target)
  console.log(rIndex)
  let lIndex = 0
  for (let i = rIndex; i <= 0; i--) {
    const rVal = nums[rIndex]
    const lVal = nums[lIndex]
    const _target = rVal + lVal
    while (_target <= target) {
      if (_target === target) {
        return [lVal, rVal]
      }
      lIndex++
    }
  }
};
// @lc code=end

const arr = []
let start = 1
while(start <= 100) {
  arr.push(start)
  start++
}

twoSum(arr, 67)

/**
 * 1,2,3...100
target 41

step 1：

[0, 99]
middle-50 value=51
condition: 51 > 41 
值更大，[start, middle]

step 2:
[0, 50]
middle-25 value=27
conditon: 27 < 41
值更小，[middle, end]

step 3:
[25, 50]
middle-38 value=39
39 < 41
值更小，[middle, end]

step 4：
[38, 50]
middle-44 value=45
45 > 41
值更大 [38, 45]


middle-42
43 > 41
[38 ,43]
39, 40, 41, 42, 43, 44



middle 41
42 > 41
[38 ,41]
39, 40, 41, 42,

middle 40
41 > 40.5
[38, 40]
39, 40, 41,


缩小查找范围 [0, 39]

ending condition: left <= target <= right, 类似于插入排序，找到一个位置，前一个小于等于target，后一个大于等于target




 */