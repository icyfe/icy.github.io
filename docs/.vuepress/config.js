module.exports = {
  title: 'icccyyy Blog',
  base: '/icyblog/',
  description: '吾欲追晚否？ 曰:先追了在说~',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    sidebarDepth: 2,
    search: false,
    // lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: '首页', link: '/' },
      { text: 'JavaScript系列', link: '/javascript/原型与原型链.html' }, // 内部链接 以docs为根目录
      { text: 'Css系列', link: '/css/CSS权重.html' },
    ],
    sidebar: {
      '/javascript/': [
        {
          title: 'JavaScript系列',
          collapsable: false,
          children: [
            '/javascript/原型与原型链',
            '/javascript/变量对象',
            '/javascript/执行上下文',
            '/javascript/作用域与作用域链',
            '/javascript/mapParseInt',
            '/javascript/mvvm',
            '/javascript/promise',
            '/javascript/this指向问题',
          ]
        }
      ],

      '/css/': [
        {
          title: 'Css系列',
          collapsable: false,
          children: [
            '/css/CSS权重',
          ]
        }
      ]
    }
  }
}