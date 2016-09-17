// 定义函数的两种方式
// 1.函数声明,具有函数提升的作用,不论函数在调用之前还是之后都没关系,var没有提升的作用
function clare(arg) {}
// 2.函数表达式,创建一个函数,并将它赋给一个变量,这个函数是匿名函数,也叫做拉姆达函数
var express = function(arg) {}

// arguments的callee方法是一个指向正在执行函数的指针,已经被弃用
//经典的阶乘函数
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        // return num * factorial(num - 1);
        return num*arguments.callee(num -1);
        // 与函数名这个指针解耦
    }
}
console.log(factorial(5)); //120
// 函数的caller方法指向调用该函数的那个函数,如果在全局环境下调用,则为null
function caller(){
    anotherFun();
}

function anotherFun() {
    console.log(arguments.callee.caller); //解耦
}

caller() //Function: caller

console.log(caller.length);  //0
// 函数的length属性返回函数希望接收的参数个数

// 函数名是指针,函数是对象,函数名是指向对象的指针


//闭包/;
