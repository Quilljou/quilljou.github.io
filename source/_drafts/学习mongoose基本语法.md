---
title: 学习mongoose基本语法
<!-- tags: -->
description: mongoose是mongodb-node最受欢迎的ORM之一，这里记录学习mongoose时候遇到的问题和收获
---

1. mongoose 定义在Schema的methods对象中的方法会被作为实例的方法，而定义在Statics对象上的方法会作为Ｍodel的方法

mongoose查询数据
所有的CRUD都是针对于Ｍodel来操作的
1. 创建Schema　and Model
```js
var UserSchema = new mongoose.Schema(
        {
            name: String,
            age: Number
        }
    )

var User = mongoose.model('User',UserSchema);
// 编译出来的User就是我们所操作的Ｍodel对象，就是一个collection的Ｍodel.它每实例出一个对象就是一个documen
```
2. 操作
- 查询数据
传入callback

```js
User.find({},function(err,result){

    })

// or
User.find().then(cb).catch(cb)  // Promise based
```

不传入callback

```js
var query = User.find()

query.select('name age');
// 选择name 和　age的field

query.exec(function(err,result){
    res.send(result);
})
// 执行任务函数
// 其实可以链式调用上面的方法

User.find()
    .select('name age')
    .exec(function(err,result) {
        res.send(result);
    })
```
不传入返回选取的一个Ｑuery()对象的实例，这个实例上面有许多方法可以使用，[详见](http://mongoosejs.com/docs/api.html#query-js)

存储数据
```js
var user = new User({name:'quill'})
user.save(function(err){
    if(err) return handler(err);
})

// or
User.create({name:'quill'},function(err) {
    if(err) return handler(err);j
}) // note: 这里是Model类上面的create方法，不是save
```


中间件是我们在执行数据库的某一项任务过程中，执行的一些函数
，它有两种类型，针对于document的和Query的，中间件定义在Schema实例上面


1. pre,在执行某项任务之前执行的中间件函数
它也有两种类型，serial和parallel

```js
User.pre('save',function(next){
    // do something
    next()
})
```

```js
User.pre('save',function(next,done){
    // do something
    next();
    setTimeOut(done,100)
})
```

2. post,在执行某项任务之后执行的中间件函数
