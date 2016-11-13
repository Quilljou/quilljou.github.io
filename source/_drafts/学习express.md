---
title: 学习express
tags:
description: express是基于Node.js的一个简洁，快速的web框架。Fast, unopinionated, minimalist web framework for Node.js。
---
# tips
1. body-parser中间不能处理Content-Type为multipart/form-data的表单.而FormData实例出来的表单数据都是。解决这个问题有两种种方法
- 使用FormData,在服务器端使用另外一个中间件[multer](https://www.npmjs.com/package/multer)
- 不使用FromData，手动拼接表单

2. 中间件

- app-level 中间件，对每一个请求都会执行这个函数
```js
// 编写中间件
var requestTime = function (req,res,next) {
    req.requestTime = new Date();
    next();
}

// 使用中间件
app.use(requestTime);

app.get('/',function(req,res) {
    res.send(req.requestTime);  // send  requestTime
})
```



```js

```
