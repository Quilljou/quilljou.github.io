---
title: Typescript 高阶类型
date: 2019-06-19 15:10:42
tags:
---

大部分示例和教程来自优秀的 [A. Sharif](https://dev.to/busypeoples) 的系列文章 

## 泛型 和 extends

```ts
function prop(obj, key) {
  return obj[key]
}
```

这样一个函数如何让其类型安全呢？

```ts
function prop<T, Key extends keyof T>(obj: T, key: Key) {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Test User",
  points: 0
};

const userName = prop(user, "name"); // const userName : string;
```

需要像这样使用到泛型，因为我们不知道这个 obj 的类型定义是怎样的，所以我们需要使用 T 来作为 obj 的定义的占位，T 是第一个泛型参数。Key 是第二个泛型参数，它 extends 自 T 的所有 key 值，Key 在这里就是 `"id" | "name" | "points"` 的所有子集。

在使用的时候我们可以不用显式的传入泛型参数，因为我们给函数传参的时候，TS 编译器就已经帮我们推到出来正确的泛型参数了，并且验证了第二个参数的类型必须是 extends 自 T 的所有 key 值。这就为我们提供了鲁棒性非常的类型安全的函数了，还有自动补全的功能哦。

##  Conditional Types

条件类型自 Typescript 2.8 引入。 它的定义是

> "A conditional type selects one of two possible types based on a condition expressed as a type relationship test"

```ts
type S = string extends any ? "string" : never;

/*
type S = "string"
*/
```

这个三元操作符的解释是如果 `string` 类型 extends 自 `any` 类型，（答案是明显的YES）。那么类型 S 的定义就是 `string`，否则就是 `never`。

常见的应用就是标准库中 `Exclude` 的定义。

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

`Exclude`可用于两个联合类型之间取差集。



## Pick、Exclude 和 Omit

在 `lodash` 库中有两个实用的方法，`pick` 和 `omit`. 

```js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

`pick` 用于由选取的对象属性组成新的对象。

```js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```
`omit` 的释义是消除。与 `pick` 相反; 此方法创建一个对象，消除指定的属性，剩下的对象属性组成一个新的对象。


### Pick

在 Typescript 中也有类似的概念。只不过被操作的对象不是对象字面量，而是类型.

Pick 在 Typescript 的标准库中的定义是

```ts
type Pick<T, K extends keyof T> = { 
    [P in K]: T[P];
}
```

可以看出 Pick 也是一种类型，可用于创造新的类型。这个新的类型的 key 值为泛型 T 的所有 key 值的联合类型的子集。


```ts
interface Person {
    name: string;
    age: number;
    location: string;
}
type PersonWithouLocation = Pick<Person, 'name' | 'age'>
// => type PersonWithouLocation = {
//     name: string;
//     age: number;
// }
```

那如何为 `_.pick` 加上类型呢？

```ts
declare function pick<T extends object, K extends keyof T>(object: T, paths?: K[]): Pick<T, K>

var object = { 'a': 1, 'b': '2', 'c': 3 };
const result = pick(object, ['a', 'c']); 
// const result: Pick<{
//     'a': number;
//     'b': string;
//     'c': number;
// }, "a" | "b">
```
使用泛型和 `Pick` ,我们就得到了一个类型安全的 `pick` 方法


### Omit

在 Typescript 3.5 版本才引入 `Omit` 类型。

`Omit` 作为 `Pick` 的反操作，我们想得到和上面 Pick 相同的操作只需要对类型的键值取反即可。

```ts
interface Person {
    name: string;
    age: number;
    location: string;
}
type PersonWithouLocation = Omit<Person, 'location'>
// 结果是
// type PersonWithouLocation = {
//     name: string;
//     age: number;
// }
```

Omit 在标准库中的定义是

```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

Omit 实现中的第二个泛型参数为什么不是 `K extends keyof T`，而是使用的 `K extends keyof any`呢？这样 IDE 就不能在第二个参数帮助补全了，这是我的一个疑问。在 Stack Overflow 上有找到 key 值可能是 `string | number | symbol` 三种类型。

让我们看看 Omit 的实现，就是 Pick 出 T 中 keyof T 和 K 的差集组成新的类型。也就是说消除了第二个参数中为键值的类型组成新的类型。

那如何为 `_.omit` 加上类型呢？

```ts
declare function omit<T extends object, K extends keyof T>(object: T, paths: K[]): Omit<T, K>

const result = omit(object, ['a', 'b']); 
// const result: Pick<{
//     'a': number;
//     'b': string;
//     'c': number;
// }, "c">
```

扩展一下，也许某些时候 `omit` 方法的第二个参数可能是扩展运算符。例如

```js
function omit(object, ...rest) {
    // do omit
}
omit(object, 'a', 'b')
```

那这个时候的类型定义应该是这样

```ts
declare function omit<T extends object, K extends keyof T>(object: T, ...paths: K[]): Omit<T, K>
```






## infer
infer 是 TS 的一个关键字，用于显式类型推断。与之相关的常见的两个类型就是 `ReturnType` 和 `Parameters`

```ts
function getInt(a: string) {
  return parseInt(a);
}

type A = ReturnType<typeof getInt>; // => number
```

再这个例子中，我们先需要使用 `typeof` 关键字获取函数的类型定义，也就是 `(a: string) => number`, 然后再将其作为泛型参数传入 `ReturnType`。这样就能从一个函数声明得到它的返回类型，这可以在写代码的时候减少我们一些心智负担，能够非常灵活的获取类型。

`ReturnType` 在标准库中的实现是 

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

对这个实现的解释是，如果类型 T 是扩展自函数类型，那么返回值就是 infer 关键字推断出的 R 类型，如果不是，就返回 `any` 类型。

根据这个实现我们还能实现一个高阶类型用于推断函数参数。

```ts
type ParametersType<T> = T extends (...args: infer K) => any ? K : any;
```

使用这个类型推断出的类型是参数元组类型。

其实这个类型在标准库中的的实现是这样的，只不过这个标准库实现了限定了泛型入参的类型必须为函数类型。

```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

`lib.es5.d.ts` 中还实现了很多类似的高阶类型。可参考 [官网](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Mapped types 映射类型

常见的 Mapped types 都很简单, 可以简单过一下

### Readonly

假设我们有如下类型。

```ts
type User = {
  readonly id: number;
  name: string;
}
```

```ts
type Readonly<Type> = {readonly [key in keyof Type ]: Type[key]};
type ReadonlyUser =  Readonly<User>;
```

`Readonly` 的实现就是让泛型的每一个 key 都用 `readonly` 关键字标注，这样就能得到每一个 key 都是 readonly 只读的类型了。

### Partial

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

同理使用 `?` 让每一个 key 都可选。

```ts
type BlogPost = {
  id: number;
  title: string;
  description?: string;
}

type PartialBlogPost = Partial<BlogPost>;
/*
=> type PartialBlogPost {
  id?: number | undefined;
  title?: string / undefined;
  description?: string / undefined;
}
*/
```

### Required

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

`Required` 类型和上两个差不多，需要注意的是 `-` 这个修饰符，它意味着去除后面的可选修饰符 `?`, 那就是每一个 key 都是必需。同理也存在 `+` 修饰符。

```ts
type BlogPost = {
  id: number;
  title: string;
  description?: string;
}

type RequiredBlogPost = Required<BlogPost>;
/*
=> type RequiredBlogPost {
  id: number;
  title: string;
  description: string;
}
*/
```

### Record

在刚开始学习 TS 的时候，`Record` 的实现和使用场景让我比较困惑。

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

```ts
type ExportFormat = "jsonMiniDiary" | "md" | "pdf" | "txtDayOne";
const fileExtensions: Record<ExportFormat, string> = {
	jsonMiniDiary: "json",
	md: "md",
	pdf: "pdf",
	txtDayOne: "txt",
};
```

这是一段来自 real world 的代码。通过这段代码，能看到 `Record` 能够帮助我们获得类型安全的对象声明。