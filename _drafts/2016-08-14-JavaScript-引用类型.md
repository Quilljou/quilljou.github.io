# 引用类型

## Object类型
Object类型常用来保存数据，可以使用两种方法来创建、
```js
var people = new Obejct();
people.age = 29;
people.name = 'foo';

or

var people={
    age: 29;
    name : 'foo';
}
```
## Array类型
Array的length属性可以得到数组的长度，所以数组的最后一项的索引是length-1

### 检测数组
value instanceOf Array 可以检测，但如果页面中有两个框架就会出现问题
所以有专门针对Array.isArray(value)的方法

### 转换方法
这些转换方法不改变原有的数组
valueOf 对于数组使用这个方法会返回原本的数组
toString() 返回一个将数组的每一项以逗号连接的字符串
toLocaleString() 待讨论
join()  可以使用任意字符串将数组的每一项连接起来

### 栈方法
push() 将一个值从数组的尾部插入
pop()  将一个值从数组的尾部推出
shift() 将一个值从数组的首部推出
unshift() 将一个值从数组的首部插入

### 重排序方法
sort()
reverse()
