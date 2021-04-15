import { intArray } from "../util/helper";

const array = intArray({ length: 10 });

function insertionSort(array) {
  let a = array,
    from = 0,
    to = array.length;
  for (let i = from + 1; i < to; i++) {
    const element = a[i];
    for (let j = i - 1; j >= from; j--) {
      const temp = a[j];
      if (a[i] < a[j]) {
        a[j + 1] = temp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
}

const arr = [3, 2, 4, 1];
insertionSort(arr);
console.log(arr);
