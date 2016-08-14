# BOM
## 全局作用域
BOM的核心对象是window,它表示浏览器的一个实例，它既是JavaScript访问浏览器窗口的API，也是EcamaScript中的全局对象，所以网页中的任何变量，函数都会成为window的属性，方法。

全局变量不可以通过delete操作符删除，而直接在window上定义的属性可以被删除（会在window对象上定义属性吗？），这是因为通过var操作符定义的window属性的[[configureable]]的特性默认设为了fasle

## 窗口关系及框架
    待阅读完成

## 窗口位置
以下是window对象的属性：
screenLeft screenTop  
浏览器窗口相对于屏幕左边和上边的位置

innerWidth,innerHeight
浏览器窗口的可视尺寸

outerWidth,outerHeight
浏览器的窗口本身的尺寸,有滚动条的尺寸

以下是html或body的属性：
clientWidth,clientHeight
当前的浏览器窗口的大小，视口的大小


调整窗口大小
resizeTo(100,100) <!--调整到100x100-->
resizeBy(100,50)  <!--在上面的基础上调整，参数是新窗口与旧窗口的差，所以这一行代码调整到200x150-->
移动窗口
moveTo()
moveBy()
由于安全原因，以上四个方法都已被禁用

## 导航和打开窗口
window.open()，这个方法接收四个参数，URL、窗口目标、一个特性字符串、一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值
通常情况下只须传递第一个参数.他会默认为你在新窗口中打开与旧窗口功能一致的新窗口;
第二参数制定窗口在哪里打开，若指定了框架，就会在指定框架中打开，若第二参数制定了一个不存在的窗口或者框架，那就会根据第三个参数的设定打开一根新的窗口，根据这些参数的设定，可以设置工具栏，大小，位置，状态栏等等，（需要时查书），这些名值对以逗号分隔，以等号表示
可以将新打开的窗口赋给一个变量，这个对象的一个属性是opener，是指向旧窗口的指针
window.close(),方法可以关闭新窗口，但是需要触发。
虽然浏览器禁止使用resizeTo等方法，但是在新打开的窗口中可以使用

## 间歇调用和超时调用
setTimeout(<function>,<time>),延时time后调用function。
setInterval(<function>,<time>),每隔time调用function。
调用这两个方法后都会i返回一个ID，可以通过cleartTimeout().clearInterval()来取消执行这两个方法

# location对象
## location是最有用的BOM对象之一，它提供了当前窗口中加载的文档的有关信息
下面列出了loacation的所有属性

|属性名|例子|说明|
|----|:-----:|-----|
|hash|"#content"|返回hash值，即URL中#后免得字符|
|host|"www.host.com:80"|返回服务器名称和端口号（如果有|
|hostname|"www.host.com"|返回不带端口号的服务器名称|
|href|"http://www.href.com"|返回完整的URL|
|pathname|"/page/3"|返回URL中的目录|
|port|"8080"|返回服务器的端口号|
|protocol|"https:"|返回页面使用的协议|
|search|"?q=javascript"|放回URL的查询字符串，以问号开头|

## 位置操作
location对象的assign()方法可以为其传递一个URL来跳转至另一个URL,例如location.assign("..");
同样设置window.location或者location.href同样可以跳转值特定的URL，还可以根据上面表格中的属性到达特定的location。
这样的更改是会在浏览器中留下历史记录的，所以用户可以通过历史记录来进行后退和前进，禁用这种行为可以使用replace()方法来代替assign方法。
还有一个reload()方法,可以重新加载当前页面，如果要强制从服务重新加载，可以为其传入参数true。

# navgitor对象
## navgaitor对象的属性都是关于浏览器的一些信心，例如vendor，language等等等等。可以用于浏览器检测(需要时查询)

## 检测插件
 待阅读

## 注册处理程序
关于RSS订阅和电子邮箱，将一个网站注册成rss或电子邮箱的处理程序

# screen对象

# history对象
该对象保存着用户的历史记录
## go()
通过该对象的go()方法，可以实现页面的前进和后退，可以为其传入整数作为参数
history.go(-1)  //代表后退一页
history.go(2)  //前进两页
还可以传入字符串作为参数，此时浏览器会跳转到历史记录中包含该字符串第一个位置

## back(),forward()
模仿浏览器的前进和后退
