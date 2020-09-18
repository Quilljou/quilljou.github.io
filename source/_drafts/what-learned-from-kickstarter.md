---
title: what-learned-from-kickstarter
date: 2019-11-20 15:14:34
tags:
---

## 更强大的枚举

- 计算属性

## 函数重载


## MVVM better for testing


## failable
很多情况下返回的都是 Optional,(json decode, URL 构造，字典取值) 需要 unwrap Optional, 保证了代码的健壮，不会轻易 crash

## lazy initializer
可以使用 lazy 标识类属性，这个属性只有在被使用的时候才会被初始化。

## guard
if 的反操作。代码更利于阅读

## 多参数名
给函数内部，外部定义不同的函数参数名

## MVVM

model view viewmodel

view -> bingding -> viewmodel

reactiveswift

singal
singalproducer

pipe

startsWithValue

ui/network => singalproducer => startsWithValue

hot stream   positive => singal
cold stream  passive, only you ask for it  => singalproducer