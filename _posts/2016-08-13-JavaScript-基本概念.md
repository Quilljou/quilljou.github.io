# 数据类型
## null
null代表一个空对象指针，所以对其使用typeof操作数返回'object'
var somevar = null,意在初始化这个变量，这个变量今后要保存对象
null == undefined,返回ture。这是因为==二元操作符旨在转换数值作比较
null === undefined,返回false

## Boolean
对于不同的数据类型使用Boolean函数，可以得到下面的结果

|Boolean|true|false|
|----|----|-----|
|string|非空字符串|''空字符串，不是' '|
|对象|任何对象|null|
|Number|任何非零数字|0或NaN|


## Number
数字值前缀**0x**代表16进制数
数字值前缀**0**代表8进制数
十六进制和八进制数计算后都会转换成十进制数
仅有0.1+0.2=0.30000000000000004
Number.MAX_VALUE和Number.MIN_VALUE分别保存着JavaScript所能表示的最大值和最小值，可以使用isFinite()函数，如果是在最大值和最小值之间没，则返回ture

## NaN
任何涉及NaN的操作都会返回NaN
NaN同任何数都不相等，包括它自身
isNaN()在接收了一个参数后，尝试将其转换成数值，如果能转换成数值，则返回false，否则返回true;这个参数甚至可以适用于对象，依次调用valueOf(),toString()方法对其进行判断

## 数值转换
几种数据类型之间总存在类型转换的需要;上述的Boolean()函数就是一例
如果需要将一个非数值转换成数值就有以下三种函数可以执行

1.Number(),接受任何数据类型

||Number()|结果
|---|---|---|
|String|''和' '|0|
|String|'ASFJ1234'(含有字符的数字值)|NaN|
|String|' 1234'或'01234'(会去掉空格或者0)|1234|
|String|'0x12'(十六进制转换成十进制,八进制遵循上一条)|18|
|Boolean|true|1|
|Boolean|false|0|
|Number|十六进制八进制都转换成十进制|--|
|null|返回0|0|
|undefined|返回NaN|NaN|
|Object|依次调用valueOf(),toString()方法对其进行判断|--|

2.parseInt(),只接受字符串

八进制不再解析
十六进制正常解析
可以为其传入第二个参数，如16,8将其转换成特定进制的数
字符串中非数字值如果出现比数字值早，则返回NaN
字符串中非数字值如果出现比数字值晚，则取得非数值之前的数值
''和' '都返回NaN，先导0忽略
浮点数被转换成整数

3.parseFloat(),也只接受字符串
与parseInt()的不同就是忽略前导0，不再解析十六，八等非十进制数
解析浮点数

## String
### toString()

将其他类型的值转换成字符串
除null和undefined之外，每种数据类型都有toString()方法
在对纯数字使用toString()方法时，可以传入参数如2,8,10,16，默认是10，转换成对应进制的字符串输出

### String()函数
如果值有toString方法，则调用toString()方法
如果是null，返回null
如果是undefined，返回undefined.


## Object
创建对象的方法有两种
var obj = new Object();
var obj = {};
第五六章详解

## 关系操作符

### 大小比较，遵循一下几条原则
1. 如果两个数都是纯数值，那就单纯比较数值大小
2. 如果一个数是字符串，那么就比较字符编码值
3. 如果两个数都是字符串，那么就将字符串转换成数值，再比较
4. 布尔值先转换成数值，再比较
5. 对象，先使用它的valuOf()方法，如果没有这个方法，就用toString()方法

### 相等比较
相等和不相等，先转换再比较;全等和不全等，不转换只比较
相等比较时使用上面的转换规则进行比较
NaN和任何数不等，包括它自己
null == undefined

## 条件操作符
var VARIABLE = BOOLEAN_EXPRESSION ？ TRUE_VALUE : FALSE_VALUE

## 
