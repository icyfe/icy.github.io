# less 全局换肤方案

## 方案基于 antd UI

## 新建 global.less

新建 global.less 在资源文件夹 aseets/style 下 具体代码如下 虽然这个没什么用但是必须得创建

```js
@primary-color: "#f52533" !important;

```

## 新建 vars.less

新建 vars.less 在资源文件夹 aseets/style(根据自己项目情况而定)

```js
@import "~antd/lib/style/themes/default.less"; //引入antd的变量文件，实现变量的覆盖
@primary-color: #1da57a;
@link-color: #1da57a;
@btn-primary-bg: #1da57a;
:root {
 --primary-color-0: @primary-color; //color.less中加入css原生变量：--PC
}

```

## 新建 themColor.js

在项目根目录下 新建 themColor.js 用于动态更改全局主题色

```js
const path = require("path");
const { generateTheme, getLessVars } = require("antd-theme-generator");

const options = {
  stylesDir: path.join(__dirname, "./src/assets/styles"), //对应具体位置
  antDir: path.join(__dirname, "./node_modules/antd"), //对应具体位置
  varFile: path.join(__dirname, "./src/assets/styles/vars.less"), //对应具体位置
  mainLessFile: path.join(__dirname, "./src/assets/styles/global.less"), //对应具体位置
  themeVariables: [
    "@primary-color",
    "@secondary-color",
    "@text-color",
    "@text-color-secondary",
    "@heading-color",
    "@layout-body-background",
    "@btn-primary-bg",
    "@layout-header-background"
  ],
  indexFileName: "index.html",
  outputFilePath: path.join(__dirname, "./public/color.less") //页面引入的主题变量文件
};

generateTheme(options)
  .then(less => {
    console.log("Theme generated successfully");
  })
  .catch(error => {
    console.log("Error", error);
  });
```

### 在模板 index.html (就是我们的组件要挂载的 html) 中加入以下配置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="logo192.png" />

    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>

  <body>
    <!-- 重点是这里 start -->
    <link
      rel="stylesheet/less"
      type="text/css"
      href="%PUBLIC_URL%/color.less"
      rel="external nofollow"
    />
    <script>
      window.less = {
        async: false,
        env: "production"
      };
    </script>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"
    ></script>
    <!-- 重点是这里 end -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

### 最后修改 packge.json 文件

在 scripts 中加入以下代码

```js
  "scripts": {
    "start": "node themeColor && node scripts/start.js",
    "build": "node themeColor && node scripts/build.js",
    "test": "node scripts/test.js"
  },
```

## 如何更改

在需要动态更改的地方 使用以下代码就可以了

```js
window.less
  .modifyVars({
    "@primary-color": "#FFB6C1",
    "@link-color": "#FFB6C1",
    "@btn-primary-bg": "#FFB6C1"
  })
  .then(() => {})
  .catch(error => {
    // message.error(`Failed to update theme`);
  });
```
