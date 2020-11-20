---
title: Koa 原理
date: 2020-10-16 17:11:15
tags:
---


Koa 作为 node.js 的下一代 web framework 和它的前辈 express.js 相比有什么不一样？

从 [官方文档](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md) 可以看出它的主要特点或者说和 express.js 的区别主要是

1. 精简
2. 使用 async

koa 只实现了中间件内核，没有 express.js 的重要功能 -- 路由，也更没有模板渲染，jsonp等等特性，这些功能都通过三方中间件来实现。所以它可以被看成 node.js 的 http 模块的抽象，而 express.js 则是一个应用框架。

koa 不使用传统的 node.js callback 编码风格，而是拥抱了 async/await。当然 express.js 也是可以使用 async/await，只不过 koa 使用 async/await 能够实现 [洋葱圈模型](https://eggjs.org/zh-cn/intro/egg-and-koa.html#middleware) 和更好的 [异常处理](https://itnext.io/from-express-to-koa-f3be4afdfd39)。


## API

首先看看 koa 是如何使用的？

```js
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

koa app 的实例化和 express 的工厂模式不同，它通过 new 关键字来实例化。

`use` 方法继承了 express.js 的命名风格，在这个示例里声明了三个中间件。但是这里 `use` 的入参和 express 的 `use` 方法有不同，koa 这里只接收一个入参，就是中间件函数。

中间件函数的签名是 `(context: Koa.Context, next: Koa.Next) => any;`，那么这里又有两个非常重要的概念，`context` 和 `next()`，`context` 是单次请求的上下文对象，在每次请求时会被创建；`next` 方法是 Koa 实现洋葱圈模型的关键。

`listen` 方法同 express.js 的 `listen` 方法一样，开启了监听端口。

## 目录结构

> 版本：Koa v2.13.0

![cloc koa/lib](https://img10.360buyimg.com/jdphoto/jfs/t1/127096/30/18199/6516/5faa98eaEd5e002ab/f40c762d5fdd23f8.png)


Koa 的源代码（不包括依赖）只有大概700行，相比于 express.js 少了大概 1000 行。


```sh
lib
├── application.js
├── context.js
├── request.js
└── response.js
```

koa 的代码被划分为以上四个文件:

application.js 导出的是 Koa Application 类
context.js 是 context 对象的原型
request.js 和 response.js 分别是 context.request 和 context.response 对象的原型

## use 
![koa structue](https://img10.360buyimg.com/jdphoto/jfs/t1/143072/10/15096/11183/5fb618ccE295c7533/604bf4ee66b82557.png)

Koa 框架的核心在于它实现了一套好用的中间件机制。Koa 的中间件是一个签名为 `(context: Koa.Context, next: Koa.Next) => any;` 的函数，Koa 实例的 `use` 方法用于注册中间件。Koa 实例上维护了一个名为 `middleware` 的队列，用于存储所有的中间件函数。`use` 方法的实现非常简单，以下是精简过的代码：

```js
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
```

`use` 方法将中间件函数推入队列中，返回 `this`，这让 `use` 可以链式调用。

完成了中间件的注册之后，我们就要创建 http 服务器，开启端口监听。koa 实例的 `listen` 方法就是这个作用，它是怎么实现的呢？


## listen
Koa 是基于 node.js 网络模块封装出来的框架。在上面的示例中在初始化 koa 实例后，就调用了 `listen` 方法在 3000 端口开始监听请求。它的实现是：

```js
listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
```

通过查阅 [node.js 文档](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) 我们会知道调用`http.createServer` 方法之后会返回一个 `Server` 实例，且这个方法的入参就是一个签名为 `(req: IncomingMessage, res: ServerResponse) => void` 的 `request handler`，这个函数会在 Server 实例每次接收到 [`request` 事件](https://nodejs.org/api/http.html#http_event_request)（即请求进入）时被调用。

从源码看到 Koa 框架使用的 `request handler` 就是 `this.callback()` 的返回值。所以当请求进入的时候，Koa 是如何应战的？

## callback

```js
const compose = require('koa-compose');

class Application {
  callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  /**
   * Handle request in callback.
   *
   * @api private
   */

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  ...
}
```

`callback` 首先把 middleware 传给了 koa-compose 模块，返回了一个函数 `fn`。

接着 `callback` 内声明了一个 `handleRequest` 函数并将其返回。所以最终 node.js `request` 事件触发的时候调用的就是这个 `handleRequest`。

当请求进入，`handleRequest` 被调用。被调用时它创建了一个 `context` 对象，关于 `context` 对象我们暂时略过，先走完中间件的执行流程。接着就把上面得到的 `fn` 和 `ctx` 传递给**实例方法** `handleRequest` 执行。

实例方法 `handleRequest` 中实际的代码就是执行了 koa-compose 得到的函数 `fnMiddleware`。

可以看出这是一个 promsise 链，当 `fnMiddleware` 返回的 `promise` 变更为 resolved 状态时，就调用 `handleResponse`这个闭包函数，其内的 `respond` 方法持有对 `ctx` 的引用。其作用就是经过中间件处理后响应客户端；当 `promise` 变更为 rejected 状态时，就会使用 `ctx.onerror` 方法响应给客户端，这个主要是 Koa 框架提供的兜底异常处理。一般业务中我们都会定义自己的异常处理函数。

所以中间件具体是怎么执行的，这就需要查看 koa-compose 模块的执行逻辑。


### koa-compose

```js
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

当我们在上面的 `handleRequest` 中调用 `fnMiddleware` 时最终执行的是 `dispatch(0)`，上面 promise 链的起点也就是这个方法的返回值。

我们先跳过 dispatch 函数声明的第二行和第三行。从第四行开始阅读，以 i 为下标取 middleware 队列中的中间件函数，还记得中间件的签名是 `(context: Koa.Context, next: Koa.Next) => any;`，在这里将作用域里的 context 和 bind 过后且参数为 i+1 的 dispatch 函数作为 next 传给中间件执行。

假设有如下两个中间件

```js
app.use(async function middleware1(context, next) {
  console.log('before 1')
  await next()
  console.log('after 1')
})

app.use(async function middleware2(context, next) {
  console.log('before 2')
  await next()
  console.log('after ')
})
```

经过 Koa 的编排，那么他们的执行逻辑等同于

```js

async function middleware1(context, next) {
  console.log('before 1')
  await Promise.resolve(async function(context, next) {
    console.log('before 2')
    await next()
    console.log('after 2')
  }(context, () => Promise.resolve()))
  console.log('after 1')
}

middleware1({}, undefined)
```

中间件的嵌套执行实现了 Koa 的洋葱圈模型。

最后一个值得注意的点是，闭包里维护了一个 index，这是防止 `next` 方法在一个中间件中被多次执行，多次执行就会导致中间件的执行顺序不是串行的而是并行的导致混乱。


## context
在上面我们看到每次请求进入都会调用 createContext 来创建一个上下文对象 context，并将其传给了中间件链条。

```js
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }
```

context 是一个原型为 `this.context` 的新对象。而 `this.context` 又是以 `context.js` 下声明的原型对象为原型的对象。

context.app 为 Koa 实例；context.req 是 Node.js IncomingMessage 的实例；context.res 是 Node.js ServerResponse 的实例；context.request 是 Koa 扩展过 IncomingMessage 后的实例；context.request 是 Koa 扩展过 ServerResponse 后的实例；

context 如下大量代理了它的 Koa response (非 Node.js req)和 Koa request (非 Node.js res)上的方法和属性。这就是为什么我们可以使用诸如 `ctx.body = { data: {}}` 的原因。

```js
delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('has')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');

/**
 * Request delegation.
 */

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');
```

## Request & Response
request.js 和 response.js 分别声明了上面 context.request 和 context.response 对象的原型。

在这些原型上声明了很多语法糖方法。比如 `ctx.status = 200` 和  `const status = ctx.status` 都是我们上面所说的 ctx 对 response 对象的代理。而 `response[set status]` 和 `response[get status]` 实现如下

```js
  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status() {
    return this.res.statusCode;
  },

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  set status(code) {
    if (this.headerSent) return;

    assert(Number.isInteger(code), 'status code must be a number');
    assert(code >= 100 && code <= 999, `invalid status code: ${code}`);
    this._explicitStatus = true;
    this.res.statusCode = code;
    if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses[code];
    if (this.body && statuses.empty[code]) this.body = null;
  },
```












