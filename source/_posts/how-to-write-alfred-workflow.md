---
title: 如何编写 Alfred Workflow
date: 2018-12-04 21:54:16
tags:
---

## :sparkles: 前言

每当有人问到有什么 macOS 上的提升效率的神器，[Alfred](https://www.alfredapp.com/) 都是我脑海里第一个蹦出来的答案。Alfred with Powerpack 更是强上加强。
几乎 mac 里的一切都可以通过简单的 `⌘ + space`（我的 Alfred 快捷键）获取到。

Alfred 的 workflows 是一个使我非常兴奋的功能。它能充分满足程序员自给自足的乐趣。

今天我们不介绍 Alfred 的那些优秀的功能。只来学习下如何开发自己的 workflow。

这是成品 [alfred-gitmoji-workflow](https://github.com/Quilljou/alfred-gitmoji-workflow)。效果如下：
<center>

![alt](https://github.com/Quilljou/alfred-gitmoji-workflow/blob/master/screenshots/demo.gif?raw=true)

</center>

> [Gitmoji](https://github.com/carloscuesta/gitmoji) 是一个标准化和解释在GitHub提交消息上使用emojis的计划。可以理解为用来规范 git commit message 中 emoji 的使用的。

通过在 Alfred 中键入 gitmoji 就会列出所有的 gitmoji，可以通过 [gitmoji](https://gitmoji.carloscuesta.me/) 官网中提供的 emoji 名称和释义来搜索。按下回车就复制到了粘贴板，并且粘贴到你当前 focus 的窗口的输入框。

## :wrench: 搭建工作环境

在 Alfred 打开时，键入 `⌘ + ,` 就会进入到偏好页。在 Alfred偏好页 -> Workflows 左侧 workflow 列表的最下方点击加号新建一个空白的 workflow。

<center>

![abc](http://pjcw35d11.bkt.clouddn.com/workflow-list.png)

</center>

在创建 workflow 的弹窗，填写好基本信息，需要注意的是 Bundle Id 是你这个 workflow 的签名。需要填写的独特一些。

<center>

![alt](http://pjcw35d11.bkt.clouddn.com/create-workflow)

</center>

在空白的 workflow 界面，右键。根据我们这次需要开发的 wolkflow 的特性选择 Inputs 为 Script Filter。

<center>

![alt](http://pjcw35d11.bkt.clouddn.com/workflow-script-filter)

</center>

然后填写关键词的一些描述信息，包括输入关键词的标题，副标题，和 Loading 时的占位词等等一些设置。

当然最重要的就是设置得到用户输入之后，对这个输入进行处理然后输出的脚本。

<center>

![alt](http://pjcw35d11.bkt.clouddn.com/workflow-hotkey)

</center>


Alfred 提供了几种脚本语言的运行时。

<center>

![languages](http://pjcw35d11.bkt.clouddn.com/workflow-langs)

</center>

一开始觉得这种插件的开发应该是 JS 的天下。没想到在 Github 上用来开发 workflow 的最多的语言居然是 PHP。我也随大流的选择了 PHP 来进行这次开发。


脚本输入框内就是最关键的两行代码，我们的脚本入口：

```php
$query = urlencode( "{query}" );
require_once("gitmoji.php");
```

在 Alfred 中。输入`gitmoji`， 这个关键字后面输入的文字就作为 `{query}` 作为我们脚本的输入。也就是上面我们把这个输入 `urlencode` 之后赋给了变量 `$query`。我们然后引用了 `gitmoji.php`。我们做的搜索逻辑就是在这个 php 文件中完成的。

在列表中右键这个 workflow, 选择在 Finder 中打开，我们就可以看到两个文件。`info.plist`, `icon.png`。`info.plist` 就包含了我们刚刚填写的所有基本信息和设置选项的 xml 文件。你可以双击打开查看。
所以再创建一个 `gitmoji.php` 就完成了一个 workflow 的开发了。

<center>

![alt](http://pjcw35d11.bkt.clouddn.com/workflow)

</center>


刚刚打开的路径是`/Users/xxxx/Library/Application\ Support/Alfred\3/Alfred.alfredpreferences/workflows/user.workflow.xxxxx/`。

我们一般不会选择直接在上面这个路径我们的开发目录，因为这根本不是我们的开发地盘。

所以在自己常用的开发目录下新建一个目录，将上面得到的两个文件拷贝过来。我们新建一个空白的 workflow 的目的就是先得到这两个文件。

我们不在 Alfred 存放 workflow 的目录开发，那我们怎么将我们源码放置到 workflow 指定的目录呢？

其实 Alfred 的 workflow 的文件扩展是类似 `gitmoji.workflow` 的一个压缩文件。双击这个压缩文件 Alfred 就会安装这个插件到上面的路径。

所以我们就需要一个脚本帮我们完成这个压缩（打包）的工作。

这里借鉴(copy)的是 [alfred-github-workflow](https://github.com/gharlan/alfred-github-workflow/blob/master/bin/build) 的打包脚本。

```php
#!/usr/bin/env php
<?php
// Forked from https://github.com/gharlan/alfred-github-workflow/blob/master/bin/build

$dir = dirname(__DIR__);
$VERSION = "1.0.0";
require $dir.'/workflows.php';

$plist = $dir.'/info.plist';

exec(sprintf('/usr/libexec/PlistBuddy -c "Set :version %s" %s', $VERSION, escapeshellarg($plist)));

// $changelog = file_get_contents($dir.'/CHANGELOG.md');
// $changelog = str_replace("\n", '\n', $changelog);
// exec(sprintf('/usr/libexec/PlistBuddy -c "Set :readme \"%s\"" %s', escapeshellcmd($changelog), escapeshellarg($plist)));

$zipFile = $dir.'/github.zip';
if (file_exists($zipFile)) {
    unlink($zipFile);
}

$zip = new PharData($zipFile);

$files = array(
    'icon.png',
    'info.plist',
    'gitmoji.php',
    'README.md',
    'workflows.php',
);

foreach ($files as $file) {
    $zip->addFile($dir.'/'.$file, $file);
}
foreach (glob($dir.'/icons/*.png') as $path) {
    $zip->addFile($path, 'icons/'.basename($path));
}

$zip->compressFiles(Phar::GZ);

$workflow = $dir.'/gitmoji.alfredworkflow';
if (file_exists($workflow)) {
    unlink($workflow);
}
rename($zipFile, $workflow);
```

它所做的事情就是将源码（workflow 需要的几个文件）通过 php 的 PharData 类将生成一个压缩包。双击就能被 Alfred 安装。安装也就是解压缩之后复制到 workflow 的工作目录。

## :rocket: 写脚本

```php
<?php
require_once('workflows.php');
$w = new Workflows();
$query = urldecode(strtolower(trim($query)));

<!-- 一周更新一次 -->
if (filemtime("data.json") <= (time() - 86400 * 7)) {
    $dataUrl = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json';
    $gitmojis = $w->request($dataUrl);
    if (isset(json_decode($gitmojis)->gitmojis)) {
        file_put_contents("data.json", $gitmojis);
    }
}

<!-- 将 gitmoji 的数据设置成 Alfred 可读的数据结构  -->
function setResult($gitmojis) {
    global $w;
    foreach ($gitmojis as $key => $value) {
        $id = $value->name;
        $arg = $value->code;
        $emoji = $value->emoji;
        $title = $emoji." ".$value->description;
        $subTitle = "Copy ".$arg." to clipboard";
        $w->result($id, $arg, $title, $subTitle, ' ');
    }
}

<!-- 通过搜索词过滤出结果 -->
function filter($var) {
    global $query;
    $description = strtolower($var->description);
    $name = strtolower($var->name);
    return strpos($description,$query) !== false || strpos($name,$query) !== false;
}
$gitmojis = json_decode(file_get_contents('data.json'))->gitmojis;
$data = $gitmojis;

<!-- 没有关键词就显示所有 gitmoji -->
if (strlen($query) != 0) {
    $data = array_filter($gitmojis, "filter");
}

<!-- 得到的搜索，设置到缓冲区 -->
setResult($data);

<!-- 将结果输出成 Alfred 可读的 xml -->
echo $w->toxml();
```

脚本只有短短的42行。能这么短的原因是社区有已经封装好的很好用的 [workflow util](https://github.com/jdfwarrior/Workflows)。

我们用到的这个 util 的方法只有`result`，`toxml`。

`result`方法就是把数据推到一个缓冲区，并且设置了 Alfred 最终显示的每一行的数据结构。这个结构包括`$uid, $arg, $title, $sub, $icon`。依次对应唯一ID、结果（复制到粘贴板的字符串）、标题、副标题、icon。注意这里的 icon 只能是本地资源，不能是服务器资源。

`toxml`方法就是把缓冲区的数据转成 Alfred 可读的 `xml` 格式。


我做的事情就是获取 gitmoji 托管在 github 上的 json 数据，缓存到本地。根据关键词通过字符串匹配名字和释义。将过滤之后得到的数据转成 Alfred 需要的数据格式，然后转成 xml。

然后再终端运行 `./bin/build`。就得到了一个 Alfred workflow: `gitmoji.workflow`。:tada::tada:

双击`gitmoji.workflow`安装，就可以在 Alfred 中和 gitmoji 尽情玩耍了。


## :robot: TODO

其实可以做到事情还有

- 根据不同的语言来搜索 gitmoji。可惜 gitmoji 的维护者说还[没有找到好的方法](https://github.com/carloscuesta/gitmoji/issues/217)维护多语言翻译。
- 为了保持和 gitmoji 源码数据的同步，没有使用 emoji 图片作为 icon。因为这样每次 gitmoji 数据一更新，这个 workflow 也需要更新。
- 增加 update 命令：立即同步 github 数据。
