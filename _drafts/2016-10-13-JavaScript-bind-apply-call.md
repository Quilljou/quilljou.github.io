bind，
functionName.bind(obj);
// 返回一个函数，这个函数将obj對象綁定在這個函數當中
// 可以傳入參數，執行這個返回的函數

call
functionName.call(obj,arg1,arg2...)
将obj绑定到这个function中，立即执行

apply
functionName.applay(obj,[arg1,arg2...])
// 与call极为类似，只是第二个参数发生了变化，第二个参数是需要传入这个函数的参数数组
