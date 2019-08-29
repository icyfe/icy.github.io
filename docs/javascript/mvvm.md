用过 vue 的都知道双向绑定，双向绑定就是当 view 的数据改变的时候 data 的数据也会同时变化。vue 的双向绑定其实就是基于 Object.defineProperty 的数据劫持加上发布-订阅模式实现的。我们基于这两点来理一下实现的思路，我们要一个数据的观察者 observe 来实现对数据的劫持， 当数据变化的时候，我们要有一个事件的派发者通知订阅者实时更新数据，同时我们应该还要有一个 complie 来进行指令解析，将这些关联起来，先来看看最终实现的效果
![L$IT(BW0 Q %TT7Q A9W_9Y](https://user-images.githubusercontent.com/44893721/55455070-bc4cdf80-5614-11e9-89ea-fb72997507f3.png)
![aaa](https://user-images.githubusercontent.com/44893721/55455171-2f565600-5615-11e9-8b95-5669d8479f31.gif)

首先为了能像 vue 一样调用，我们先实现一个 mvvm 类，里面初始化传入的参数。

```js
class Mvvm {
  constructor(option) {
    this.methods = option.methods; //方法
    this.data = option.data; // 数据
    this.target = null; //记录watcher
    this.element = document.getElementById(option.el); //获取根元素
    this.observe(this, this.data); //设立观察者对data里面的数据进行劫持
    this.compile(this.element); //指令解析，整合
  }
}
```

### Observe

Observe 取出 data 中所有的属性并对其进行劫持，在 Mvvm 类中添加 observe 方法

```js
    observe(root, data) {
        for (let key in data) {
            this.definedRective(root, key, data[key])
        }
    }
    definedRective(root, key, value) {
        if (typeof value == 'object') {
            this.observe(value, value) //如果还有子属性还是对象递归取出
        }
        Object.defineProperty(root, key, {
            set(newVal) {
             if (value == newVal) return //如果数据没改变就直接返回
                value = newVal // 记录改变的值
            },
            get() {
                return value
            }
        })
    }
```

这里 observe 取出 data 中的属性数据，如果子属性还是个对象就进行递归，这样子属性如果发生了变化也能监听的到了。这个部分我们已经可以在数据变化的时候对数据进行拦截，但是我们要有一个事件的接收和派发调度员，让订阅消息的人可以实时的知道数据更新。

### Dispatcher

Dispatcher 主要做的事情就是对事件的接受和发布，让监听的人可以实时的知道数据的更新并同步的对 dom 的数据进行更新。

```js
class Dispatcher {
  constructor() {
    this.watchers = []; //监听者队列
  }
  add(watcher) {
    this.watchers.push(watcher); //接受监听者
  }
  notify(value) {
    console.log('更新');
    this.watchers.forEach(watcher => {
      watcher.update(value);
    }); //通知更新
  }
}
```

Dispatcher 其实就相当于一个调度员赋值事件的接受和发布，每当有新的 watcher 就添加进队列，当数据更新时，统一通知这些 watcher 我数据更新啦你也快更新吧。有了调度员，现在缺个订阅的我们来看下 watcher 怎么实现

### Watcher

watcher 其实很简单就做一件事对节点的数据进行更新

```js
class Watcher {
  constructor(node, type) {
    this.node = node; //监听的子节点
    this.type = type; // 子节点类型，不同子节点类型赋值方式不同
  }
  update(value) {
    if (this.type == 'input') {
      this.node.value = value;
    }
    if (this.type == 'text') {
      this.node.nodeValue = value;
    }
  }
}
```

现在有了 watcher,和 dispatcher 我们在对数据进行劫持的时候在 set get 中进行事件的发布和订阅

```js
    definedRective(root, key, value) {
        if (typeof value == 'object') {
            this.observe(value, value)
        }
        const dep = new Dispatcher();//事件派发者
        Object.defineProperty(root, key, {
            set(newVal) {
                if (value == newVal) return //如果数据没改变就直接返回
                value = newVal // 记录改变的值
                dep.notify(newVal) //发布事件
            },
            get() {
                console.log('get', value)
                dep.add(this.target) //添加订阅者
                return value
            }
        })
    }
```

最后实现 complie 对 v-model 等指令进行解析，并新建订阅者

```js
    compile(element) {
        const childNodes = element.childNodes;//获取所有子节点
        for (let node of childNodes) {
            if (node.nodeType == 1) {// nodetype属性在文末最后会附上解释，这里的1代表普通元素
                const attrs = node.attributes;//获取所有节点属性
                for (let attr of attrs) {
                    if (attr.name == 'v-model') { //解析v-model的指令
                        const name = attr.value
                        node.addEventListener('input', (e) => {
                            this[name] = e.target.value //监听数据input数据改变
                        })
                        this.target = new Watcher(node, 'input')
                        this[name] //触发劫持添加监听,一定要写这一句，因为这句其实就是获取data里面的值，一旦获取data的值就会触发get 将订阅者添加进订阅者集合
                    }
                    if (attr.name == '@click') {
                        const name = attr.value
                        node.addEventListener('click', this.methods[name].bind(this))
                    }
                }
            }
            if (node.nodeType == 3) {//nodeType等于3表示文本元素
                const reg = /\{\{(.*)\}\}/
                const match = node.nodeValue.match(reg)
                if (match) {
                    const name = match[1].trim()
                    this.target = new Watcher(node, 'text')
                    node.nodeValue = this.data[name]
                    this[name] //触发劫持添加监听
                }
            }
        }
    }
```

### nodetype 属性

![1554273976(1)](https://user-images.githubusercontent.com/44893721/55458438-9d077f80-561f-11e9-96c0-1e9948093bea.jpg)
