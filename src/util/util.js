/**
 * check whether an object has the prototype
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * check if a string starts with $ or _
 * vue内置的属性
 */
export function isReserved(str) {
  const c = (str + "").charCodeAt(0);
  return c === 36 || c === 95;
}

/**
 * simple bind polyfill for env that don't support it, need backward compatibility
 * 给vue方法绑定vm实例和形参
 */
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    const len = arguments.length;
    return len
      ? len > 1
        ? fn.apply(ctx, arguments) // 多个参数，当数组传参
        : fn.call(ctx, a) // 只有一个参数
      : fn.call(ctx); // 没有参数
  }
  boundFn._length = fn.length; // ? 目的是啥
  return boundFn;
}
export const bind = Function.prototype.bind ? nativeBind : polyfillBind;

const _toString = Object.prototype.toString;
/**
 * object type check.
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === "[object, Object]";
}

/**
 * 判断是不是浏览器的原生函数
 * 例如 Promise.toString() -> "function Promise() { [native code] }"
 */
export function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
