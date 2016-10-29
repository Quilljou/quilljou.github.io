# Traceroute，MTR和Ping

## Traceroute
traceroute意为路由跟踪

### 安装
几乎每个Linux发行版都默认安装了traceroute，但是Ubuntu16.04没有，所以

```
sudo apt-get install traceroute
```
### 使用
在终端输入

```
traceroute google.com
```
输出如下

```
traceroute to google.com (37.61.54.158), 30 hops max, 60 byte packets
 1  RT-AC54U (192.168.1.1)  0.955 ms  5.136 ms  5.199 ms
 2  1.157.137.219.broad.gz.gd.dynamic.163data.com.cn (219.137.157.1)  11.023 ms  13.949 ms  13.937 ms
 3  121.8.90.5 (121.8.90.5)  15.363 ms  17.008 ms  19.002 ms
 4  183.56.30.1 (183.56.30.1)  25.816 ms 61.144.3.6 (61.144.3.6)  26.103 ms 58.61.216.45 (58.61.216.45)  26.085 ms
 5  * * *
 6  * * *
 7  * * *
 8  * * *
 9  * * *
10  * * *
省略...
30
```
### 读取输出

第一行代表目标地址是 `google.com` ；最大30跳数，经过路由器的最大数量；传送60字节的包
第二行之下的每一行是每一次路由的信息，从左到右分别代表路由顺序；主机地址；IP地址；三个时间段分别代表一个包到达主机然后返回花费的时间
如果某一行出现了 `*` ,意味着路由到主机出现了问题，使很难诊断出是哪里出现了问题

### 常用的flag

```
traceroute -m 255 obiwan.scrye.net
```
改变跳数，最大为255

```
traceroute google.com 70
```
在主机后加上想要传送包的字节大小

```
traceroute -q5 google.com
```

改变每一次主机之间路由传送包的次数，最大为10

```
traceroute -n google.com
```

(? 不显示主机，只显示IP ?)

## MTR
组合了ping和traceroute的功能，mtr允许你不停地询问远程主机来查看延迟和性能变化

### 安装

```
sudo apt-get install mtr -y
```

### 使用

```
mtr github.com
```
mtr与traceroue相比就是可以动态的获取路由的信息，这些信息在不断更新，你可以在一段时间按内看丢包率的变化，这样得出来的结果更加可靠。

## ping

```
ping google.com
```

ping命令会使用固定大小的数据包检测网络连接的速度。PING会非常迅速的告诉用户远程主机是否在线，以及数据在中间传递需要花费的时间;TRACEROUTE会显示中途所有的路由器以及经过每个路由器所花费的时间。

##参考
1. https://www.digitalocean.com/community/tutorials/how-to-use-traceroute-and-mtr-to-diagnose-network-issues
2. http://www.today-wx.com/knowledge/309.html
