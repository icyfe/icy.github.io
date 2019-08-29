### 什么是作用域

作用域是变量和函数可影响的范围，也就是当前执行环境的变量和函数可见性。其实也就是执行环境当前变量对象可访问范围，即作用域控制着当前变量对象可见性和生命周期。上面一段话可能有点绕，说白了就是你定义的变量和函数能给被访问的范围，一般分为全局作用域和函数作用域，在 ES6 又新增了块级作用域
**全局作用域**

```js
var a = 'global scope';
function b() {
  console.log(a); // 'global scope'
}
b();
```

上面一段代码 在全局定义的变量在哪都能访问的到，它的作用域就是全局的
**函数作用域**

```js
var a = 'global scope';
function b() {
  console.log(a); // 'global scope'
  var c = ' local scope';
  console.log(c); // 'local scope'
}
b();
console.log(c); // error
```

这段代码在函数 b 中定义了 c 那么他的作用范围就只限于函数 b，在全局是无法访问到的，因此它的作用域是局部的。

### 什么是作用域链

由一个个作用域的变量对象所构成的链式对象，它决定了当前执行上下文有权访问的变量和函数有序的访问。
在高程三第七章有一段话大概意思如下：
**当我们创建函数时，内部会创建一个[[scope]]属性，它包含了全局变量对象的作用域链，当函数执行的时会通过复制函数的[[scope]]构建起当前的作用域链条，并将当前 AO 对象压入作用域的最前端**

```js
var global = 'global scope';
function foo() {
  var local = 'local scope';
}
foo();
```

我们用上面的代码模拟下上述过程，当上面代码执行的时候首先会创建全局执行上下文并压入执行栈

```js
ECstack = [
globalcontext.
]
```

当遇到函数创建时函数内部创建[[scope]]属性，它包含了全局对象的作用域链。

```js
foo.scope = [globalscope.VO];
```

当函数执行的时候创建执行上下文并压入栈顶

```js
ECstack = [
foocontext,
globalcontext.
]
```

我们前面提到过函数执行的时候分为两个阶段，编译阶段和执行阶段，编译阶段复制 f 函数创建时候的[[Scope]]对象并利用 argumen 初始化 AO 对象

```js
foocontext = {
 AO:{
  argument:{
   length:0
    },
   local:undefined,
  },
 Scope:foo.[[Scope]]
}
```

当执行阶段的时候为 AO 对象赋值，并将 AO 对象压入作用域链的最前端

```js
foocontext = {
  AO: {
    argument: {
      length: 0
    },
    local: 'local scope'
  },
  Scope: [AO, [[Scope]]]
};
```

就这样作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。
当我们查找一个变量的时候就会从自身开始查找，如果没查找到就会顺着作用域链网上查找父级的变量对象知道找到为止，否则就报错。
下面举一个高程三中的栗子

```js
var color = 'blue';
function changeColor() {
  var anotherColor = 'red';
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // 这里可以访问 color、anotherColor 和 tempColor
  }
  // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
  swapColors();
}
// 这里只能访问 color
changeColor();
```

![1552722706(1)](https://user-images.githubusercontent.com/44893721/54472457-9d241480-4803-11e9-9aa6-2ec52f8dd16d.jpg)

**矩形表示特定的执行环境。其中，内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。这些环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名；但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。对于这个例子中的 swapColors() 而言，其作用域链中包含 3 个对象： swapColors() 的变量对象、 changeColor() 的变量对象和全局变量对象。 swapColors() 的局部环境开始时会先在自己的变量对象中搜索变量和函数名，如果搜索不到则再搜索上一级作用域链。 changeColor() 的作用域链中只包含两个对象：它自己的变量对象和全局变量对象。这也就是说,它不能访问 swapColors() 的环境**
