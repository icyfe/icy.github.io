# ['1', '2', '3'].map(parseInt) 解析为什么后面两个是 NaN

### parseInt 的作用

parseInt(string, radix)
parseInt 使得一个字符串转换成十进制整数，它接受两个参数，参数一将要转换的字符串，参数二可选表示为解析时的基数未传参时默认为 10

### 遵循以下主要规则：

1.如果 parseInt 的参数不是字符串，则会先转为字符串再转换

```js
 let a = parseInt(1234)// 1234
1234 =>'1234' =>1234
```

2.字符串依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分,如果字符第一个值为非正常数值则返回 NaN。

```js
let a = parseInt('123adf', 10); //123
let a = parseInt('a12', 10); //NaN
```

3.如果字符串以 0x 或 0X 开头，parseInt 会将其按照十六进制数解析。

```js
let a = parseInt('0x16'); //22
let a = parseInt('0X16'); //22
```

4.如果字符串以 0 开头，将其按照 10 进制解析。

```js
let a = parseInt('016'); //16
```

5.当进行进制转换时基数未填或者传 0 那么将默认为 10.

```js
let a = parseInt('016', 0); //16`
```

6.当基类小于 2 大于 36 时将返回 NaN.

```js
let a = parseInt('10', 1); //NaN
let a = parseInt('10', 37); //NaN
```

7.依照规则二转换，当字符串第一个值大于等于基数的时候返回 NaN

```js
let a = parseInt('5', 4); //NaN
let a = parseInt('3', 4); //3
let a = parseInt('2', 2); //NaN
let a = parseInt('1', 2); //1
```

这里罗列了主要规则更多的可自行查阅
[](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

### map 的作用

MDN 给的说明
`map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果`。
它有两个参数一个 callback 一个是执行 callback 函数时使用的 this 值。
这里主要说说 callback 它传入三个值 参数一当前元素，参数二当前元素索引，参数三 map 方法被调用的数组。
用法如下

```js
var array1 = [1, 4, 9, 16];
const map1 = array1.map(function(item, index, arr) {
  //do somothing......
  return item * 2;
}); //[ 2, 8, 18, 32 ]
```

上面的栗子我们让每个元素乘 2 返回，当然你可以在回调里面为元素做任何处理并返回它

介绍完了 parseInt 和 map 的作用和主要用法后对于本篇的问题就比较明朗了
**['1', '2', '3'].map(parseInt) 解析为什么后面两个是 NaN**
我们知道 parseInt 会传入两个参数，一个要转换的字符串一个是基数， 而 map 的回调会将当前元素，索引，数组依次传入， 因此会给 parseInt 传入当前元素和下标索引['1', '2', '3'].map(parseInt)的过程就变成下面这个样子

```js
['1', '2', '3']
  .map(parseInt('1', 0)) //1
  [('1', '2', '3')].map(parseInt('2', 1)) //NaN
  [('1', '2', '3')].map(parseInt('3', 2)); //NaN
```

分别根据上述规则
第一次调用的时候基数传入当前的索引 0 ，**当基数为 0 时默认为 10 得到结果 1**,；
第二次调用的时候基数传入当前的索引 1，**当基数小于 2 大于 36 时 返回 NaN**；
第三次调用的时候基数传入当前的索引 2，**当要转换的值大于或等于基数时返回 NaN.**

### 如何解决这种问题呢？

主要原因我多穿了参数给 parseInt 那么我们不传那么多参数就好了，可以如下这样解决

```js
const c = ['1', '2', '3'].map(function(item) {
  return parseInt(item);
}); // [1,2,3]
```

或者这样

```js
const c = ['1', '2', '3'].map(Number); //[1,2,3]
```
