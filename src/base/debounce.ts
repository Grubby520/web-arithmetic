function debounce(func: Function, wait = 2000, options?: object) {
  setTimeout(() => func(), wait)
}

const fn = () => {
  setTimeout
  console.log('run debounce fn')
}

debounce(fn, 2000)
