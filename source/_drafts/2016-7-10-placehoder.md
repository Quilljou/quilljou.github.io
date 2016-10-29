## p标签不能嵌套div,ul等块级标签,浏览器或自动分段.并且产生一个空的p块

## 各个元素的概况
块级元素代表它是默认占领整一行的
### p   块级元素,代表一个段落,理所当然段落之间有段落间距,所以有margin-top和margin-bottom,没有默认的padding
### div 块级元素,代表一个division.单纯的一个块,没有默认的margin和padding
### h1  块级元素,h标签代表标题,有默认的与之标题级别想对应的margin-top和margin-bottom,没有默认的padding
### U  行内元素,代表underline,没有默认的margin和padding,可不使用该标签,在css中使用text-decoration: underline;
### big small 行内元素,默认设置分别是font-size: lager,font-size: smaller;均没有默认的margin和padding
### img 行内元素,代表图片,没有默认的margin和padding
### span 行内元素,代表,没有默认的margin和padding
### ul 块级元素,代表列表的包裹块,有默认的margin-bottom,margin-top,还有默认的padding-left,默认的padding存在是让我们可以识别出它就是一个列表.而且列表是可以嵌套的,意味着li可以嵌套div块级元素
### li list-item元素,没有默认的margin和padding
### button 代表按钮,自带2px的border,有默认的margin,padding
### input inline-block元素,无默认margin和paddding有border

## 一个元素的子元素的大小是可以大于父元素的

## css类名,id名不能以数字开头

## 能不使用固定宽度就不用固定宽度

## overflow:hidden可以清除浮动

## 居中的文字不要使用p标签

## 貌似input标签不能设置margin-left

##  visibility:隐藏对应的元素但不挤占该元素原来的空间。
## display:隐藏对应的元素并且挤占该元素原来的空间

# hack

## checkbox,:checked伪属性toggle,使用+,~选择器来toggle input后面的内容

##a:target也可以用来做开关

##一个icon居中的方法，text-align，line-height设置为容器的高度，


## 在reset后，因为html和body都没有了高度，linear-gradient不能被用在html和body上，究其原因，linear-gradient是background-image的值，但是的background-color可以实现。background的范围是盒模型中的content和padding

## clac()计算top值，使其居中，锁区的值应该是calc(50% -height/2)

## 使用inline-block注意子元素之间的留白,100%分成两份50%，一行容不下这两份

## 对于设置了absolute后的元素使用top，left进行定位，注意这个距离是使用离容器的最外那条边框来计算的

## display:flex影响最近的text-align

## transform的百分比单位是基于本身的尺寸，而不是父元素的尺寸

## background-position: right 20px bottom 10px;　　偏移量前面指定关键字，精确定位背景图片

## outline-offset 描边的偏移量，可以为负值

## background-origin: 默认值是padding-box,这样边框才不会遮挡住图片．可以设置为content-box,这样在加上padding,就可以很好的实现背景图片的定位，还可以和background-position复用实现更加适合的背景定位

## background-image的定位background-position基于background-origin，默认是padding-box。而background-color在默认border之下的，因为切割background的边框默认是border-box，这是通过background-clip实现的，可以设置为padding-box，这样background-color就不再border之下了;那有时候设置了background-image为linear-gradient我们会发现它居然也在border之下，这是为什么呢，不是background-origin默认是padding-box吗，按理说渐变应该不再border之下，这是因为background-repeat默认设置为repeat，这样background-image就会覆盖整个元素
》》》》》》
## background
background-clip限制所有的背景，包括image和color
background-color基于background-clip，默认值border-box
background-image在norepeat的情况下基于background-clip的前提下基于background-origin;
如果有background-repeat：repeat则就会把background-image平铺到整个background-color区域
