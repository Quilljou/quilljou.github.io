title: 学习mongo-shell
date: 2016-10-30 13:30:31
<!-- tags: -->
description: Mongodb是node世界中最常用的数据库，在这里记录下最基本的mongodb的shell交互命令和操作
---

## 开启mongodb

１. 启动mongod

```shell
# sudo /usr/bin/mongod
sudo service mongod start

```

2. 进入mongo shell

```shell
mongo
```
## 基本命令
```js
db　当前数据库
use <dbname> 更换数据库
show dbs
show collection
```


## Mysql VS Mongodb

MySQL	MongoDB
Table	Collection
Row	Document
Column	Field
Joins	Embedded documents, linking

mongo的collection对应mysql中的table,document对应row,让我们想象有一个collection存储着一个网站所有用户的信息，那么每一个document都对应这一个用户，也就相当于mysql中的row。而mongo存储数据的形式类型于JavaScript的对象，那么对象的key 就是schema所定义的，而value就是存储的数据。所以mysql中的column在mongo中实际上是不存在的，可以把每个相同的Key所对应的value的集合看成一个column,这个key在mongo中叫做fiel.

## Mongo shell crud

**增加 create**

1. 新建colllection
shell中不需要显示创建,插入document时如果不存在就会自动创建

2. 新建document

基本形式　db.collection.insert()。
insert()中传入document
形如

```js
db.users.insert(
	{
		name: 'quill',
		age: '20',
		gender: 'male'
	}
)
```

insert()是方法,还有如下方法

```js
db.collection.insertOne()  插入单个document
db.collection.insertMany() 插入多个document，必须用[]包含要插入的document
db.collection.insert() 　可插入一个或多个document
```

<!-- #### _id key -->
`_id` field
在mongo中每一个document都需要一个独一无二的id，如果insert的时候没有显示指定，就会自动创建一个很长的id


**查找 read**
基本形式　db.collection.find({})
find()中传入筛选条件

```js
db.user.find().pretty()   // 输出易于阅读的模式
```
*详细参考[docs](https://docs.mongodb.com/manual/tutorial/query-documents/)*

**修改 update**

基本形式　db.collection.update()

形如insert(),update也有如下多种方法

db.collection.update()
db.collection.updateOne()
db.collection.updateMany()
db.collection.replaceOne()

update()传入三个参数,过滤条件，修改对象，修改选项
形如
```js
db.user.update(
	{name:'quill'},
	{$set: {age:'21'}},
	{ multi: true}
)
```
*详细参考[docs](https://docs.mongodb.com/manual/tutorial/update-documents/)*


**删除 delete**
基本形式　db.collection.remove()
delete中传入过滤条件对象
*详细参考[docs](https://docs.mongodb.com/manual/tutorial/remove-documents/)*
