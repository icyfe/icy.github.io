### 有这么一个数组 var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

### 要求将他扁平化，并按升序排列

**什么是扁平化？**
就是转换成这样
[[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10] =>[1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10]

**方法一：**

```js
function flatAndsort(arr) {
  return arr
    .toString()
    .split(',') //拍平数组(但是有个不好的地方就是会将数字类型转换成字符串类型)
    .sort((a, b) => {
      return a - b; //升序排序
    })
    .map(item => {
      return parseInt(item); // 因为之前转换成了字符串类型我们转换回来
    });
}
//[ 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10 ]
```

**方法二：**

```js
function flat(arr) {
  return [].concat(
    ...arr.map(item => {
      return Array.isArray(item) == true ? flat(item) : item;
    })
  );
}
function sort(a, b) {
  return a - b;
}

let c = flat(arr); //[ 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10 ]
```

**方法三**

```js
function flat(arr) {
  return arr.reduce((pre, current) => {
    return pre.concat(current.constructor == Array ? flat(current) : current);
  }, []);
}
function sort(a, b) {
  return a - b;
}
let c = flat(arr); //[ 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10 ]
```

**方法四(完全 ES6 方法)**

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

let c = arr.flat(4).sort((a, b) => {
  return a - b;
});
```

Array.flat()函数是将数据扁平化的一个函数，它接收一个参数，depath 决定数组嵌套的深度，这里例深度是 4 所以我们传 4

**最后在增加一个需求，将扁平化升序排列的数组去重如何实现？**
ES5:

```js
let list = c.filter((item, index, list) => {
  return list.indexOf(item) == index;
});
```

ES6:

```js
[...new Set([1, 2, 2, 3, 4, 5])]; // 12345
```
