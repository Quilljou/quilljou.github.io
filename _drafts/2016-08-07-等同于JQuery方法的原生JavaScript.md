# Native JavaScript Equivalents of jQuery Methods: the DOM and Forms
# 等同于JQuery方法的原生JavaScript:Dom和表单

[原文地址](https://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/)

# DOM 选择器
JQuery访问DOM节点使用CSS选择器语法，例如

```js
// ID为first的文章里所有summary类的段落
var n = $("article#first p.summary");
```

等价的原生js

```js
var n = document.querySelectorAll("article#first p.summary");
```
`document.querySelectorAll`在所有的现代浏览器及IE8中都实现了，但是jQuery支持许多额外的高级选择器，大多数情况下，在`$()`的包装下运行的是`document.querySelectorAll`

原生JavaScript也提供了四种替代方法它们比querySelectorAll查询速度更快，前提是你的项目能够使用它们

1. document.querySelector(selector) --仅取得地一个匹配到的节点
2. document.getElementById(idname) --取得一个节点通过它的ID
3. document.getElementsByTagName(tagname) --取得匹配一个元素节点的节点列表
4. document.getElementsByClassName(class) --取得一个确切的类名的节点列表

getElementsByTagName和getElementsByClassName方法也能够被用在某一个节点列表上，这样可以限制特定的祖先元素，例如
 ```js
 var n = document.getElementById("first");
var p = n.getElementsByTagName("p");
```
作者做了一项测试，使用jQuery2.0和原生的JavaScript获取一个页面上的同一个元素节点，往往原生的速度要快，也证明了通过id或是class获得节点要比querySelectorAll要快

# DOM操作
jQuery提供了许多方法向DOM添加内容，例如

 ```js
 $("#container").append("<p>more content</p>");
 ```

它的原理是使用了原生的innerHTML方法，例如

```js
document.getElementById("container").innerHTML += "<p>more content</p>";
```

你也可是使用DOM创建技术，他们更安全但是不比innerHTML快

```js
var p = document.createElement("p");
p.appendChild(document.createTextNode("more content");
document.getElementById("container").appendChild(p);
```

我们也能通过jQuery移除所有的子节点：
```js
$("#container").empty();
```
等价的原生js使用innerHTM：
```js
document.getElementById("container").innerHTML = null;
```

或者一个小函数

```js
var c = document.getElementById("container");
while (c.lastChild) c.removeChild(c.lastChild);
```

最后，我们使用jQuery从DOM移除这整个元素：

```js
$("#container").remove();
```

或者原生js
```
var c = document.getElementById("container");
c.parentNode.removeChild(c);
```

# SVG
SVG也有DOM，但是jQuery没有向这些对象提供一个直接的操作方法，因为通常需要使用像createElementNS和getAttributeNS.但是有许多[插件](http://keith-wood.name/svg.html)可供使用，但是更有效的方法是自己打代码或者使用像[Raphaël](http://raphaeljs.com/)和[svg.js](http://svgjs.com/)这样的库


# HTML5表单
使用jQuery或是原生js？
都不要

HTML5指出不同的input type，例如 emails, telephones, URLs, numbers, times, dates, colors和通过正则表达式的自定义表单，例如，如果你想要强制用户输入邮箱地址，可以使用：
```html
<input type="email" name="email" required="required" />
```
