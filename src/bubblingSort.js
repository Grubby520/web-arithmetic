import { intArray } from './util/helper'
/***
 * 冒泡排序
 * O(2*(m + n)) -> O(M+N)
 */
function bubblingSort(arr) {
    function recursiveFn(endPoint) {
        if (endPoint === 1) return
        for(let i = 0; i < endPoint; i++) {
            if (i+1 < endPoint && arr[i] > arr[i+1]) {
                const temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp
            }
        }
        recursiveFn(--endPoint)
    }
    recursiveFn(arr.length)
}

const array = intArray(50)
bubblingSort(array)
console.log(array)
