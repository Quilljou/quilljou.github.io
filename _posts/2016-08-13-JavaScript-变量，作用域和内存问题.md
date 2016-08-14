# 变量，作用域和内存问题
访问变量有两种方式，第一种是按值访问，就是string，boolean，undefin，number，null这几种数据类型，而另一种就是按引用方式，就是对对象的访问

函数的参数传递是按值传递的，基本类型值就是简单的复制，对象传递参数也只是按值传递，对象传递给命名参数后，修改这个参数，不会在外部作用域中体现出来，因为对象传递参数是按值传递的

typeof 检测基本类型值的类型
instanceof 检测引用类型值的类型

with语句和try-catch语句可以延长作用域链

```js
function buildUrl(){
    var qs="?debug=true";

    with(location){
        var url = href + qs;
    }
    return url;
}
```
ES5没有块级作用域，只有函数作用域
