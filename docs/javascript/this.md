关于 this 指向肯定遇到过许许多多的奇怪问题，这都是因为没弄清楚它的指向导致一些调用的错误，下面总结先 this 的指向。

### **1.谁调用了它，this 就指向谁，当是全局调用且为非严格模式时 this 指全局(在浏览器环境下指向 window)，否则是 undefined**

举个栗子
非严格模式

```js
var value = 'global scope';
function a() {
  console.log(this.value);
}
a(); // global scope
```

严格模式

```js
'use strict';
var value = 'global scope';
function a() {
  console.log(this.value);
}
a(); // undefined
```

在浏览器中全局的 this 默认是 window， 因此 a()在全局中被调用相当于是 window.a，谁调用它 this 就指向谁，因此这里打印出全局变量的'global scope'
在看一个栗子：

```js
var value = 'global scope';
var o = {
  value: 'local scope',
  a: function() {
    console.log(this.value);
  }
};

o.a(); //local scope
```

这里通过创建一个 o 实例对象，通过 o 调用 this 的指向就指向 o。

### `2.call, apply, bind 改变this指向`

在 js 中有三种方式可以显示的改变 this 的指向，call 和 apply 除了传参不一样其本质是一样的，call 和 apply 第一个参数都是要传入将要指向的 this, call 后面可接多个参数，apply 则是第二个参数接收一个参数的集合，也就是数组。

```js
fn.call(this, arg1, ag2, ag3);
fn.apply(this, [...arg]);
```

bind 的本质是封装了 apply 它返回的一个函数。
来看几个栗子:

```js
var value = 'global scope';
function b() {
  console.log(this.value);
}
var o = {
  value: 'local scope',
  a: function() {
    console.log(this.value);
  }
};

b.call(o); //local scope
b.apply(o); //local scope
let c = b.bind(o);
c(); //local scope
```

上面几个栗子都是改变了 this 的指向，原本在非严格模式下指向全局的 this 应该输出'global scope'，改变 this 指向后指向了传入的 o 对象因此打印出'local scope'
call 和 apply 的原理其实是在传入的对象增加要执行的函数，从而改变 this 的指向，执行完后在删除函数，这个后面会有一章节来仿写 call,apply 和 bind 函数。

### 3.new 关键字

通过 new 关键字调用函数会以构造函数的形式调用会发生以下步骤 1.创建一个对象 2.将对象的实例原型指向构造函数的原型
**3.将对象的 this 绑定到构造函数并创建一系列属性** 4.返回这个对象
因此我们可以 new 关键字调用的函数也会改变 this 的指向，它指向创建出来的实例对象
举个栗子：

```js
var value = 'global scope';
function A() {
  this.value = 'local scope';
  this.sayValue = function() {
    console.log(this.value);
  };
}

let b = new A();
b.sayValue();
```

通过 new 内部发生的过程我们就可以知道上面的栗子将 this 指向了新创建出来的实例 b 因此打印 value 时候就打印出'local scope'

### 4、箭头函数的 this

在 ES6 中新增了箭头函数用法，它本身没有绑定 this，它的 this 指向是离的它最近的一个普通函数所绑定的 this，在 ES5 之前我们在一些匿名函数为了防止 this 指向丢失我们可能会这样绑定 this

```js
function a() {
  let self = this;
  this.value = 'Hi!';
  setTimeout(function() {
    console.log(self.value);
  }, 0);
}
```

在 ES6 中这样就可以了

```js
function a() {
  this.value = 'Hi!';
  setTimeout(() => {
    console.log(this.value);
  }, 0);
}
```

`只要记住一点。在箭头函数中的this的指向永远是离它最近的一个普通函数所绑定的this,如上栗子离匿名函数最近的普通函数是 a函数， 当a被谁调用时 this就指向谁`
