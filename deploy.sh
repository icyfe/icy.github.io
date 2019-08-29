#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 上传源码github
git add -A
git commit -m 'deploy'
git push

# 复制站点文件
# 首先删除原来文件夹下的所有内容
# rmdir --ignore-fail-on-non-empty G:/githubpages/docs

# 复制打包好的文件
# cp -avx "D:\wokespace\test\icyblog\docs\.vuepress\dist" D:\wokespace\test\icyblog\docs\.vuepress\dist

# 进入生成的文件夹
cd D:\wokespace\test\icyblog\docs\.vuepress\dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git add -A
git commit -m 'deploy'
git push

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com: master:gh-pages <icyfe >/ <icyblog >.git

cd -

# 最后刹车一下，不然刷刷也不知道刷了点儿啥
read -p "Press any key to continue." var
