1. 避免对未经声明的变量进行链式赋值，形如
```js
(function(){
    var a = b = 3;
}())
console.log(b); // 3
console.log(a); // undefined
```
这是因为赋值是从左到右的，这等价于
```js
(function(){
    b = 3;
    var a = b;
}())
```
2. 变量提升,仅仅在顶部声明，未赋值
```js
console.log(a);  // undefined
var a = 3;
```
等价于
```js
var a;
console.log(a);  // undefined
 a = 3;
```
３. parseInt(str,10)显式指明需要转换的进制

４. 定义一个函数后覆盖它自身
```js
function fire() {
    // prepare something
    fire = function(){
        // dosomething
    }
}
```

5. IIFE使用｀(function(){}())｀优于｀(function(){})()｀,较易于阅读
6. 新的思路: 在需要初始化一些东西的时候，可以使用这两种包装一个对象，并调用它的init()方法
```js
({}.init())

({}).init();
```
７. 最佳实践之可以在一个应用中定义一个对象作为全局对象，也是一个命名空间，但缺点显而易见，更多的代码量，解析事件更长
８. 实现一个命名空间函数
```js
App.nameSpace = function(nsString) {
    if(typeof nsString !== 'string') return;

    var parts = nsString.split('.');
    var parent = this;

    if(parts[0] === this) {
        parent = parts[0];
        parts = parts.slice(1);
    }

    for(var i = 0; i < parts.length; i++ ) {
        if(parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {}
        }
        parent = parent[parts[i]];
    }

    return parent;


}
```
9. JavaScript实现私有属性和方法，可以利用函数的作用域，函数外部是不可以访问的，也就是闭包，有选择的暴露公有方法。
10. 特权方法就是可以访问私有变量和方法的方法而已
11. 私有性失效，当通过特权方法返回一个对象时，需要注意了，这时候外部是可以访问并且修改这个对象的，因为对象是按引用传递的。当写一个插件的时候，你把你的私有方法给暴露了，就有可能对整个插件产生影响。解决方案是对需要返回的对象进行复制后再返回

12. 对象字面量的私有性，可以通过两种方法实现
```js
var obj;
(function(){
    //pravite part
    var index;


    // public
    obj.getIndex = function(){
        return index;
    }

}())
```
```js
var obj = (function(){
    // private part
    var index;

    return {
        getIndex: function(){
            return index;
        }
    }

}())
```
13. 
