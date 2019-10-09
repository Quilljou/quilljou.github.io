---
title: 和 Github 客户端学习 Electron
date: 2019-07-30 18:50:32
tags:
---

最近有机会能够使用 Electron 开发一个简单的编辑器。但是写完第一版之后，应用虽然能 work, 但是代码结构简单，就是简单的读取数据，渲染数据，毫无设计可言。所以想看看 Real World 的代码到底是怎样设计的。

最终在 Github 上找到最符合我需求的一个 Electron 项目仓库 -- [Github Desktop](https://github.com/desktop/desktop)（Github 客户端，以下简称 Desktop）。已经发布过多个版本，用户量客观，代码成熟，基于 Typescript 和 React。和我使用的技术栈完全吻合。So Let's Get Started.

## Workflow
首先先介绍下我的项目的 Workflow。

我们知道 Electron 分为两类进程，main 和 renderer。main 负责创建应用，创建窗口等等。本质上是一个 node 进程。而 renderer 进程用于渲染界面。

所以写了两个 webpack config, `webpack.main.js` 和 `webpack.renderer.js` 分别对应 main 进程和 renderer 进程。
开发时使用 `npm-run-all` 同时运行这两个 webpack 编译。main 进程虽然采用了 webpack 的 watch 模式。但是编译后需要手动重新运行 `electron .` 才能看到 main 进程修改代码后的效果。为了解决这个问题，使用了 nodeman 监听编译后的 `main.js`，一旦 webpack 重新编译了 main 进程，nodeman 监听到改动就会自动执行 `electron .` 打开应用。renderer 进程就和普通的 web 项目无异，使用 webpack-dev-server HMR 就能有很好的开发体验。在开发环境 main 进程 创建窗口时 loadUrl 使用 localhost 即可。

Desktop ”激进“的使用了 TS 来编写 webpack 配置，这其实是被 webpack 官方支持的，只需要安装 `ts-node` 即可。其实对于 webpack 复杂的配置，能使用 TS 是再好不过了。

Desktop 需要编译的不仅仅是 main 和 renderer 两部分。还包括 cli（Github 客户端命令行工具）, crash-window, akapass（登录验证）, highligter（代码着色）。所以 Desktop 分为 `webpack.dev.ts` 和 `webpack.prod.ts`, 分别对应开发环境和生产环境的代码编译，且分别导出一个 webpack 配置对象数组对应上面的每个部分的 webpack 配置。导出对象数组其实也是被 webpack 官方所支持的。

## 领域模型

## 数据流及状态管理

### 复杂数据持久化

我在看 Desktop 的代码之前一直有一个执念是对磁盘的读写只能在 main 进程进行，renderer 进程只负责渲染界面。所以我设计的是在 renderer 进程渲染数据或者更新数据的时候都需要通过 IPC 到 main 进程来完成最终的磁盘读写。除去读写正常的情况，还要考虑读写磁盘的异常，这样导致数据流异常的绕。

我采用的数据持久化是基于 [electron-store](https://github.com/sindresorhus/electron-store#readme), 它的实现是基于 JSON 文件。Desktop 采用的是 [Dexie](https://github.com/dfahlander/Dexie.js)，这是对浏览器标准数据库 indexedDB 的一个封装。从它的 Readme 可以看到它主要解决了三个 indexedDB 的问题：

1. 不明确的异常处理
2. 查询很烂
3. 代码复杂

因为 Desktop 采用的是浏览器存储。所以完全没有我所遇到的问题，读写都在 renderer 进行了，而且有一个好处是能够使用 Chrome Devtools 来查看数据。

### Dexie
Desktop 定义了一个 `BaseDatabase` 抽象基类, 其继承于 Dexie。Dexie 比较简单，需要注意的点是:
1. 每一个数据库都是有版本的，后续的版本的 schema 可以通过 Dexie.version(xx).stores(schema) 来更新数据库的 schema。
2. 对数据库的读写只能发生在 transaction（事务）的上下文中。

### 简单数据持久化
关于一些 UI 状态的标志位存储，Desktop 使用的是 `localStorage`。值得学习的是它封装了一些工具方法便于操作 `localStorage`.

```typescript
export function getBoolean(key: string): boolean | undefined
export function getBoolean(key: string, defaultValue: boolean): boolean
export function getBoolean(
  key: string,
  defaultValue?: boolean
): boolean | undefined {
  const value = localStorage.getItem(key)
  if (value === null) {
    return defaultValue
  }

  if (value === '1' || value === 'true') {
    return true
  }

  if (value === '0' || value === 'false') {
    return false
  }

  return defaultValue
}

export function setBoolean(key: string, value: boolean) {
  localStorage.setItem(key, value ? '1' : '0')
}
```

[详见](https://github.com/desktop/desktop/blob/development/app/src/lib/local-storage.ts)

### 状态管理
Desktop 没有使用目前前端开发中常见的 `Redux`，`Mobx` 等状态管理库。

这些状态管理库的数据流差不多可以用下面的表示

```
view(store binded) => action dispatced => change the store => react to all views
```

Desktop 同这些方案类似，只是最后一步不一样，它的 Store 基于事件机制 EventEmitter. 和上述自动更新不同的是在更新了 store 之后，需要手动调用 `emitUpdate` 方法，这个方法触发了 `did-update` 事件, 也就是调用了 `appStore.onDidUpdate` 方法的回调。在 `app.tsx` 初始化的时候，已经绑定了 `appStore.onDidUpdate` 的回调是触发 React 视图的 `setState`。

```ts
props.appStore.onDidUpdate(state => {
    this.setState(state)
})
```

这样就实行了修改 store 之后，更新所有视图的操作。

那这里有一个疑问，高频率 store 更新，高频率的调用 `emitUpdate` 岂不是会带来性能问题，这里 Desktop 做了一个优化是，开启了一个队列，只会在浏览器的每一帧绘制的时候才会使用最新的 state 去执行真正的更新视图 `emitUpdateNow` 方法。将高频率的 `emitUpdate` 调用给节流了。

```ts
protected emitUpdate() {
    if (this.windowState === 'hidden') {
        this.emitUpdateNow()
        return
    }

    if (this.emitQueued) {
        return
    }

    this.emitQueued = true

    window.requestAnimationFrame(() => {
        this.emitUpdateNow()
    })
}

private emitUpdateNow() {
    this.emitQueued = false
    const state = this.getState()

    super.emitUpdate(state)
    updateMenuState(state, this.appMenu)
}
```

此外，appStore 还集中管理了所有子 store, 当这些 store 更新的时候触发了 appStore 的 `emitUpdate`。


## Menu

### Context-Menu
Desktop 的 contextmenu 的实现基于原生 IPC 的，比较绕。

首先我们需要知道的是 Menu 类是 main process only 的。

在需要 contextmenu 的 JSX.Element 上绑定 `onContextMenu` 事件。构造对象数组 Array<MenuItem>, 并且为每个 MenuItem 对象绑定触发事件，再通过 IPC 将对象传递至 main 进程，值得一提的是这个时候将 MenuItem 数组赋值给了一个全局对象，暂存起来。在 main 进程构造出真正的 MenuItem 实例，绑定 MenuItem 的点击事件，触发 MenuItem 点击事件的时候记录 MenuItem 的 序列号 index，再将 index 通过 event.sender.send 将 index 传递到 renderer 进程。renderer 进程拿到 index 之后根据之前保存的全局对象取出单个 MenuItem， 执行绑定的事件。

```
onContextMenu => showContextualMenu (暂存MenuItems，ipcRenderer.send) => icpMain => menu.popup() => MenuItem.onClick(index) => event.sernder.send(index) => MenuItem.action()
```

所以在我的应用中会使用 remote 对象屏蔽上述复杂的 IPC 通信。在 renderer 进程完成 Menu 的构造展示和事件的绑定触发。


## 日志
完善的日志可用于 debug，了解 UI 状态迁移背后的数据变动和流程的正确与否。

Desktop 的日志基于日志库，[winston](https://github.com/winstonjs/winston#readme)。

在 main 进程和 renderer 进程都提供了全局 log 对象，接口都是一致的。分别是 `debug`, `info`, `warn`, `error`。在 render 进程，简单的封装了 `window.console` 对象上的 `debug`, `info`, `warn`, `error` 方法，日志打印到控制台的时候通过 IPC 传递到 main 进程，由 main 进程统一管理。 

main 进程接收了来自 renderer 进程的日志信息和 main 进程自身的日志信息。设置了两个 `transports`。`winston.transports.Console` 和 `winston.transports.DailyRotateFile` 分别用于将日志信息打印在控制台和存储在磁盘文件。DailyRotateFile 以天为单位，设置了最多存储 14 天的上限。

在 main 进程和 renderer 进程启动时分别引入日志安装模块。因为 log 方法都是暴露在全局，因此只需要引入一次即可。在 TS 环境中还需要添加 log 方法的类型声明。

[详见](https://github.com/desktop/desktop/tree/development/app/src/lib/logging)

## 其他

### 组件文件命名及模块
首先需要推荐的的是任何文件命名都以`kebab-case`的方式。

然后在导出一个组件时，如下几种方案我们应该采取哪一种呢

1. 

```
|__button
|___index.tsx # `export { default as button } from './button'`
|___button.tsx # `export default class Button extends React.Component{}`
```

2. 
```
|__button
|___index.tsx # `export default class Button extends React.Component{}`
```

3. 
```
|__button
|___button.tsx # `export default class Button extends React.Component{}`
```

Desktop 采用的第一种方式。这种方式


### CSS 目录结构
尽量一个组件一个样式文件，便于维护更新。