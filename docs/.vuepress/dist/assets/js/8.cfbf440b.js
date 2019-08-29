(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{192:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("一直在学习却没有系列的总结过知识点，从这篇开始总结下一些知识点，这次总结的是 js 中的原型与原型链")]),t._v(" "),a("p",[t._v("开写之前先上一张图，接下来的概念基本上都会围绕这张图来讲\n"),a("img",{attrs:{src:"https://user-images.githubusercontent.com/44893721/53714411-3577dc00-3e89-11e9-8128-49f13b226f45.png",alt:"1 2rwcm 1 o 2h 8xf"}})]),t._v(" "),a("h3",{attrs:{id:"什么是原型？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是原型？","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("strong",[t._v("什么是原型？")])]),t._v(" "),a("p",[t._v("引用红宝书中的一段话：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype\n属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor\n（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。\n")])])]),a("p",[t._v("简单点来说"),a("strong",[t._v("只要是函数就会有一个 prototype(原型)属性它是一个指针")]),t._v("，它指向的是一个对象这个对象就是函数的原型对象，这个对象会默认获得一个 constructor(构造函数）的属性指向 prototype 指针所在的函数，"),a("strong",[t._v("当我们通过 new 关键字调用函数时就是通过调用构造函数的方式去创建一个对象,这时候会对象实列上面会自动包含一个[[Prototype]]指针指向构造函数的原型对象")]),t._v("，一般[[Prototype]]在浏览器中的实现长这样"),a("strong",[t._v("proto")]),t._v("。\n其实这就是开头图的第一部分\n"),a("img",{attrs:{src:"https://user-images.githubusercontent.com/44893721/53715365-85a46d80-3e8c-11e9-8246-26812203fa03.png",alt:"ej6h 45puxz 0nla66m 7f"}})]),t._v(" "),a("p",[t._v("来梳理一下，一下冒出了这么多个属性感觉有点绕 1.函数与函数原型通过"),a("strong",[t._v("prototype")]),t._v("属性链接， 函数原型的"),a("strong",[t._v("construtor")]),t._v("属性指向构造函数 2.对象实例与原型对象通过实力的****proto****属性链接。")]),t._v(" "),a("h3",{attrs:{id:"原型模式的作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原型模式的作用","aria-hidden":"true"}},[t._v("#")]),t._v(" 原型模式的作用")]),t._v(" "),a("p",[t._v("说了这么多这个原型到底有什么用呢？\n再次引用红宝书中的一段话")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("我们创建的每个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，\n而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那\n么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以\n让所有对象实例共享它所包含的属性和方法\n")])])]),a("p",[t._v("简单描述下这里的让所有实例可以共享原型对象的属性和方法这句话，当我们在原型对象上创建方法时像下面这样：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("sayHi")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hi!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" p "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sayHi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//'Hi!'")]),t._v("\n")])])]),a("p",[t._v("这段代码我们明明在 Person 中没有定义 sayHi 但是却成功的打印出了'Hi'， 这是因为当对象实例在查找属性时，会优先在本身实例中查找，如果没有查找到就会顺着原型指针指向的原型对象继续查找属性，最终找到了就打印出了'Hi'")]),t._v(" "),a("p",[t._v("不知道大家有没有发现，我们几乎所有的对象都可以调用 toString 或者 valueOf()方法，比如上面的所示代码也可以调用 toString()")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// function Person...")]),t._v("\n")])])]),a("p",[t._v("这里不经有个疑问，为什么 Person 的实例没有定义 toString()，原型对象上也没有定义 toString 方法，怎么就调用成功了呢？再次引用红包书的一段话")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("大家要记住，所有函数的默认原型都是 Object 的实例，因此默认原\n型都会包含一个内部指针\n")])])]),a("p",[t._v("这里不禁恍然大悟，原来所有的原型对象默认是 Object 的实例，"),a("strong",[t._v("那么就是说原型对象也会有一个")]),t._v("proto"),a("strong",[t._v("属性它默认指向 Object 的原型对象，因为 Object 对象上默认定义了一些属性如 toString(),valueOf()等，所以上面当我们调用 p.toString() 在本身实例没找到就会顺着原型去查找，原型对象上没有的时候再次顺着原型对象的")]),t._v("proto"),a("strong",[t._v("查找，最终找到并执行因此 Object 是所有原型的尽头，还有一点 Object 的原型指向空所以当 Object 都查找不到属性的时候就会报错")]),t._v("，由一系列的原型指针连起来的就组成了原型链。")]),t._v(" "),a("p",[t._v("这里也就是开头图的第二部分\n"),a("img",{attrs:{src:"https://user-images.githubusercontent.com/44893721/53717226-71fc0580-3e92-11e9-98a9-824891658bf4.png",alt:"image"}})]),t._v(" "),a("p",[t._v("最后我们来看看最后一部分")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/44893721/53717251-86400280-3e92-11e9-8a3b-07284fee1f37.png",alt:"image"}})]),t._v(" "),a("p",[t._v("通常我们定义函数时都是这样定义的")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("但是殊不知也算可以这样定义的\n"),a("code",[t._v("let Person = new Function('a','b','return a+b')")]),t._v("\n这样的写法等价与上面的写法，因此每个函数其实也是 Function 构造函数的实例，所以也遵循以上所描述拥有一系列原型属性，所以我们常常会调用 call 和 apply 的方法就是通过 Function 原型对象上继承来的。")])])},[],!1,null,null,null);s.default=e.exports}}]);