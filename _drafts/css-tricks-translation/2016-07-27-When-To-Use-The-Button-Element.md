# When To Use The Button Element
# 什么时候使用button元素

[原文链接](https://css-tricks.com/use-button-element/)
你想要一个在你的网页上使用一个用户可以点击的按钮？好吧，不幸的是，这比看上去要复杂许多，尽管不是太糟糕，让我们解决它吧。
它看起来像这样：

```html
<button>
    Do Something
</button>
```

什么是点击一些东西最平凡的结果？跳转到一个新的URL，就好像你会点击一个链接(一个 `<a href="/eaxmple/"></a>` 元素)一样

对于<button>元素自身来说，它不能那样做。但是这些年有许多关于允许"链接任何地方"的[说法](http://meyerweb.com/eric/thoughts/2008/07/23/any-element-linking-demo/)，但是没有哪种成功了。

当按钮在它的自然环境中被使用的时候，尽管点击一个按钮确实做了某些事情。

## Button是一个表单元素

Web表单中有提交按钮，你可能会想到这个：

```html
<form action="/" method="post">
    <input type="submit" value="Submit">
</form>
```
在一个 `<form>` 元素中的`<button>`元素，默认情况下，它的行为和上面的submit input表现 **相同**

```html
<form action="/" method="post">
  <button>Submit</button>
</form>
```
然而？？？？，表单也能够有重设按钮，你能够通过改变默认的提交(submit)类型去重设来复制这个行为。
```html
<form action="/" method="post">
  <button type="reset">Reset</button>
</form>
```
点击这个按钮将会清除父元素 `<form>` 下所有的输入信息(input和textarea)。

## Button能够有内容

使用 `<button>` 的首要原因是它具有开标签和闭标签(</button>)，这意味着我们可以在里面放置一些内容，一个普通的例子像这样:

```html
<button>
  <img src="tiny_birthday_cake.png" alt="">
  Submit
</button>
```
