import _ from 'lodash'

const $debounce = document.getElementById('debounce')
const $cancel = document.getElementById('cancel')
const $flush = document.getElementById('flush')

const $other = document.getElementById('other')

const cb = (a, b, c) => {
  console.log('run', a, b, c)
}

// 1. 使用工具库 lodash
// 时间紧，任务重，实际项目开发当中，追求的是高效开发，所以怎么快怎么来。
const debounced = _.debounce(cb, 1000)

$debounce.addEventListener('click', debounced, false)
$cancel.addEventListener('click', debounced.cancel, false)
$flush.addEventListener('click', debounced.flush, false)

$debounce.addEventListener('click', () => {
  const random = Math.random()
  console.log(random)
  debounced(random)
}, false)

// 手写防抖函数

// 初级
function debounce(func, wait = 600) {
  let timer = null

  return function() {
    const lastArgs = arguments
    const lastThis = this
    // const lastCallTime = Date.now()

    if (timer) clearTimeout(timer)
  
    timer = setTimeout(() => {
      func.apply(lastThis, lastArgs)
    }, wait)
  }
}

/**
 * 闭包的使用场景
 * debounce 函数只会执行一次，返回 debounced 函数，它内部有对外层函数的 timer 的
 * 引用，就形成了闭包。
 */

// 不传参
// $other.addEventListener('click', debounce(cb, 2000), false)

// 传参
const _debounced = debounce(cb, 2000)
$other.addEventListener('click', () => {
  _debounced(1, [2], {a: 3})
}, false)
