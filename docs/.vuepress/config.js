module.exports = {
  title: 'icccyyy Blog',
  base: '/icyblog/',
  description: '吾欲追晚否？ 曰：管他娘，追了在说~',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    sidebarDepth: 2,
    search: false,
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: '首页', link: '/' },
      { text: 'JavaScript系列', link: '/javascript/' }, // 内部链接 以docs为根目录
      { text: 'Css系列', link: '/css/' }
    ],
    sidebar: {
      '/javascript/': [
        '/javascript/原型与原型链.md',
        ['ExecutionContext', '执行上下文'],
        ['this', 'this指向'],
        ['vo', '变量对象'],
        ['zyy', '作用域与作用域链'],
        ['promise', '手写一个Promise'],
        ['arrayFlat', '数组扁平化'],
        ['mapParseInt', `['1', '2', '3'].map(parseInt) 解析为什么后面两个是NaN`],
        ['mvvm', '简单实现一个数据双向绑定'],
      ],
      '/css/': [
        ['', 'Css权重问题'],
      ]
    }
  }
}