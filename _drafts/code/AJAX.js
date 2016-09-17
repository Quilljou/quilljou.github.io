// 创建一个XHR对象的实例
var xhr = new XMLHttpRequest();

// open()方法,接收三个参数,分别是请求的类型,请求的URI(默认是相对路径),是否异步(默认false)
// open方法并不会真正的发送请求,而只是启动一个请求一杯发送
xhr.open('post','test.php',false);

//send()方法,发送请求,需要一个参数,请求主体?如果不需要请求主体,需要传入null
xhr.send(null);

//收到响应后,服务器返回的数据会自动填充xhr对象的属性,包括
// 1.responseText  返回的文本
// 2.responseXML   如果返回xml文件的xml dom
// 3.status    响应的HTTP状态
// 4.statusText   HTTP状态的说明

if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
    console.log(xhr.responseText);
}else {
    console.log('Request was unsucccessful:' + xhr.status);
}
