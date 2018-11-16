---
title: Webpack 配置工程师之路 - （一）搭建Vue组件库脚手架
---

> 也许 Gulp 更合适

回顾 26 个 commit

## 设想
预想的工作方式从 npm scripts 开始

- 本地开发和调试

```sh
yarn dev 
```

打包编译组件库
```sh
yarn component
```

发布到私服
```sh
yarn release
```

本地调试文档

```sh
yarn docs:dev
```

打包文档网站
```sh
yarn docs:build
```

发布文档网站
```sh
yarn docs:deploy
```

如何用 Webpack 来搭建这样一套时尚的 workflow。

## 搭建

先来看下最后的目录结构

```
├── README.md
├── dist # 文档生产环境输出目录
├── docs # 文档源码
├── lib # 组件输出目录
│   ├── button # 按需加载 js 组件
│   ├── checkbox
│   ├── ...
│   ├── index # 全部组件 js
│   └── theme-ca
│        ├── button # 对应按需加载的组件 css
│        ├── checkbox
│        ├── ...
│        └── index # 全部组件 css
├── scripts # 构建脚本
├── src # 组件源码
│   ├── assets # icon 等
│   ├── common # 公共 js
│   ├── components # 组件源码
│   ├── directives # 指令
│   ├── index.js
│   └── stylesheets # 样式源码
├── package.json
└── test # 测试目录，Todo
```


### yarn dev

基于 webpack 4.x 和 babel 7

在开发环境，首先明确明确我们的输入输出是什么。

我是在开发一个基于 Vue 的组件库，所以编写的源代码是 Vue 组件。输入就是 Vue 组件。输出就是一个 playground 用于调试我们开发的组件。

Webpack 的几个基本概念是 entry, output, loader, plugin。


使用 webpack-dev-server 启动一个服务用于调试和预览组件。
关于样式。在这个环境下除了组件自身的样式不应该有其余的样式来干扰我们开发组件的样式。然而在实际运用中，这个组件的自身样式也应该足够的健壮，不会轻易被外部的样式覆盖，但也要保证可定制化，能够在需要客制化样式的时候覆盖组件的自身样式。




## 样式系统重构

## 踩坑



## Todo
































































