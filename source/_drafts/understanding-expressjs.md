---
title: 【译】理解 express.js
date: 2020-11-09 10:55:34
tags:
---

> [原文链接](https://blog.laputa.io/understanding-expressjs-d5ef4f4646c8)

## 回顾 express api

在我们开始之前，先来快速回顾下 express 的 api。

Expressjs 主要有两种类型的 api：中间件和路由。

在创建了一个 express 应用后，我们做的第一件事就是通过调用 `app.use` 添加一些有用的中间件，比如：

```js
var app = express()
var bodyParser = require('body-parser')

// third party middleware
// parse application/json
app.use(bodyParser.json())

// user defined middleware
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// use middleware for specific url path
app.use('/user/:id', function (req, res, next) {
  checkUser(req.params.id)
  next()
})
```


这个中间件函数会按照他们被调用的顺序被执行。`next()` 方法会把请求（request）传到下一个中间件，当请求被处理的时候这就形成了一个链路。

路由 api 包括了 `app.METHOD()` 和 `app.route().METHOD()`，*METHOD* 可以试任何 HTTP 方法。它们被用来为指定的 url 路径和 http 方法设置一个 handler 函数。

```js
var app = express()

// handle GET /foo
app.get('/foo', function (req, res, next) {
  res.end('foo')
})

// define a route and a group of handlers
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

## 如何实现

让我们先看看这些 api 是怎么在 express 中实现的。

express 的源代码有着非常简单的结构。

![alt](https://img10.360buyimg.com/jdphoto/jfs/t1/150192/31/13662/19143/5fa8e603E010f22f1/0c02010c35e76fa5.png)

所有的内部逻辑都在 *lib* 目录，*application.js* 定义了 express application，中间件和路由逻辑在 *router* 目录下。（middleware目录包含了两个内置的中间件，在这篇文章中我们会跳过）

> 译者注：两个内置的中间件分别是 expressInit 和 query。分别用于初始化 express 的 req、res 和解析 req 的 querystring 成 query 对象。

每个 express 应用都有一个 *_router* 属性，它是 Router 的一个实例，[app.use](https://github.com/expressjs/express/blob/3ed5090ca91f6a387e66370d57ead94d886275e1/lib/application.js#L187-L221) 和 [app.route](https://github.com/expressjs/express/blob/3ed5090ca91f6a387e66370d57ead94d886275e1/lib/application.js#L254-L257) 仅仅是代理到 *_router* 对象的同名函数上。

```js
app.use = function use(fn) {
...
  fns.forEach(function (fn) {
// non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }
...
}
app.route = function route(path) {
  this.lazyrouter();
  return this._router.route(path);
};
```

而将 [app.method](https://github.com/expressjs/express/blob/3ed5090ca91f6a387e66370d57ead94d886275e1/lib/application.js#L472-L485) 委托给 _router 来为特定的HTTP方法创建Route:

```js
// methods is an array of all HTTP verbs
methods.forEach(function(method){
  app[method] = function(path){
  ...
    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
```

到现在为止，我们知道了一个 Express 应用基本上是它内部的 *_router* 对象的一个包装。

*_router* 是如何实现这些中间件和路由逻辑的呢？秘密就放在 *lib/router* 目录下。它有三个核心的组件，分别是 **Router**，**Route**，**Layer**。

在我们更深入之前，我会使用一个 express 的示例应用来帮助解释这些内部组件。


```js
const express = require('express')
const app = express()

app.use(function middlewareWithoutPath(req, res, next) {
    console.log('use middleware without path')
    next()
})

app.use('/foo', function middlewareWithPath(req, res, next) {
    console.log('use middleware with path')
    next()
})

app.route('/bar')
    .get(function routeBarGet(req, res) {
        res.send('ok')
    })
    .post(function routeBarPost(req, res) {
        res.send('ok')
    })

app.get('/zoo', function getZoo(req, res) {
    res.send('ok')
})

app.listen(3000, () => {
    console.log('listen on 3000...')
})
```

上面的代码创建了一个 express 应用，然后调用了 `app.use()` 方法两次。第一次没有带 path 参数，第二次传入了 path `/foo`。然后调用了 `route` 方法为路径 `/bar` 创建了一个路由，并且为这个路径分别定义了 `get` 和 `post` 方法的 handler。最后在 `app` 上调用了 `get` 方法，为路径 `/zoo` 定义了一个 handler。

这里应用内部的样子：

![alt](https://img10.360buyimg.com/jdphoto/jfs/t1/155146/1/5229/15738/5fa8f8a0Ed8c4360f/084ebfa9387cb459.png)

## Layer

layer 是最简单的组件，它具有一个 *path* 属性或者是 *method* 属性用于匹配请求，还有一个 *handle* 字段用于存储中间件函数。

```js
Layer {
  path   // when it's in the router
  method // when it's in the route
  handle = middleware_func
}
```

layer 会调用它的 `match` 方法，如果传入请求（incoming request）的属性匹配上 layer 的 `path` 或者 `method`，那么它就会把请求（request）传给 middleware_func。


## The Router

它是 express 应用中的主要组件。它维护了一个 *Layer* 的队列（使用 array 实现），当 `app.use(path, fn)` 被调用时，`_router` 会创建一个新的 Layer 对象，并且把 `path` 和 `middleware` 赋给这个 layer 对象，然后把它推进队列。

```js
app.use(path, fn) ==>

_router:

layer = new Layer()
layer.path = path
layer.handle = fn
stack.push(layer)
```

在没有 path 参数的情况下添加一个中间件，这个 layer 的 `path` 会被默认设置为 `/`，而 `/` 会匹配任意路径，这意味着这个中间件会在任何请求进入时都会被执行。

当 `app.route(path).get(fn)` 或者 `app.get(path, fn)` 被调用时，_router [会创建](https://github.com/expressjs/express/blob/3ed5090ca91f6a387e66370d57ead94d886275e1/lib/router/index.js#L491-L504) 一个新的 Route 对象，和一个新的 Layer 对象，这个 Layer 对象的 path 属性会被设置参数 path，而 Layer 对象的 handle 函数会被设置成新的 Route 对象的 dispatch 方法。

```js
app.route(path).get(fn) ==>

// _router
route = new Route()
route.get(fn)

layer = new Layer()
layer.path = path
layer.handle = route.dispatch
stack.push(layer)
```

所有的路径匹配都发生在 _router 的队列中，当一个请求进入，_router 会遍历它队列中的所有 layer，如果 layer 的 path 匹配上了请求的 path，那么这个 layer 对象的 handle 函数就会被执行，这个函数既可能是中间件方法，也可能是一个路由的 dispatch 方法。

如果匹配的 layer 指向一个 route 的 dispatch 方法，则请求将被传递到该 route 对象，让我们来看看Route是如何工作的

## Route

*Router* 处理 path 匹配，*Route* 处理 http method 匹配。每个 Route 有它自己的 layer 队列，队列中的每个 layer 在创建时都会存储 http 方法名。



```js
app.get(path, fn) ==>

// _router:
route = new Route()
route.get(fn)
...

// route.get(fn)
layer = new Layer()
layer.method = 'get'
layer.handle = fn
route.stack.push(layer)
```

`app.route(path).get(fn)` 也是相同的逻辑