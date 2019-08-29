在日常我们写 css 样式的时候或多或少都遇到过自己写的样式不生效的时候，一般都不会去探究背后的原因直接一股脑的！important 完事，但这样是非常不好的，但有的时候加了 important 也无法生效样式（当然我们还是遵循能不写 Important 就尽量不写），这是为什么呢！在 css 写样式中有个重要的权重问题！

### 什么是权重？

每个 css 规则都有自己相应的权重值，权重值越大的规则生效，主要有 5 种

1. 行内样式 权重值 1000
2. id 选择器 权重值 100
3. 类选择起，属性和伪类(:hover,actived) 权重值 10 4.元素，伪元素 (::before,::after) 权重值 1
   5.!important 最大，（但也遵从权重计算规则下面会提到）
   我们写的 css 规则就按照以上权重值进行累加，例如以下栗子：

```css
<div style="....."></div> =>1000
#id{} =>100
.class{}=>10
body{} =>1
p{}=>1
```

当写 css 规则时会按照值进行累加，值越大权重越大

```css
body #id {} =>元素1 id选择器100 = 101
#id .class{} =>id选择器100类选择器 = 110
#id .class p{} => id选择器100  类选择器10 元素标签1 = 111
```

### 主要规则

**无论多少个同级权重累加都不会超过高等级权重值**

```css
.class .class .Nclass {
}
< #id {
}
```

**相同权重值作用于同一个元素时权重值大的生效**

```css
.test1 .test2{background:red} =>20
.tetst1 .test2 p{background:black} =>21
```

假设以上两条都作用于同一个元素，下面权重值高的会生效
有时候!important 加了也没生效是为什么呢？因为它也遵循权重大小规则例如：

```css
.test1 .test2{background:red!important} =>20
.tetst1 .test2 p{background:black!important} =>21
```

上面都加了 important 但还是权重值更大的会生效
**离元素标签越近的生效**
在一个单独的 css 文件写如下样式

```css
.nav-bar {
  background: red;
}
```

在 html 的 style 中写

```html
<head>
  <style>
    .nav-bar {
      background: black;
    }
  </style>
</head>
```

以上栗子中虽然都一样但是下面的 css 会生效
[详细参阅【Understanding Specificity】 ](https://www.adobe.com/devnet/archive/dreamweaver/articles/css_specificity_02.html)

**相同的权重后面的会覆盖前面的**

```css
p {
  background: red;
}
p {
  background: black;
}
```

**不要用!important**
永远都不要使用“!important”：“如果你遇到了权重问题，第一个解决方法肯定是去掉“!important”，“!important”会覆盖所有的样式规则，但“!important”根本没有结构与上下文可言，所以很 容易找不到样式失效的原因

本文参考[你应该知道的 css 权重问题](https://www.w3cplus.com/css/css-specificity-things-you-should-know.html)
