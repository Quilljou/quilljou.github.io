# jQuery像一盘做好的菜,而JavaScript就是涩口的原材料

## for-in语句在使用getElementsByTagName枚举时会将item和namedItem方法也枚举出来，所以在处理DOM的类数组对象时，使用简单的for循环语句能够正确的枚举出对象，不使用for-in的原因有二：
1. 顺序不能保证
2. 继承的属性可能被枚举出来

http://stackoverflow.com/questions/3056172/javascript-getelementsbytagname-broken-firefox


## ""和" "不同，前者是空字符串，后者不是

## 时间处理程序只会添加到调用on()方法是已经存在的元素上，所以通过ajax更新内容之后，不会触发之前的事件，所以需要使用事件委托

## JavaScript snippets
```js
document.querySelector('button').addEventListener('click', function(evt) {
  this.textContent = this.textContent === 'hide' ? 'show' : 'hide';
  document.querySelector('html').classList.toggle('loading');
}, false);
```

## HTMLcollection只包含元素节点，而Nodelist可包含任意节点


## 元素节点的offsetHeight和offsetWidth是只读的

## JQ可以一次绑定多个事件，当时原生js不可以

##  所有的迭代方法不适用于NodeList
将nodeList转换成Array的两种方法

```js
[].forEach.call(document.getElementsByTagName('div'),function(ele,index,array){})

NodeList.prototype.forEach = Array.prototype.forEach;
//deprecated
//Extending existing DOM functionality through prototypes is often considered bad practice as this can lead to masses of issues.
```
## 不要使用for in迭代数组，它用对象的属性名来迭代

## NodeList包含任何节点类型,而HTMLCollection只包含元素节点
console.log(NodeList instanceof HTMLCollection);

## Element.getBoundingClientRect()
返回一个对象，包含着这个元素的大小尺寸:widht,height，和相对于viewport的位置:top,left,right,bottom


## pageX,pageY相对于可滚动的页面,clientX,clientY相对于viewport
