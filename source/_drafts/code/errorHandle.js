try {
    global.totallyNoSense();
} catch (e) {
    console.log(e.name);  // 打印错误类型
    console.log(e.message);  //打印错误信息
    console.log(e.stack);  //打印栈跟踪信息
} finally {
    //finally子句是可选的,无论try语句和catch语句是否执行,finally语句一定会执行,如果使用了finally语句,那么catch语句就是课选的了
}


// 7种错误类型
Error  //所有错误的基类
EvalError  //使用eval函数时发生的错误
TypeError   // 变量的类型不符合
SyntaxError  //语法错误
ReferenceError   //引用错误,找不到对象
RangeError  //超出数值范围
URIError  //使用encodeURI()或decodeURI()时,URL格式不正确

try{
    someFun()
}catch(e) {
    if(e instanceof TypeError) {
        // do something
    }else if (e instanceof SyntaxError) {
        // do something else
    }else {
        // fine
    }
}
