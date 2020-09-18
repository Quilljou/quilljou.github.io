---
title: 小程序工程化
tags:
---




webpack 的模型就是给定一个 js 入口，webpack 进行依赖分析，对每个不同的模块（文件）使用配置的 loader 进行处理（具体怎么处理？输入什么，返回什么，返回到哪里），webpack 是使用 tapable 驱动的核心-插件式架构。可以在webpack的各个处理流程添加插件。

为了使 webpack 能够处理小程序项目。首先需要解析 app.json ，将配置的页面 page.js 和页面相应的 page.css/sass, page.json, page.wxml（因为这些不是引入到 js 里的）都 require 到一个入口文件。然后为 css/scss 使用 loader 进行处理，为 json/js 使用 loader, 使用 wxml-loader 。在 emit 时所有内容输出到 dist 目录。通过接入 webpack，就意味着接入了整个 webpack 的生态。比如说可以做 js/css 的tree-shaking (怎么做?)

wxa build 执行链路
- 初始化 Context：挂载公共api、处理配置、初始化钩子、挂载插件
- 依次执行钩子

## Tapable