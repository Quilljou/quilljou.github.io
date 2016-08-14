# 表单
## 提交表单
type为submit的input和button可以提交表单，而且会触发submit事件
可以使用event对象的preventDefault阻止提交表单
还可以使用form的引用的submit()方法提交表单，但是不会触发submit时间

## 重置表单
type为reset的input和button可以重置表单，而且会触发reset事件
可以使用event对象的preventDefault阻止重置表单
还可以使用form的引用的reset()方法重置表单，会触发reset事件

## 表单字段
form的elements属性可以用来访问form下的字段，可以按照name和[]来取得不同的字段，如果name字段相同，则取得一个NodeList，这样的选择只会选择到是表单字段的元素
### 表单字段共有的属性
value 可读可写
disable 可以设置布尔值，使字段bukeyong
。。。
为了防止多次提交表单，监听form，在触发submit事件的时候禁用提交按钮

### 表单字段共有的方法
focus() 对某一个字段使用，能够激活该字段
blur() 与focus()相对，使用比较少
可以使用HTML5的autofocus在html中使用，自动聚焦

### 表单字段共有的事件
focus  在表单被聚焦的时候触发
blur   失去焦点时触发
change 对于input和textarea是失去焦点且value值改变时触发，对于select，改变选项时触发
可以利用这些事件在进行表单填写的时候进行一些交互
