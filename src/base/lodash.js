/*
 * @Author: liangliang jiang
 * @Date: 2021-11-19 10:45:00
 * @LastEditors: liangliang jiang
 * @LastEditTime: 2021-12-09 17:22:10
 * @Description: file content
 */
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

/**
 * Metaverse 元宇宙
 * WebXR  AR（Augmented Reality）和 VR（Virtual Reality）应用的 API
 */


var set = setInterval(() => {
  const hint =  document.getElementsByClassName('CodeMirror-hints')
  if(hint.length) {
    const cloneNode = hint[0].cloneNode(true)
    console.log(cloneNode)
  }
}, 4000)


// 生成数据结构 - 【计算字段】需求

const explain = {
  math: {
    ABS() {
      return `
        ABS(number):返回指定数字的绝对值，恒为非负数。 <br/>
        • 参数说明 <br/>
        number:需要求出绝对值的任意实数。<br/>
        • 示例<br/>
        ABS(-1.5)等于1.5。<br/>
        ABS(0)等于0。<br/>
        ABS(2.5)等于2.5。<br/>
      `
    },
    CEILING() {
      return `
        CEILING(number):将参数number沿数值增大的方向，舍入为最接近的整数。 <br/>
        •  参数说明 <br/>
        number:指待舍入的数值。 <br/>
        •  示例 <br/>
        CEILING(-2.5)等于-2。 <br/>
        CEILING(0.5)等于1。 <br/>
        CEILING(1.25)等于2。 <br/>
      `
    },
    FLOOR() {
      return `
        FLOOR(number):将参数number沿数值减小的方向去尾舍入。  <br/>
        •  参数说明 <br/>
        number:待舍入的数值。 <br/>
        • 示例 <br/>
        FLOOR(-2.5)等于-3。 <br/>
        FLOOR(2.5)等于2。 <br/>
      `
    },
    INT() {
      return `
        INT(number):返回数字最接近0的整数。 <br/>
        •  参数说明 <br/>
        number:需要舍入为整数的实数。 <br/>
        •  示例 <br/>
        INT(4.8)等于4。 <br/>
        INT(-4.8)等于-4。 <br/>
        INT(4.3)等于4。 <br/>
        INT(-4.3+5)等于0。 <br/>
      `
    },
    GREATEST() {
      return `
      GREATEST(number1,number2,……):返回参数列表中的最大值。<br/>
      •  参数说明<br/>
      number1,number2,……到n个需要找出最大值的参数。<br/>
      •  示例 <br/>
      GREATEST(1,2,3,4,5)等于5。<br/>
      `
    },
    LEAST() {
      return `
      LEAST(number1,number2,……):返回参数列表中的最小值。<br/>
      •  参数说明 <br/>
      number1,number2,……到n个需要找出最小值的参数。 <br/>
      •  示例 <br/>
      LEAST(1,2,3,4,5)等于1。<br/>
      `
    },
    MOD() {
      return `
      MOD(number,divisor):返回两数相除的余数。结果的正负号与被除数相同。<br/>
      •  参数说明<br/>
      number:为被除数。<br/>
      divisor:为除数。除数为0时，余数无穷大；被除数为0时，余数为0。<br/>
      •  示例<br/>
      MOD(3,2)等于1。<br/>
      MOD(-3,2)等于-1。<br/>
      MOD(3,-2)等于1。<br/>
      MOD(-3,-2)等于-1。<br/>
      `
    },
    PI() {
      return `
      PI(number):是一个数学常量函数。<br/>
      •  参数说明<br/>
      number为空时，函数返回数值π；当参数不为空时，number表示PI的整数倍数。<br/>
      •  示例<br/>
      SIN(PI()/2)等于1。<br/>
      计算圆的面积的公式:S=PI()*(r^2)，其中S为圆的面积，R为圆的半径。<br/>
      PI(3)等于3π。<br/>
      `
    },
    POWER() {
      return `
      POWER(number,power):返回指定数字的乘幂。<br/>
      •  参数说明<br/>
      number:底数，可以为任意实数。<br/>
      power:指数。参数number按照该指数次幂乘方。<br/>
      •  备注<br/>
      可以使用符号“^”代替POWER，如:POWER(5,2)等于5^2。<br/>
      •  示例<br/>
      POWER(6,2)等于36。<br/>
      POWER(14,5)等于537824。<br/>
      POWER(4,2/3)等于2.52。<br/>
      POWER(3,-2.3)等于0.08。<br/>
      `
    },
    PROMOTION() {
      return `
      PROMOTION(value1,value2):返回value2在value1上提升的比例。<br/>
      •  参数说明<br/>
      value是待比较的数值。<br/>
      •  示例<br/>
      PROMOTION(12,14)等于0.166666666，即提升了16.6666666%。<br/>
      PROMOTION(14,0)等于-1。<br/>
      PROMOTION(-12,14)等于2.166666666，即提升了216.6666666%。<br/>
      `
    },
    RANDBETWEEN() {
      return `
      RANDBETWEEN(value1,value2):返回value1和value2之间的一个随机整数。当两个数整数部分相同时，返回两个数相同整数部分。<br/>
      •  示例<br/>
      RANDBETWEEN(12.333,13.233)只会返回13。<br/>
      RANDBETWEEN(11.2,13.3)有可能返回12或者13。<br/>
      RANDBETWEEN(12.333,12.233)只会返回12。<br/>
      `
    },
    ROUND() {
      return `
        ROUND(number,num_digits):返回某个数字按指定位数舍入后的数字。 <br/>
        •  参数说明 <br/>
        number:需要进行舍入的数字。 <br/>
        num_digits：按此位数进行舍入，小于0，则在小数点左侧进行舍入。等于0，则舍入到最接近的整数。大于0，则舍入到指定的小数位。 <br/>
        •  示例 <br/>
        ROUND(2.15,1)等于2.2。 <br/>
        ROUND(2.149,1)等于2.1。 <br/>
        ROUND(-1.475,2)等于-1.48。 <br/>
        ROUND(21.5,0)等于22。 <br/>
        ROUND(21.5,-1)等于20 。 <br/>
        ROUND(21.5,-2)=0 <br/>
        ROUND(26.5,-1)=30 <br/>
        ROUND(51.5,-2)=100 <br/>
      `
    },
    SIGN() {
      return `
      SIGN(number):返回数值的正负性。当数字为正数时返回1，为零时返回0，为负数时返回-1。<br/>
      •  参数说明<br/>
      number:为任意实数。<br/>
      •  示例<br/>
      SIGN(10)等于1。<br/>
      SIGN(4-4)等于0。<br/>
      SIGN(-0.00001)等于-1。<br/>
      `
    },
    SQRT() {
      return `
      SQRT(number):返回一个非负数的算数平方根。<br/>
      •  参数说明<br/>
      Number:可以求算数平方根的任一非负数。<br/>
      •  备注<br/>
      number必须是一个非负数，否则函数返回数值为空值。 <br/>
      •  示例<br/>
      SQRT(64)等于8。<br/>
      SQRT(-64)返回空白。<br/>
      `
    },
    TRUNC() {
      return `
      TRUNC(number,num_digits):将数字的一定位数截去，返回整数或小数。 <br/>
      •  参数说明<br/>
      number:需要截尾取整的数字。<br/>
      num_digits:用于指定取整精度的数字。<br/>
      •  示例<br/>
      TRUNC(8.9)等于8。<br/>
      TRUNC(-8.9)等于-8。<br/>
      TRUNC(-8.98,1)等于-8.9。<br/>
      TRUNC(PI())等于3。<br/>
      `
    }
  },
  date: {
    DATEYMD() {
      return `
      DATEYMD(year,month,day):返回一个表示某一特定日期。 <br/>
        •  参数说明 <br/>
        year:代表年，可为一到四位数。 <br/>
        month: 代表月份。 <br/>
        day:代表日期。 <br/>
        •  示例 <br/>
        DATEYMD(1978,9,19)等于1978-09-19。 <br/>
      `
    },
    DATEDELTA() {
      return `
      DATEDELTA(date,deltadays):返回一个日期date后deltadays的日期。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      deltaDays可以为正值，负值，零。<br/>
      •  示例<br/>
      DATEDELTA("2008-08-08",-10)等于2008-07-29。<br/>
      DATEDELTA("2008-08-08",10)等于2008-08-18。<br/>
      `
    },
    DATEDIF() {
      return `
      DATEDIF(start_date,end_date,unit):返回两个指定日期间的天数、月数或年数。<br/>
      •  参数说明<br/>
      start_date:代表所指定时间段的初始日期。只支持文本、日期类型。<br/>
      end_date:代表所指定时间段的终止日期。只支持文本、日期类型。<br/>
      unit:函数返回信息的类型。 若unit=“Y/y”，则返回年差数； 若unit=“M/m”，则返回月差数；若unit=“D/d”，则返回日差数； 若unit=“MD/md”，则忽略年和月，返回日差数； 若unit=“YM/ym”，则忽略年和日，返回月差数；若unit=“YD/yd”，则忽略年，返回日差数。<br/>
      •  示例<br/>
      DATEDIF("2001-02-28","2004-03-20","Y")等于3，即在2001年2月28日与2004年3月20日之间有3个整年。<br/>
      DATEDIF("2001-02-28","2004-03-20","M")等于37，即在2001年2月28日与2004年3月20日之间有36个整月。<br/>
      DATEDIF("2001-02-28","2004-03-20","D")等于1116，即在2001年2月28日与2004年3月20日之间有1116个整天。<br/>
      DATEDIF("2001-02-28","2004-03-20","md")等于-8，即忽略月和年后，2001年2月28日与2004年3月20日的差为-8天。<br/>
      DATEDIF("2001-01-28","2004-03-20","YM")等于2，即忽略日和年后，2001年1月28日与2004年3月20日的差为2个月。<br/>
      DATEDIF("2001-02-28","2004-03-20","yd")等于21，即忽略年后，2001年2月28日与2004年3月20日的差为21天。<br/>
      `
    },
    DATESUBDATE() {
      return `
      DATESUBDATE(date1,date2,op):返回两个日期之间的时间差。<br/>
      •  参数说明<br/>
      date1,date2表示要输入的两个日期，当date1早于date2时，是负值；date1晚于date2，是正值，均只支持文本、日期类型。<br/>
      op表示返回的时间单位："s/S"，以秒为单位。"m/M"，以分钟为单位。"h/H"，以小时为单位。"d/D"，以天为单位。"w/W"，以周为单位。<br/>
      •  示例<br/>
      DATESUBDATE("2008-08-08","2008-06-06","h")等于1512。<br/>
      DATESUBDATE("2008-06-06","2008-08-08","H")等于-1512。<br/>
      `
    },
    DATETONUMBER() {
      return `
      DATETONUMBER(date):返回自1970年1月1日00:00:00GMT经过的毫秒数。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      •  示例<br/>
      DATETONUMBER("2008-08-08")等于1,218,153,600,000。<br/>
      `
    },
    DAY() {
      return `
      DAY(serial_number):返回日期中的日。DAY是介于1和31之间的一个数。<br/>
      •  参数说明<br/>
      serial_number:含有所求的年的日期。只支持文本、日期类型。<br/>
      允许DAY(serial_number)内参数为空，即DAY()，当参数为空时，取当前系统的服务器时间对应日期中的日。<br/>
      •  示例<br/>
      DAY()等于23，对应系统服务器时间为2020-10-23 15:36:25 。<br/>
      DAY("2000-01-01")等于1。<br/>
      `
    },
    DAYSOFMONTH() {
      return `
      DAYSOFMONTH(date):返回从1900年1月后某年某月包含的天数。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      •  示例<br/>
      DAYSOFMONTH("1900-02-01")等于28。<br/>
      `
    },
    DAYSOFQUARTER() {
      return `
      DAYSOFQUARTER(date):返回从1900年1月后某年某季度的天数。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      •  示例<br/>
      DAYSOFQUARTER("2009-02-01")等于90。<br/>
      `
    },
    DAYSOFYEAR() {
      return `
      DAYSOFYEAR(year):返回某年包含的天数。<br/>
      •  示例<br/>
      DAYSOFYEAR("2008-01-01")等于366。<br/>
      `
    },
    DAYVALUE() {
      return `
      DAYVALUE(date):返回1900年至date日期所经历的天数。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      •  示例<br/>
      DAYVALUE("2008-08-08")等于39667。<br/>
      `
    },
    HOUR() {
      return `
      HOUR(serial_number):返回某一指定时间的小时数，其值是介于0与23之间的一个整数。<br/>
      •  参数说明<br/>
      serial_number:包含所求小时数的日期（时间）字段。<br/>
      允许HOUR(serial_number)内参数为空，即HOUR()，当参数为空时，取当前系统的服务器时间对应的小时数。<br/>
      •  示例<br/>
      HOUR(TIME(11,32,40))等于11。 <br/>
      HOUR()等于15，对应系统服务器时间为2020-10-23 15:36:25。<br/>
      `
    },
    MINUTE() {
      return `
      MINUTE(serial_number):返回某一指定时间的分钟数，其值是介于0与59之间的一个整数。<br/>
      •  参数说明<br/>
      serial_number:包含所求分钟数的日期（时间）字段。<br/>
      允许MINUTE(serial_number)内参数为空，即MINUTE()，当参数为空时，取当前系统的服务器时间对应的分钟数。<br/>
      •  示例<br/>
      MINUTE(TIME(11,32,40))等于32。 <br/>
      MINUTE()等于36，对应系统服务器时间为2020-10-23 15:36:25。<br/>
      `
    },
    MONTH() {
      return `
      MONTH:(serial_number):返回日期中的月。月是介于1和12之间的一个数。<br/>
      •  参数说明<br/>
      Serial_number:含有所求的月的日期.只支持文本、日期类型。<br/>
      允许MONTH(serial_number)内参数为空，即MONTH()，当参数为空时，取当前系统的服务器时间对应日期的月数。<br/>
      •  示例<br/>
      MONTH("2000-01-01")等于1。<br/>
      MONTH()等于10，对应系统服务器时间为2020-10-23 15:36:25。<br/>
      `
    },
    MONTHDELTA() {
      return `
      MONTHDELTA(date,delta):返回指定日期date后delta个月的日期。<br/>
      •  参数说明<br/>
      date只支持文本、日期类型。<br/>
      •  示例<br/>
      MONTHDELTA("2008-08-08",4)等于2008-12-08。<br/>
      `
    },
    NOW() {
      return `
      NOW():获取当前时间。<br/>
      •  示例<br/>
      如果系统时间是2012年5月12日15点18分38秒则NOW()等于2012-05-12 15:18:38。<br/>
      `
    },
    QUARTER() {
      return `
      QUARTER(serial_number):返回日期中的季度。quarter是介于1和4之间的一个数。<br/>
      •  参数说明<br/>
      serial_number表示输入的日期，支持日期或文本类型。<br/>
      允许QUARTER(serial_number)内参数为空，即QUARTER()，当参数为空时，取当前系统的服务器时间对应日期的季度数。<br/>
      •  示例<br/>
      QUARTER()等于4，对应系统服务器时间为2020-10-23 15:36:25。<br/>
      QUARTER("2000-01-01")等于1。<br/>
      QUARTER("1997-04-20")等于2。<br/>
      `
    },
    SECOND() {
      return `
      SECOND(serial_number):返回某一指定时间的秒数，其值是介于0与59之间的一个整数。<br/>
      •  参数说明<br/>
      serial_number:包含所求秒数的日期（时间）字段。<br/>
      允许SECOND(serial_number)内参数为空，即SECOND()，当参数为空时，取当前系统的服务器时间对应的秒数。<br/>
      •  示例<br/>
      SECOND(TIME(11,32,40))等于40。 <br/>
      SECOND()等于25，对应系统服务器时间为2010-01-01 15:36:25。<br/>
      `
    },
    TIME() {
      return `
      TIME(hour,minute,second):返回指定的日期和时间，日期会随当天的日期改变。介于0:00:00（12:00:00A.M.）与23:59:59（11:59:59P.M.）之间。<br/>
      •  参数说明<br/>
      hour:介于0到23之间的数。<br/>
      minute:介于0到59之间的数。<br/>
      second:介于0到59之间的数。<br/>
      •  示例<br/>
      TIME(14,40,0)等于系统时间年月日 2:40PM。<br/>
      TIME(19,43,24)等于系统时间年月日 7:43PM。<br/>
      `
    },
    TODATE() {
      return `
      TODATE()函数可以将各种日期形式的参数转换为日期类型。 它有四种参数的形式：<br/>
      •  参数说明1<br/>
      参数是一个日期型的参数，那么直接将这个参数返回。<br/>
      •  示例1<br/>
      TODATE(DATE(2007,12,12))返回2007年12月12日组成的日期。<br/>
      •  参数说明2<br/>
      参数是以从1970年1月1日0时0分0秒开始的毫秒数，返回对应的时间。<br/>
      •  示例2<br/>
      TODATE(1023542354746)返回2002年6月8日。<br/>
      •  参数说明3<br/>
      参数是日期格式的文本，那么返回这个文本对应的日期。<br/>
      •  示例3<br/>
      TODATE("2007-06-08")返回2007年6月8日组成的日期。<br/>
      •  参数说明4<br/>
      有两个参数，第一个参数是一个日期格式的文本，第二个参数是用来解析日期的格式。<br/>
      •  示例4<br/>
      TODATE("1/15/07","MM/dd/yy")返回07年1月15日组成的日期。（MM必须是大写）。<br/>
      特别的，"yyyyMMdd"是用来解析形如“20081230”之类的日期格式的。比如TODATE("20110830","yyyyMMdd")返回2011年08月30日组成的日期。<br/>
      `
    },
    TODAY() {
      return `
      TODAY():获取当前日期。<br/>
      •  示例<br/>
      如果系统日期是2005年9月10日则TODAY()等于2005-09-10<br/>
      `
    },
    WEEK() {
      return `
      WEEK(serial_number):返回一个代表一年中的第几周的数字。<br/>
      •  参数说明<br/>
      serial_number:表示输入的日期。只支持文本、日期类型。<br/>
      允许WEEK(serial_number)内参数为空，即WEEK()，当参数为空时，取当前系统的服务器时间对应的所属一年中第几周的数字。<br/>
      •  示例<br/>
      WEEK("2010-01-01")等于52。<br/>
      WEEK("2010-01-06")等于1。<br/>
      WEEK()等于52，对应系统服务器时间为2010-1-1 15:36:25。<br/>
      `
    },
    WEEKDATE() {
      return `
      WEEKDATE(year,month,weekOfMonth,dayOfWeek):返回指定年月的指定周的周几的具体日期。最后一个参数dayOfWeek为-1时，表示这个周的最后一天。<br/>
      •  示例<br/>
      WEEKDATE(2009,10,2,1)返回的是2009年的10月的第二个周的第一天即星期天的日期，返回的是2009-10-04。<br/>
      WEEKDATE(2009,12,1,-1)返回的是2009年的12月的第一个周的最后一天即星期六的日期，返回的是2009-12-05。<br/>
      `
    },
    WEEKDAY() {
      return `
      WEEKDAY(serial_number):获取日期并返回星期数。返回值为介于0到6之间的某一整数，分别代表星期中的某一天（从星期日到星期六）。<br/>
      •  参数说明<br/>
      serial_num:表示输入的日期。只支持文本、日期类型。<br/>
      •  示例<br/>
      WEEKDAY("2005-09-10")等于6（星期六）。<br/>
      WEEKDAY("2005-09-11")等于0（星期日）。<br/>
      `
    },
    YEAR() {
      return `
      YEAR:(serial_number):返回日期中的年。year是介于1900和9999之间的一个数。<br/>
      •  参数说明<br/>
      serial_number:表示输入的日期。只支持文本、日期类型。<br/>
      允许YEAR(serial_number)内参数为空，即YEAR()，当参数为空时，取当前系统的服务器时间对应日期的年份数。<br/>
      •  示例<br/>
      YEAR("2000-01-01")等于2000。<br/>
      YEAR()等于2020，对应系统服务器时间为2020-10-23 15:36:25。<br/>
      `
    },
    YEARDELTA() {
      return `
      YEARDELTA(date,delta):返回指定日期后delta年的日期。<br/>
      •  参数说明<br/>
      date:表示输入的日期。只支持文本、日期类型。<br/>
      •  示例<br/>
      YEARDELTA("2008-10-10",10)等于2018-10-10。<br/>
      `
    }
  },
  text: {
    CONCATENATE() {
      return `
      CONCATENATE(para1,para2,……):将数个参数合并成一个字符串。<br/>
      •  参数说明<br/>
      para1,para2,……需要合并成单个文本的参数项。参数支持任意类型<br/>
      •  示例<br/>
      CONCATENATE("Average","Price")等于“AveragePrice”。<br/>
      CONCATENATE("1","2")等于12。CONCATENATE(1,"月")等于1月。<br/>
      ENDWITH:<br/>
      ENDWITH(str1,str2):判断字符串str1是否以str2结束。<br/>
      •  备注<br/>
      str1和str2都是大小写敏感的。<br/>
      •  示例<br/>
      ENDWITH("FineBI","BI")等于true。<br/>
      ENDWITH("FineBI","Fine")等于false。<br/>
      ENDWITH("FineBI","bi")等于false。<br/>
      EXACT:<br/>
      EXACT(text1,text2):检测两组文本是否相同。如果完全相同，EXACT函数返回1；否则，返回0。EXACT函数可以区分大小写，但忽略格式的不同。同时也可以利用EXACT函数来检测输入文档的文字。 <br/>
      •  示例<br/>
      EXACT("Spreadsheet","Spreadsheet")等于1。<br/>
      EXACT("Spreadsheet","S preadsheet")等于0。<br/>
      EXACT("Spreadsheet","spreadsheet")等于0。<br/>
      FIND:<br/>
      FIND(find_text,within_text,start_num):从指定的索引(start_num)处开始，返回第一次出现的指定子字符串(find_text)在此字符串(within_text)中的索引。<br/>v
      •  参数说明<br/>
      find_text:需要查找的文本。<br/>
      within_text:包含需要查找文本的文本。<br/>
      start_num:指定进行查找字符的索引位置。<br/>
      within_text里的索引从1开始。如果省略start_num，则假设值为1。<br/>
      •  示例<br/>
      FIND("I","Information")等于1。<br/>
      FIND("i","Information")等于9。<br/>
      FIND("o","Information",2)等于4。<br/>
      FIND("o","Information",12)等于0。<br/>
      `
    },
    ENDWITH() {
      return `
      ENDWITH(str1,str2):判断字符串str1是否以str2结束。<br/>
      •  备注<br/>
      str1和str2都是大小写敏感的。<br/>
      •  示例<br/>
      ENDWITH("FineBI","BI")等于true。<br/>
      ENDWITH("FineBI","Fine")等于false。<br/>
      ENDWITH("FineBI","bi")等于false。<br/>
      EXACT:<br/>
      EXACT(text1,text2):检测两组文本是否相同。如果完全相同，EXACT函数返回1；否则，返回0。EXACT函数可以区分大小写，但忽略格式的不同。同时也可以利用EXACT函数来检测输入文档的文字。 <br/>
      •  示例<br/>
      EXACT("Spreadsheet","Spreadsheet")等于1。<br/>
      EXACT("Spreadsheet","S preadsheet")等于0。<br/>
      EXACT("Spreadsheet","spreadsheet")等于0。<br/>
      FIND:<br/>
      FIND(find_text,within_text,start_num):从指定的索引(start_num)处开始，返回第一次出现的指定子字符串(find_text)在此字符串(within_text)中的索引。<br/>
      •  参数说明<br/>
      find_text:需要查找的文本。<br/>
      within_text:包含需要查找文本的文本。<br/>
      start_num:指定进行查找字符的索引位置。<br/>
      within_text里的索引从1开始。如果省略start_num，则假设值为1。 <br/>
      •  示例<br/>
      FIND("I","Information")等于1。<br/>
      FIND("i","Information")等于9。<br/>
      FIND("o","Information",2)等于4。<br/>
      FIND("o","Information",12)等于0。<br/>
      `
    },
    EXACT() {
      return `
      EXACT(text1,text2):检测两组文本是否相同。如果完全相同，EXACT函数返回1；否则，返回0。EXACT函数可以区分大小写，但忽略格式的不同。同时也可以利用EXACT函数来检测输入文档的文字。 <br/>
      •  示例<br/>
      EXACT("Spreadsheet","Spreadsheet")等于1。<br/>
      EXACT("Spreadsheet","S preadsheet")等于0。<br/>
      EXACT("Spreadsheet","spreadsheet")等于0。<br/>
      FIND:<br/>
      FIND(find_text,within_text,start_num):从指定的索引(start_num)处开始，返回第一次出现的指定子字符串(find_text)在此字符串(within_text)中的索引。<br/>
      •  参数说明<br/>
      find_text:需要查找的文本。<br/>
      within_text:包含需要查找文本的文本。<br/>
      start_num:指定进行查找字符的索引位置。<br/>
      within_text里的索引从1开始。如果省略start_num，则假设值为1。 <br/>
      •  示例<br/>
      FIND("I","Information")等于1。<br/>
      FIND("i","Information")等于9。<br/>
      FIND("o","Information",2)等于4。<br/>
      FIND("o","Information",12)等于0。<br/>
      `
    },
    FIND() {
      return `
      FIND(find_text,within_text,start_num):从指定的索引(start_num)处开始，返回第一次出现的指定子字符串(find_text)在此字符串(within_text)中的索引。<br/>
      •  参数说明<br/>
      find_text:需要查找的文本。<br/>
      within_text:包含需要查找文本的文本。<br/>
      start_num:指定进行查找字符的索引位置。<br/>
      within_text里的索引从1开始。如果省略start_num，则假设值为1。 <br/>
      •  示例<br/>
      FIND("I","Information")等于1。<br/>
      FIND("i","Information")等于9。<br/>
      FIND("o","Information",2)等于4。<br/>
      FIND("o","Information",12)等于0。<br/>
      `
    },
    FORMAT() {
      return `
      FORMAT(object,format):返回object的format格式。<br/>
      •  参数说明<br/>
      object:只支持日期。<br/>
      format:格式化的样式。<br/>
      •  示例<br/>
      FORMAT(date(2007,1,1),"yyyy-MM-dd")=>2007-01-01。<br/>
      FORMAT(date(2007,1,13),"yyyy/MM/dd")=>2007/01/01。<br/>
      `
    },
    INDEXOF() {
      return `
      INDEXOF(str1,index):返回字符串str1在index位置上的字符。<br/>
      •  备注<br/>
      index是从0开始计数的。<br/>
      •  示例<br/>
      INDEXOF("FineBI",0)等于'F'。<br/>
      INDEXOF("FineBI",2)等于'n'。<br/>
      INDEXOF("FineBI",5)等于'I'。<br/>
      `
    },
    LEFT() {
      return `
      LEFT(text,num_chars): 根据指定的字符数返回文本串中的第一个或前几个字符。<br/>
      text:包含需要选取字符的文本串。<br/>
      num_chars:指定返回的字符串长度。<br/>
      •  备注<br/>
          num_chars的值必须等于或大于0。<br/>
          如果num_chars大于整个文本的长度，LEFT函数将返回所有的文本。<br/>
          如果省略num_chars，则默认值为1。<br/>
      •  示例:<br/>
      LEFT("Fine software",8)等于"Fine sof"。<br/>
      LEFT("Fine software")等于"F"。<br/>
      `
    },
    LEN() {
      return `
      LEN(args):返回文本串中的字符数长度。需要注意的是：参数args为文本串时，空格也计为字符。<br/>
      •  示例<br/>
      LEN("Evermoresoftware")等于16。<br/>
      LEN("Evermore software")等于17。<br/>
      `
    },
    LOWER() {
      return `
      LOWER(text):将所有的大写字母转化为小写字母。<br/>
      •  参数说明<br/>
      text:需要转化为小写字母的文本串。LOWER函数不转化文本串中非字母的字符。<br/>
      •  示例<br/>
      LOWER("A.M.10:30")等于“a.m.10:30”。<br/>
      LOWER("China")等于“china”。<br/>
      `
    },
    MID() {
      return `
      MID(text,start_num,num_chars):返回文本串中从指定位置开始的一定数目的字符，该数目由用户指定。<br/>
      •  参数说明<br/>
      text:包含要提取字符的文本串。<br/>
      start_num:文本中需要提取字符的起始位置。文本中第一个字符的start_num为1，依此类推。<br/>
      num_chars:返回字符的长度。<br/>
      •  备注<br/>
      如果start_num大于文本长度，MID函数返回“”（空文本）。<br/>
      如果start_num小于文本长度，并且start_num加上num_chars大于文本长度，MID函数将从start_num指定的起始字符直至文本末的所有字符。<br/>
      如果start_num小于1，MID函数不返回结果。<br/>
      如果num_chars是负数，MID函数不返回结果。<br/>
      •  示例<br/>
      MID("Finemoresoftware",9,8)返回“software”。<br/>
      MID("Finemoresoftware",30,5)返回“”（空文本）。<br/>
      MID("Finemoresoftware",0,8)不返回结果。<br/>
      MID("Finemoresoftware",5,-1)不返回结果。<br/>
      `
    },
    REGEXP() {
      return `
      REGEXP(str,pattern):字符串str是否与正则表达式pattern相匹配。<br/>
      •  示例<br/>
      REGEXP("aaaaac","a*c")等于1。<br/>
      REGEXP("abc","a+c")等于0。<br/>
      MID:<br/>
      MID(text,start_num,num_chars):返回文本串中从指定位置开始的一定数目的字符，该数目由用户指定。<br/>
      •  参数说明<br/>
      text:包含要提取字符的文本串。<br/>
      start_num:文本中需要提取字符的起始位置。文本中第一个字符的start_num为1，依此类推。<br/>
      num_chars:返回字符的长度。<br/>
      •  备注<br/>
      如果start_num大于文本长度，MID函数返回“”（空文本）。<br/>
      如果start_num小于文本长度，并且start_num加上num_chars大于文本长度，MID函数将从start_num指定的起始字符直至文本末的所有字符。<br/>
      如果start_num小于1，MID函数不返回结果。<br/>
      如果num_chars是负数，MID函数不返回结果。<br/>
      •  示例<br/>
      MID("Finemoresoftware",9,8)返回“software”。<br/>
      MID("Finemoresoftware",30,5)返回“”（空文本）。<br/>
      MID("Finemoresoftware",0,8)不返回结果。<br/>
      MID("Finemoresoftware",5,-1)不返回结果。<br/>
      `
    },
    REPEAT() {
      return `
      REPEAT(text,number_times):根据指定的次数重复显示文本。<br/>
      •  示例<br/>
      REPEAT("$",4)等于“$$$$”。<br/>
      REPEAT("你好",3)等于“你好你好你好”。<br/>
      `
    },
    REPLACE() {
      return `
      REPLACE(text,texttoreplace,replacetext):根据指定字符串，用其他文本来代替原始文本中的内容。<br/>
      •  参数说明<br/>
      text:需要被替换部分字符的文本。<br/>
      texttoreplace:指定的字符串。<br/>
      replacetext:需要替换部分旧文本的文本。<br/>
      •  示例<br/>
      REPLACE("abcd","a","re")等于"rebcd"。<br/>
      REPLACE("a**d","**d","rose")等于"arose"。<br/>
      REPLACE(old_text,start_num,num_chars,new_text):根据指定的字符数，用其他文本串来替换某个文本串中的部分内容。 从第start_num个数字开始，替换num_chars个字符。<br/>
      •  示例：<br/>
      REPLACE("0123456789",5,4,"*")等于“0123*89”。<br/>
      REPLACE("1980",3,2,"99")等于“1999”。<br/>
      `
    },
    RIGHT() {
      return `
      RIGHT(text,num_chars):根据指定的字符数从右开始返回文本串中的最后一个或几个字符。<br/>
      •  参数说明<br/>
      num_chars不能小于0。如果num_chars大于文本串长度，RIGHT函数将返回整个文本。如果不指定num_chars，则默认值为1。<br/>
      •  示例<br/>
      RIGHT("Itisinteresting",6)等于"esting"。<br/>
      RIGHT("ShareHolder")等于"r"。<br/>
      RIGHT("Hugesale",4)等于"sale"。<br/>
      `
    },
    STARTWITH() {
      return `
      STARTWITH(str1,str2):判断字符串str1是否以str2开始<br/>
      •  备注<br/>
      str1和str2都是大小写敏感的。<br/>
      •  示例<br/>
      STARTWITH("FineBI","Fine")等于true。<br/>
      STARTWITH("FineBI","BI")等于false。<br/>
      STARTWITH("FineBI","fine")等于false。<br/>
      RIGHT:<br/>
      RIGHT(text,num_chars):根据指定的字符数从右开始返回文本串中的最后一个或几个字符。<br/>
      •  参数说明<br/>
      num_chars不能小于0。如果num_chars大于文本串长度，RIGHT函数将返回整个文本。如果不指定num_chars，则默认值为1。<br/>
      •  示例<br/>
      RIGHT("Itisinteresting",6)等于"esting"。<br/>
      RIGHT("ShareHolder")等于"r"。<br/>
      RIGHT("Hugesale",4)等于"sale"。<br/>
      `
    },
    TODOUBLE() {
      return `
      TODOUBLE(para):将参数转换成Double对象。<br/>
      •  参数说明<br/>
      para:需要转换的参数。<br/>
      •  示例<br/>
      TODOUBLE("123.21")等于newDouble(123.21)。<br/>
      STARTWITH:<br/>
      STARTWITH(str1,str2):判断字符串str1是否以str2开始。<br/>
      •  备注<br/>
      str1和str2都是大小写敏感的。<br/>
      •  示例<br/>
      STARTWITH("FineBI","Fine")等于true。<br/>
      STARTWITH("FineBI","BI")等于false。<br/>
      STARTWITH("FineBI","fine")等于false。<br/>
      RIGHT:<br/>
      RIGHT(text,num_chars):根据指定的字符数从右开始返回文本串中的最后一个或几个字符。<br/>
      •  参数说明<br/>
      num_chars不能小于0。如果num_chars大于文本串长度，RIGHT函数将返回整个文本。如果不指定num_chars，则默认值为1。<br/>
      •  示例<br/>
      RIGHT("Itisinteresting",6)等于"esting"。<br/>
      RIGHT("ShareHolder")等于"r"。<br/>
      RIGHT("Hugesale",4)等于"sale"。<br/>
      `
    },
    TOINTEGER() {
      return `
      TOINTEGER(para):将参数转换成Integer对象。<br/>
      •  参数说明<br/>
      para:需要转换的参数。<br/>
      •  示例<br/>
      TOINTEGER("123")等于newInteger(123)。<br/>
      `
    },
    TOSTRING() {
      return `
      TOSTRING(object):将其他类型的字段转换为文本类型<br/>
      • 参数说明<br/>
      object:需要转换的值或字段。<br/>
      • 示例<br/>
      TOSTRING(123)等于“123”，返回文本形式的结果。<br/>
      TOINTEGER:<br/>
      TOINTEGER(para):将参数转换成Integer对象。<br/>
      •  参数说明<br/>
      para:需要转换的参数。<br/>
      •  示例<br/>
      TOINTEGER("123")等于newInteger(123)。<br/>
      `
    },
    TRIM() {
      return `
      TRIM(text):清除文本首尾所有的空格。<br/>
      •  参数说明<br/>
      text:需要清除空格的文本。<br/>
      •  示例<br/>
      TRIM(" Monthly Report")等于Monthly Report。<br/>
      TOSTRING:<br/>
      TOSTRING(object):将其他类型的字段转换为文本类型。<br/>
      • 参数说明<br/>
      object:需要转换的值或字段。<br/>
      • 示例<br/>
      TOSTRING(123)等于“123”，返回文本形式的结果。<br/>
      TOINTEGER:<br/>
      TOINTEGER(para):将参数转换成Integer对象。<br/>
      •  参数说明<br/>
      para:需要转换的参数。<br/>
      •  示例<br/>
      TOINTEGER("123")等于newInteger(123)。<br/>
      `
    },
    UPPER() {
      return `
      UPPER(text):将文本中所有的字符转化为大写。<br/>
      •  参数说明<br/>
      text:需要转化为大写字符的文本。<br/>
      •  示例<br/>
      UPPER("notes")等于“NOTES”。<br/>
      TRIM:<br/>
      TRIM(text):清除文本首尾所有的空格。<br/>
      •  参数说明<br/>
      text:需要清除空格的文本。<br/>
      •  示例<br/>
      TRIM(" Monthly Report")等于Monthly Report。<br/>
      TOSTRING:<br/>
      TOSTRING(object):将其他类型的字段转换为文本类型。<br/>
      • 参数说明<br/>
      object:需要转换的值或字段。<br/>
      • 示例<br/>
      TOSTRING(123)等于“123”，返回文本形式的结果。<br/>
      TOINTEGER:<br/>
      TOINTEGER(para):将参数转换成Integer对象。<br/>
      •  参数说明<br/>
      para:需要转换的参数。<br/>
      •  示例<br/>
      TOINTEGER("123")等于newInteger(123)。<br/>
      `
    }
  },
  logic: {
    AND() {
      return `
      AND(logical1,logical2,……):当所有参数的值为真时，返回1；当任意参数的值为假时，返回0。<br/>
      •  示例<br/>
      AND(1+7=8,5+7=12)等于1。<br/>
      AND(1+7=8,5+7=11)等于0。<br/>
      `
    },
    IF() {
      return `
      IF(boolean,number1/string1/date1,number2/string2/date2):条件判断函数，条件为真，返回参数2，否则返回参数3。<br/>
      •  参数说明<br/>
      boolean为true时返回number1/string1/date1，为false时返回number2/string2/date2。第二个参数和第三个参数的类型必须相同。<br/>
      •  示例<br/>
      IF(true,2,8)等于2。<br/>
      IF(false,"first","second")等于second。<br/>
      IF(各门店净利润>0,"good","bad")，当净利润>0等于good，净利润<0等于bad。<br/>
      `
    },
    OR() {
      return `
      OR(logical1,logical2,……):当所有参数的值为假时，返回0；当任意参数的值为真时，返回1。<br/>
      •  示例<br/>
      OR(1+7=9,5+7=11)等于0。<br/>
      OR(1+7=8,5+7=11)等于1。<br/>
      `
    },
    SWITCH() {
      return `
      SWITCH(表达式,值1,结果1,值2,结果2,……): 如果表达式的结果是值1，整个函数返回结果1 如果表达式的结果是值2，整个函数返回结果2，如果表达式的结果是值3，整个函数返回结果3等等。<br/>
      •  参数说明<br/>
      所有的结果1，结果2，结果3……必须为同类型数据。<br/>
      •  示例<br/>
      SWITCH(1+2,3,"今天星期三",4,"今天星期四")等于今天星期三。<br/>
      OR:<br/>
      OR(logical1,logical2,……):当所有参数的值为假时，返回0；当任意参数的值为真时，返回1。<br/>
      •  示例<br/>
      OR(1+7=9,5+7=11)等于0。<br/>
      OR(1+7=8,5+7=11)等于1。<br/>
      `
    }
  },
  other: {
    ISNULL() {
      return `
      ISNULL(object):判断对象中所有的值是否全部都是NULL或者为空字符串。结果为空或null，返回1，否则返回0。<br/>
      `
    },
    NVL() {
      return `
      NVL(value1,value2,value3,……):在所有参数中返回第一个不是null的值。<br/>
      •  参数说明<br/>
      value1:可以为任意数，也可以为null。value2:可以为任意数，也可以为null。当字符串长度为0时,返回也为null<br/>
      •  示例<br/>
      NVL(12,20)等于12。<br/>
      NVL(null,12)等于12。<br/>
      NVL(null,null)等于null。<br/>
      NVL(20,null)等于20。<br/>
      NVL(null,null,10)等于10。<br/>
      `
    }
  }
}

function getArr(list, parentId, type) {
  const children = []
  list.forEach((item, index) => {
    const start = parentId * 100
    const id = start + index
    children.push({
      id,
      name: item,
      label: item,
      parentId,
      isLeaf: true,
      expand: false,
      formula: { name: item, id, parentId, exeFormula: ` fx_${start + index} `, showFormula: `${item}( )`, explain: `explain.${type}.${item}()` }
    })
  })
  return JSON.stringify(children)
}

getArr(
  ['ABS', 'CEILING', 'FLOOR', 'INT', 'GREATEST', 'LEAST', 'MOD', 'PI', 'POWER', 'PROMOTION', 'RANDBETWEEN', 'ROUND', 'SIGN', 'SQRT', 'TRUNC'],
  1,
  'math'
)

getArr(
  ['DATEYMD', 'DATEDELTA', 'DATEDIF', 'DATESUBDATE', 'DATETONUMBER', 'DAY', 'DAYSOFMONTH', 'DAYSOFQUARTER', 'DAYSOFYEAR', 'DAYVALUE', 'HOUR', 'MINUTE', 'MONTH', 'MONTHDELTA', 'NOW', 'QUARTER',
  'SECOND', 'TIME', 'TODATE', 'TODAY', 'WEEK', 'WEEKDATE', 'WEEKDAY', 'YEAR', 'YEARDELTA'],
  2,
  'date'
)

getArr(
  ['CONCATENATE', 'ENDWITH', 'EXACT', 'FIND', 'FORMAT', 'INDEXOF', 'LEFT', 'LEN','LOWER','MID','REGEXP','REPEAT', 'REPLACE', 'RIGHT', 'STARTWITH', 'TODOUBLE', 'TOINTEGER', 'TOSTRING', 'TRIM', 'UPPER'],
  3,
  'text'
)

getArr(
  ['AND', 'IF', 'OR', 'SWITCH'],
  4,
  'logic'
)

getArr(
  ['ISNULL', 'NVL'],
  5,
  'other'
)

