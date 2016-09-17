//创建对象的几种方法

// 1.字面量
var language = {
    'version' : 'es2015',
    'name' : 'JavaScript',
    'founder' : 'someone',
    showVer : function() {
        console.log(this.version);
    }
}

for(var i in language) {
    console.log(i);
}
console.log(language);

// 2.工厂模式
function createLanguage(version,name,founder) {
    var oo = new Object();
    oo.version = version;
    oo.name = name;
    oo.founder = founder;
    oo.showVer = function() {
        console.log(oo.version);
    }
    return oo;
}

var js = createLanguage('es5','js','me');

console.log(js);
console.log(js.showVer());


// 3。構造函數模式
function Language(version,name,founder) {
    this.version = version;
    this.name = name;
    this.founder = founder;
    this.showVer = function() {
        console.log(this.version);
    }
}

var java = new Language('8','java','someone');
var javascript = new Language('2015','javascript','someone');

console.log(java.constructor === Language);
console.log(javascript.constructor === Language);
// 每个实例都有一个属性，constructor指向构造函数

console.log(java.valueOf());

// 3.1 构造函数也是函数，任何函数通过new 来调用就是构造函数，如果不通过new调用，就是普通的函数
Language('3','python','google');   //作为普通函数调用，这时作用域是全局
showVer()   //全局中的showVer()函数


var o = new Object();
Language.call(o,'2','python','me');   //在另一个对象的作用域调用
console.log(o.name);

// 3.2 构造函数的问题
// 每实例化一个对象，同时实现相同功能的方法就实例了一次，这造成了内存的浪费，使用原型模式来解决

// 4. 原型模式
function Lang(){}; //== new Function()
Lang.prototype.name = 'php';
Lang.prototype.version = '6';
Lang.prototype.founder = 'bird';
Lang.prototype.showVer = function showVer(){
    console.log(this.version);
}
var hp = new Lang();
var ph = new Lang();
console.log(hp.showVer == ph.showVer);
// 共享的属性和方法通过原型对象保存
console.log(Lang.prototype.constructor == ph.constructor);
// prototype是函数的属性,指向函数的原型对象，constructor是对象的属性，原型对象自动获得一个constructor属性,指向这个构造函数
console.log(hp.__proto__ === Lang.prototype);
//实例对象都有一个指针[[prototype]]指向原型对象,通过__proto__属性实现了
//实例对象的__proto__方法指向构造函数的原型对象,如果实例对象上没有的方法和属性在实际调用中可以获得,这说明实例对象上的方法,属性都继承自这个实例对象,实例对象与构造函数之间并没有直接的联系,而是通过构造函数的原型对象联系

console.log(Lang.prototype.isPrototypeOf(hp));  //true
// 原型对象的isPrototypeOf方法可以检测原型对象是否是实例对象的原型


console.log(hp.hasOwnProperty(name));  //false
// hp没有自己的name属性,而是通过原型链继承圆形对象的name属性而来的

console.log(Object.getPrototypeOf(hp) === Lang.prototype); //true
console.log(Object.getPrototypeOf(hp).showVer()); //6
// 通过Object.getPrototypeOf()方法可以获得实例对象的原型

hp.name = 'c';
console.log(hp.name); //c
console.log(ph.name); //php
// 在实例对象中添加与原型对象中同名的属性会屏蔽掉原型的属性,通过delete操作符删除实例中的属性,就可以恢复连接
delete hp.name;
console.log(hp.name); //php
console.log(ph.name);  //php


// in操作符可以检测属性是否在某一对象中,可以根据原型链查找
ph.name = 'ruby';
console.log('name' in ph); //true
delete ph.name;
console.log('name' in ph); //true
console.log(ph.hasOwnProperty(name)); //false

var keys = Object.keys(hp.__proto__);
console.log(keys);  // [ 'name', 'version', 'founder', 'showVer' ]
//使用Object.keys()方法接受一个对象作为参数,返回当前对象上的所有可枚举的属性的数组

var allkeys = Object.getOwnPropertyNames(hp.__proto__);
console.log(allkeys);
//Object.getOwnPropertyNames()方法可以返回该对象上所有的不论是否可以枚举的属性

// 更简单的原型语法
// 每次为一个原型对象添加方法都要写Lang.prototype的代码,这样不够DRY,可以这样
function Person(){};

Person.prototype = {
    name : 'quill',
    age : '20',
    gender : 'male'
}
//使用对象字面量重写了整个原型对象,这样更DRY
console.log(Object.getOwnPropertyNames(Person.prototype));  //[ 'name', 'age', 'gender' ]
console.log(Person.prototype.constructor === Person);  //false
console.log(Person.prototype.constructor === Object);  //true
//这样做虽然更DRY,但是Person的原型对象的constructor属性就不再指向Person了,而是指向Object,为什么呢,因为使用字面量等同于
var obj = new Object();
obj.name = 'quill';
obj.age = '20';
obj.gender = 'male';

console.log(obj.constructor);  //Function Object

//因此如果想要恢复默认的constructor,可以显示的指定constructor

Person.prototype.constructor = Person;
console.log(Person.prototype.constructor === Person);  //true

var son = new Person();
console.log(son.constructor);  //Function Person

// 原型是动态的,如果先实例化一个对象,再在原型对象上增加或修改删除属性,都会动态的反应出来
console.log(son.age); //20
Person.prototype.age = '22';
console.log(son.age);  //22
//这是因为实例和原型之间的松散连接关系,因为son实例中没有age这个属性,调用这个属性时,它自然在原型链中去搜索,而这是原型的age属性已经改变,所以找到的就是改变后的属性了

//如果在实例化一个对象之后,重写了这个构造函数的原型,那么这个实例与原型之间的指针就断开了
function Books(){};

var ab  = new Books();

Books.prototype = {
    name : 'good part'
}

console.log(ab.name);
//所以在已经实例化对象后不可以再使用对象字面量重写原型

//原型模式的问题,原型模式最大的问题在于共享,实例对于不是自己私有的属性,如果对其进行修改,则会反应在每一个实例当中

// 5.组合使用构造函数模式和原型模式
function Car(brand,wheel,seats){
    this.brand = brand;
    this.wheel = wheel;
    this.seats = seats;
    this.money = [100,200];
}

Car.prototype = {
    constructor : Car,
    showBrand : function showBrand() {
        console.log(this.brand);
    }
}

var ford = new Car('ford','4',5);
var bmw = new Car('bmw','4',2)

ford.money.push(300);
console.log(ford.money);
console.log(bmw.money);


//6.动态原型模式,在上面的组合使用构造函数和原型模式中,构造函数和原型模式是独立分开的,没有体现函数的封装性,所以采用下面更加完美的动态原型模式

function Car(brand,wheel,seats){
    this.brand = brand;
    this.wheel = wheel;
    this.seats = seats;
    this.money = [100,200];
    if(typeof this.showBrand != 'function') {
        Car.prototype.showBrand = function showBrand() {
            console.log(this.brand);
        }
    }
}

var benz = new Car('benz',4,4);
console.log(benz.wheel);

// 继承的几种实现方法

// 1. 借用构造函数
function SuperType() {
    this.colors = ['red','green','blue'];
}

function SubType() {
    SuperType.call(this);
}

var ins1 = new SuperType();
var ins2 = new SubType();
ins2.colors.push('black');
console.log(ins2.colors);
console.log(ins1.colors);

// 2.组合继承
