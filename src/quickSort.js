import { intArray } from './util/helper'
/**
 * Array.prototype.sort
 * chrome采用的是快排（QuickSort）和插入排序（InsertionSort）
 * firefox采用的是递归排序（MergeSort）
 * 快排的具体实现
 * 1、不需要创建新的数组，仅改变原数组即可；
 * 2、基准点，右向左找到比基准值小，左向右找到比基准值大，交换；
 * 3、碰头，与基准值对比交换位置，分隔，递归；
 */
function quickSort(array) {
    function recursiveFn(l, r) {
        // console.log(l, r)
        if (l >= r) {
            return
        }
        const base = array[l] // 基数值
        let left = l,
            right = r
        while(left != right) {
            // 右向左
            while(array[right] >= base && left < right) {
                right--
            }
            // console.log(array[right]) // 找到一个小的
            // 左向右
            while(array[left] <= base && left < right) {
                left++
            }
            // console.log(array[left]) // 找到一个大的
            // 位置交换
            if (left < right) {
                const temp = array[left]
                array[left] = array[right]
                array[right] = temp
            }
        }
        // 碰头
        if (array[l] > array[left]) { // 相等呢？
            array[l] = array[left]
            array[left] = base
        }

        // 递归
        // if (l < left - 1 || left + 1 < r) {
        //     console.log(left)
        // }
        if (l < left - 1) { // 2个数及以上才对比
            recursiveFn(l, left - 1)
        }
        if (left + 1 < r) {
            recursiveFn(left + 1, r)
        }
    }
    recursiveFn(0, array.length - 1)
}

const array = intArray({length: 100})
console.log(JSON.stringify(array))
quickSort(array)
console.log(array)
