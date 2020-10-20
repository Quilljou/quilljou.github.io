---
title: 【译】Express 中的设计模式
date: 2020-10-20 18:03:25
tags:
---

[原文链接](https://dzone.com/articles/design-patterns-in-expressjs)

Express 是一种保持最低程度规模的灵活 Node.js Web 应用程序框架，为 Web 和移动应用程序提供一组强大的功能。

下面是一些当我们使用 Express 时可能会看到的一些设计模式。

## 工厂模式

这是 JavaScript 语言中一个简单和常用的设计模式。工厂模式是一种创新的设计模式可以让我们从外部世界中抽象出对象实现细节。Express 通过导出工厂实现这种模式。

```js
/**
 * Expose `createApplication()`.
 */

exports = module.exports = createApplication;

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
  ...
  return app;
}
```

另外，使用工厂模式创造一个 express 应用就如下面代码所示这么简单

```js
import express from 'express';
..
const app = express();
```

## 中间件

中间件是一个被 Express.js 带火的术语。

事实上，我们可以把这种设计模式看成 [拦截过滤](http://www.oracle.com/technetwork/java/interceptingfilter-142169.html) 和 [职责链模式](http://www.oracle.com/technetwork/java/interceptingfilter-142169.html) 的一种变体。

![alt](https://vietcanho.files.wordpress.com/2016/06/middleware.png?w=1462)

关于该模式的更多信息-点击 [这里](https://dzone.com/articles/understanding-middleware-pattern-in-expressjs)

## 装饰器模式

装饰器模式动态地扩展（装饰）了一个对象的行为。它和经典的继承不同，因为新的行为是在运行时被添加的，并且只被添加到被装饰的对象上（并非类上）。

![alt](https://dzone.com/storage/temp/2440958-decorator.png)

这种模式的一个简单示例是 [req](http://expressjs.com/en/4x/api.html#req) 和 [resp](http://expressjs.com/en/4x/api.html#res) ，在 Node 中，请求和响应对象的 API 是有限的。Express 通过使用一些新的特性装饰它们从而扩展了这些对象。

以下就是接收 request (req) 和 response (resp) 对象并且装饰它们的函数。

```js
///lib/middleware/init.js
exports.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    res.locals = res.locals || Object.create(null);

    next();
  };
};
```

## 策略模式

> 定义一组算法，对每一个算法进行封装，让他们变得可被替换。策略模式让算法非常独立于使用它的客户。

![alt](https://dzone.com/storage/temp/2442910-strategy.png)

它让一个策略（算法）在运行时在不被客户意识到的情况下被任何其他策略所替换。

在 Express 中，策略模式能在 Express 支持不同的模板引擎（例如 Pug, Mustache, EJS, swig等等）的实现中看到。在 [这里](https://github.com/expressjs/express/wiki?_ga=1.216495568.777274470.1463719254#template-engines) 可以看到 Express 支持的渲染引擎的完整列表。


```js
import express from 'express';
import exphbs from 'express-handlebars';
...
const app = express();
app.engine('.html', exphbs({...}));
app.engine('jade', require('jade').__express);

//Select the strategy '.html'
app.set('view engine', '.html');
```

另一个例子是 Express 如何支持 [内容协商](https://www.w3.org/Protocols/rfc2616/rfc2616-sec12.html)

## 代理模式

这种设计模式提供了一个叫做 **Proxy** 的对象用于控制另一个叫 **Subject** 的对象的访问。**Proxy** 对象和 Subject 对象具有相同的接口。**Proxy** 位于客户和 Subject 对象之间，它拦截了所有或者部分的请求，然后将这些请求转发给 **Subject**

![alt](https://dzone.com/storage/temp/2442923-proxy.png)

Express 有两种类型的中间件：

应用级中间件

路由级中间件

除了 应用级中间件 是绑定在一个应用（application）对象上且 路由级中间件 是绑定在 路由（router）实例上的区别外，它们都是一样的。所以 Express 是怎么实现这个功能的呢？通过 **组合（composition）**！express 的应用（application）对象拥有对 路由（Router) 实例对象的内部引用。


```js
this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
});

this._router.use(query(this.get('query parser fn')));
this._router.use(middleware.init(this));
```

使用每个受支持的API，在将请求转发到内部路由器（Router）实例之前，应用（application）对象将进行一些逻辑检查和验证。

注意: 还有许多其他的设计模式我没有在这里列出来，比如单例模式，懒初始化模式，事件发射器模式。

