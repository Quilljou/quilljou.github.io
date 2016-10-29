SVG优点
* 压缩后体积小
* 可伸缩，不失真
* 在retina屏幕上效果好
* 可以进行交互

SVG可以使用css进行控制的原因是它和html本质上都是XML，


## 使用SVG的方法
* 可以在img标签的src中引入，和使用其它jpg格式的图片无异，但是这样是不能对svg进行太多的控制的而且不能交互，因为它只是一个图片
* 可以作为背景图片在css的background中插入，这和使用img标签大同小异
* 可以复制svg的xml代码到html中作为一个标签插入，这样做可以充分通过css控制
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 65">
  <path fill="#1A374D" d="M42 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v21l12 15-7 15.7c14.5 13.9 35 2.8 35-13.7 0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
  <path d="M14 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v41c0 8.2 9.2 17 20 17s20-9.2 20-20c0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
</svg>
```
* 使用<object>标签插入像这样

```html
<object type="image/svg+xml" data="data:image/svg+xml;base64,[data]">
  fallback
</object>
```
这样做的好处是可以在浏览器上缓存，而且跨浏览器的兼容性更好，而且可以进行交互
#### 为<object>SVG使用额外的样式表
```html
<?xml-stylesheet type="text/css" href="svg.css" ?>
```
将这个插入到svg标签中

* SVG的Data URL's
另一种使用SVG的方法是把它们转换成Data URL'S,它不要求额外的网络请求
Mobilefish.com有[在线转换工具](http://www.mobilefish.com/services/base64/base64.php)可以转换SVG，把svg代码粘贴进去就可以得到结果，记得清楚结果中的换行空格
