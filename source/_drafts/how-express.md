---
title: express
date: 2020-10-14 10:36:09
tags:
---



## 应用

先使用 expres-generator 初始化一个 express 项目，看看一个 express server 运行功能有哪些？


```
├── app.js           # 应用入口
├── bin
│   └── www          # server 启动入口
├── package.json
├── public           # 静态资源
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes           # 控制器代码
│   ├── index.js
│   └── users.js
└── views            # 视图代码
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

可以看出来这个项目里是一个缺少 M 层的 MVC 架构。从 server 启动入口开始

```js
var app = require('../app');
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
```

核心代码调用就是这几行，使用 node 的 http 模块创建了一个 http server。app 是应用入口，我们可以从 http.createServer 的函数签名 `function createServer(requestListener?: RequestListener): Server;` 看出来 app 是一个 `RequestListener`, 具体的类型定义是 `type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;`。根据 nodejs 官方文档对 http.createServer 的解释

![alt](https://img10.360buyimg.com/jdphoto/jfs/t1/116330/38/20073/31068/5f866d4bE0497f679/350b79b24f257a89.png)


RequestListener 会被作为 server 的 request 事件的回调函数，接收的参数分别是 `http.IncomingMessage` 和 `http.ServerResponse`，翻译成白话就是每一个 http 请求过来都会被 app 所处理。

我们知道了 app 是一个函数类型，具体在 app.js 里执行了怎样的逻辑我们继续看。

```js
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

app 是 express 函数的返回值，执行完后用 app 函数上挂载的一些方法进行了一系列配置，包括配置模板引擎，配置视图文件地址，配置 cookie 解析，配置路由等等那可以猜想 express 是一个闭包，返回了 RequestListener, 而且在 RequestListener 上挂载了很多方法和属性。具体是不是这样的就可以进入到 express 的源码部分了。我们知道 express 作为一个 web 框架，核心特性是可以设置中间件来响应 HTTP 请求、定义了路由表用于执行不同的 HTTP 请求动作、可以通过向模板传递参数来动态渲染 HTML 页面。那我们就带着疑问看看 express 具体是怎么实现这些功能的。



## 入口

```js
var mixin = require('merge-descriptors');
var proto = require('./application');
var req = require('./request');
var res = require('./response');

exports = module.exports = createApplication;

/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}
```

express 模块默认导出的是 `createApplication` 方法。逐行来分析 `createApplication` 方法，第一行先声明了 `app` 方法，最后被作为返回值返回。那么 app 方法就是上文提到的传递给 `http.createServer` 的 `RequestListener`。当请求进入，`app` 方法被执行，实际执行的是 `app.handle` 方法，`handle` 方法的声明在后面会看到。

在上节中我们看到 `app` 这个函数上挂载了 `use`、`set` 方法和刚刚看到的 `handle` 方法，那应该就是和 `mixin` 这两行相关，这两行分别混入了 node 的 `EventEmitter` 和 express 的核心实现 `proto`。即使不看 `mixin` 的实现，我们也能猜测出 `mixin` 方法是把原型对象的方法挂载在 app 函数上。我们找到提供 `mixin` 方法的 `merge-descriptors` 模块的源码来看看。

```js
module.exports = merge

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */
function merge(dest, src, redefine) {
  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}
```
可以看到 mixin（merge）方法就是将 src 的属性通过 getOwnPropertyDescriptor 和 defineProperty 实现拷贝到 dest。回到 express 中就是将EventEmitter.prototype 和 `application.js` 模块的所有方法拷贝到 app 函数。




## Router


## 参考
https://www.runoob.com/nodejs/nodejs-express-framework.html