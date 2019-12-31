module.exports = {
  title: "icccyyy Blog",
  base: "/icyblog/",
  description: "好好学习，天天向上~",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    sidebarDepth: 2,
    search: false,
    // lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript系列", link: "/javascript/" }, // 内部链接 以docs为根目录
      { text: "Css系列", link: "/css/" },
      { text: "工具箱", link: "/worktool/" }
    ],
    sidebar: {
      "/javascript/": [
        {
          title: "JavaScript系列",
          collapsable: false,
          children: [
            ["/javascript/", "原型与原型链"],
            "/javascript/变量对象",
            "/javascript/执行上下文",
            "/javascript/作用域与作用域链",
            "/javascript/mapParseInt",
            "/javascript/mvvm",
            "/javascript/promise",
            "/javascript/this指向问题",
            "/javascript/10W条数据优化"
          ]
        }
      ],
      "/css/": [
        {
          title: "Css系列",
          collapsable: false,
          children: [["/css/", "CSS权重"]]
        }
      ],
      "/worktool/": [
        {
          title: "工具箱",
          collapsable: false,
          children: [
            ["/worktool/", "日常正则"],
            "/worktool/React拖拽排序",
            "/worktool/其他常用",
            "/worktool/React可上传图片富文本",
            "/worktool/less全局换肤方案"
          ]
        }
      ]
    }
  }
};
