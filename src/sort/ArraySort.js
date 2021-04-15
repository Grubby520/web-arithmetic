// https://github.com/v8/v8/blob/98d735069d0937f367852ed968a33210ceb527c2/src/js/array.js#L996
import { objArray } from ".../util/helper";

function ArraySort(array, comparefn) {
  return InnerArraySort(array, array.length, comparefn);
}

function InnerArraySort(array, length, comparefn) {
  if (!comparefn || typeof comparefn != "function") {
    comparefn = function (x, y) {
      if (x == y) return 0;
      else return x < y ? -1 : 1;
    };
  }
  if (length < 2) return array;

  // 插入排序
  function InsertionSort(a, from, to) {
    for (var i = from + 1; i < to; i++) {
      var element = a[i];
      for (var j = i - 1; j >= from; j--) {
        var tmp = a[j];
        var order = comparefn(tmp, element);
        if (order > 0) {
          a[j + 1] = tmp;
        } else {
          break;
        }
      }
      a[j + 1] = element;
    }
  }

  // 大于1000，获取哨兵位置
  function GetThirdIndex(a, from, to) {
    var t_array = new InternalArray();
    // Use both 'from' and 'to' to determine the pivot candidates.
    // 递增量，200~215 之间，因为任何正数和15做与操作，不会超过15，当然是大于0的
    var increment = 200 + ((to - from) & 15);
    var j = 0;
    from += 1;
    to -= 1;
    for (var i = from; i < to; i += increment) {
      t_array[j] = [i, a[i]];
      j++;
    }
    // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
    t_array.sort(function (a, b) {
      return comparefn(a[1], b[1]);
    });
    var third_index = t_array[t_array.length >> 1][0];
    return third_index;
  }

  function QuickSort(a, from, to) {
    let third_index = 0;
    if (to - from <= 10) {
      // Insertion sort is faster for short arrays.
      InsertionSort(a, from, to);
      return;
    }
    if (to - from > 1000) {
      third_index = GetThirdIndex(a, from, to);
    } else {
      // 取中间值
      third_index = from + ((to - from) >> 1);
    }
    // Find a pivot as the median of first, last and middle element.
    var v0 = a[from];
    var v1 = a[to - 1];
    var v2 = a[third_index];
    var c01 = comparefn(v0, v1);
    if (c01 > 0) {
      // v1 < v0, so swap them.
      var tmp = v0;
      v0 = v1;
      v1 = tmp;
    } // v0 <= v1.
    var c02 = comparefn(v0, v2);
    if (c02 >= 0) {
      // v2 <= v0 <= v1.
      var tmp = v0;
      v0 = v2;
      v2 = v1;
      v1 = tmp;
    } else {
      // v0 <= v1 && v0 < v2
      var c12 = comparefn(v1, v2);
      if (c12 > 0) {
        // v0 <= v2 < v1
        var tmp = v1;
        v1 = v2;
        v2 = tmp;
      }
    }
    // v0 <= v1 <= v2
    a[from] = v0;
    a[to - 1] = v2;
    var pivot = v1;
    var low_end = from + 1; // Upper bound of elements lower than pivot.
    var high_start = to - 1; // Lower bound of elements greater than pivot.
    a[third_index] = a[low_end];
    a[low_end] = pivot;

    // From low_end to i are elements equal to pivot.
    // From i to high_start are elements that haven't been compared yet.
    partition: for (var i = low_end + 1; i < high_start; i++) {
      var element = a[i];
      var order = comparefn(element, pivot);
      if (order < 0) {
        a[i] = a[low_end];
        a[low_end] = element;
        low_end++;
      } else if (order > 0) {
        do {
          high_start--;
          if (high_start == i) break partition;
          var top_elem = a[high_start];
          order = comparefn(top_elem, pivot);
        } while (order > 0);
        a[i] = a[high_start];
        a[high_start] = element;
        if (order < 0) {
          element = a[i];
          a[i] = a[low_end];
          a[low_end] = element;
          low_end++;
        }
      }
    }
    if (to - high_start < low_end - from) {
      QuickSort(a, high_start, to);
      to = low_end;
    } else {
      QuickSort(a, from, low_end);
      from = high_start;
    }
  }

  // num_non_undefined ?
  QuickSort(array, 0, length);

  return array;
}

if (!Array.prototype.elSort) {
  Array.prototype.elSort = function (comparefn) {
    ArraySort(this, comparefn);
  };
}

const array = objArray({ length: 10 });
console.log(JSON.parse(JSON.stringify(array)));

array.elSort(function (a, b) {
  return a.num > b.num;
});

console.log(array);
