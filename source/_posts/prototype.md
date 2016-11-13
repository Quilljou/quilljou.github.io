<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
        }

        body,
        html,
        ul {
            margin: 0;
            padding: 0;
        }

        li {
            list-style: none;
        }
        .tabbar {
            display: flex;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 60px;
            align-items: center;
            text-align: center;
            justify-content: space-around;
            box-shadow: 0 0px 5px rgba(0,0,0,0.3);
            color: rgb(151, 152, 163);
            background: rgba(255, 255, 255, 0.9);
        }

        .tabbar>div {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .tabbar>div i {
            font-size: 25px;
        }

        .tabbar>div span {
            font-size: 13px;
        }

        .seletced {
            color: #e82c86;
        }

        .nav {
            text-align: center;
            height: 40px;
            width: 100%;
            line-height: 40px;
            background: #fff;
            font-size: 18px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
            box-shadow: 0 0 5px rgba(0,0,0,0.3)
        }
        main {
            /*display: flex;*/
            margin: 40px 0 60px 0;
            overflow: hidden;
        }
        .view {
            /*overflow: hidden;*/
            transition: transform 300ms ease-in-out;
        }
        .item {
            width: 33.3333333333%;
            float: left;
        }
        /*.nav:after {
                position: absolute;
                content: '';
                top: 0;
                left: 0;
                right: 0;
                bottom: 1em;
                border-radius: 50%;
                box-shadow: 0 1em 18px rgba(0,0,0,0.3);
                z-index: -1;
            }*/

        .tags span {
            display: inline-block;
            padding: 4px 20px;
            border: 1px solid #b6b3b3;
            border-radius: 25px;
            color: #b6b3b3;
            margin-bottom: 10px;
        }

        .tags {
            text-align: center;
            padding: 20px 15px;
        }

        .tags header {
            margin-bottom: 20px;
        }

        .tags span.seletced {
            border-color: #e82c86;
            background: #e82c86;
            color: #fff;
        }

        .day {
            margin-top: 20px;
            background: #fff;
        }

        .news {
            background: #f0f0f0;
        }
        .news-item {
            padding: 5px 15px;
            margin-bottom: 15px;
        }

        .expand-content {
            overflow: hidden;
            margin: 10px 0 0 0;
        }

        .operation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 5px;
            color: #999;
        }

        .date {
            text-align: center;
            color: #111;
        }

        .tail {
            text-align: right;
        }

        .icon-heart {
            color: #969499;
        }
        .heart {
            color: #eb3d32
        }
        .my {
            background: #fff;
            padding: 10px;
        }
        .avatar {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .avatar img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .my li {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            margin: 10px 0;
            font-size: 20px;
        }
        .my i {
            width: 20px;
            text-align: left;
        }
    </style>

</head>

<body>
    <header class="nav" id="nav">
        资讯聚合
    </header>
    <main>
        <div id="view" class="view">
            <div class="news item">
                <section class="day">
                    <div class="date">Nov.04 今天</div>
                    <ul>
                        <li class="news-item">
                            <div class="title">
                                今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                            </div>
                            <div class="expand-content" style="height: 0px">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                            </div>
                            <div class="tail">
                                ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                            </div>
                            <div class="operation">
                                <span class="expand">
                                        <span>展开</span>
                                <i class="fa fa-angle-down"></i></span>
                                <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                            </div>
                        </li>
                        <li class="news-item">
                            <div class="right">
                                <div class="title">
                                    今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                                </div>
                                <div class="expand-content" style="height: 0px">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                                </div>
                                <div class="tail">
                                    ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                                </div>
                                <div class="operation">
                                    <span class="expand">
                                        <span>展开</span> <i class="fa fa-angle-down"></i></span>
                                    <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="news-item">
                            <div class="right">
                                <div class="title">
                                    今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                                </div>
                                <div class="expand-content" style="height: 0px">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                                </div>
                                <div class="tail">
                                    ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                                </div>
                                <div class="operation">
                                    <span class="expand"><span>展开</span> <i class="fa fa-angle-down"></i></span>
                                    <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="day">
                    <div class="date">Nov.03 昨天</div>
                    <ul>
                        <li class="news-item">
                            <div class="right">
                                <div class="title">
                                    今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                                </div>
                                <div class="expand-content" style="height: 0px">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                                </div>
                                <div class="tail">
                                    ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                                </div>
                                <div class="operation">
                                    <span class="expand"><span>展开</span> <i class="fa fa-angle-down"></i></span>
                                    <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="news-item">
                            <div class="right">
                                <div class="title">
                                    今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                                </div>
                                <div class="expand-content" style="height: 0px">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                                </div>
                                <div class="tail">
                                    ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                                </div>
                                <div class="operation">
                                    <span class="expand"><span>展开</span> <i class="fa fa-angle-down"></i></span>
                                    <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="news-item">
                            <div class="right">
                                <div class="title">
                                    今日气候变暖，请增添衣物，国庆放假，放假七天，增加长度
                                </div>
                                <div class="expand-content" style="height: 0px">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint, modi veniam neque possimus praesentium deserunt obcaecati molestias quidem culpa.
                                </div>
                                <div class="tail">
                                    ——&nbsp;&nbsp;<span>广东工业大学学生会</span>
                                </div>
                                <div class="operation">
                                    <span class="expand">
                                            <span>展开</span>
                                    <i class="fa fa-angle-down"></i></span>
                                    <span class="star">收藏 <i class="fa fa-heart icon-heart"></i></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="tags item">
                <!-- <header>
                    关注新内容
                </header> -->
                <span class="seletced">宣讲会</span>
                <span class="seletced">羽毛球</span>
                <span>篮球</span>
                <span>晚会</span>
                <span>比赛</span>
                <span>校内通知</span>
                <span>四六级</span>
                <span>五饭</span>
                <span>一饭</span>
                <span>游泳</span>
                <span>信工</span>
                <span>二饭</span>
                <span>三饭</span>
                <span>广工</span>
                <span>广美</span>
                <span>大学城</span>
                <span>实验</span>
                <span>留学</span>
                <span>兼职</span>
                <span>美女</span>
            </div>
            <!-- <div class="discover item">
                <h1>this is discover</h1>
            </div> -->
            <div class="my item">
                <div class="avatar">
                    <img src="http://placehold.it/100/100/e82c86" alt="">
                    <div class="username">
                        username
                    </div>
                </div>
                <ul>
                    <li>
                        <span>
                            <i class="fa fa-address-book" style="color:#4eb828"></i>
                            我的资料
                        </span>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span>
                            <i class="fa fa-star" style="color:#ecdf37"></i>
                            我的收藏
                        </span>
                        <i class="fa fa-angle-right"></i>

                    </li>
                    <li>
                        <span>
                            <i class="fa fa-pencil" style="color:#da4213"></i>
                            意见反馈
                        </span>
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
            </div>
        </div>
    </main>
    <footer class="tabbar" id="tabBar">
        <div class="seletced"  data-dis="0" data-navtext="资讯聚合"><i class="fa fa-hashtag"></i><span>资讯</span></div>
        <div  data-dis="1" data-navtext="管理标签"><i class="fa fa-tag"></i><span>标签</span></div>
        <!-- <div  data-dis="2" data-navtext="发现新内容"><i class="fa fa-search"></i><span>发现</span></div> -->
        <div data-dis="2" data-navtext="个人中心"><i class="fa fa-user" ></i><span>我的</span></div>
    </footer>
    <script type="text/javascript">
        window.onload = function() {

            (function init(){
                // init main view width
                function setViewWidth() {
                    var tabBar = 3;
                    var view = document.getElementById('view');
                    var w = window.innerWidth;
                    view.style.width = w * tabBar + 'px'
                }

                setViewWidth();

                // when window resize
                window.onresize = setViewWidth;


            }());


            // regeister event handler
            (function() {
                // list toggle
                var toggle = document.querySelectorAll('.expand');
                // var toggleA = toArray(toggle)
                // toggleA.forEach(function(item){
                //     item.onclick = listToggle;
                // })
                for (var i = 0; i < toggle.le ngth; i++) {
                    toggle[i].onclick = listToggle;
                }



                // star
                var star = document.querySelectorAll('.star');
                // var starA = toArray(star);
                // starA.forEach(function(item){
                //     item.onclick = heart;
                // })
                for (var i = 0; i < star.length; i++) {
                    star[i].onclick = heart;
                }


                // tab bar
                var tab = document.querySelectorAll('#tabBar div');
                // var tabA = toArray(tab);
                // tabA.forEach(function(item) {
                //     item.onclick = tabSwitch;
                // })
                for (var i = 0; i < tab.length; i++) {
                    tab[i].onclick = tabSwitch;
                }

                // tags
                var tag = document.querySelectorAll('.tags span');
                // var tagA = toArray(tag);
                // tagA.forEach(function(item){
                //     item.onclick = tagToggle;
                // })
                for (var i = 0; i < tag.length; i++) {
                    tag[i].onclick = tagToggle;
                }
            }());






            // utils
            function toArray(likeArray) {
                return [].slice.call(likeArray,0);
            }



            // events
            function listToggle(event) {
                var t = this;
                var icon = t.lastElementChild;
                var text = t.firstElementChild;
                var expandCotent = t.parentNode.parentNode.querySelector('.expand-content');
                expandCotent.style.height = expandCotent.style.height === '0px' ? 'auto' : '0px';
                text.innerHTML = text.innerHTML === '展开' ? '收起' : '展开';
                icon.classList.toggle('fa-angle-up');
                icon.classList.toggle('fa-angle-down');

            }

            function heart() {
                this.lastElementChild.classList.toggle("heart");
                this.classList.toggle("heart");
            }

            function tabSwitch() {
                var index = this.dataset.dis;
                var navText = this.dataset.navtext;
                var view = document.getElementById('view');
                var siblingA = toArray(this.parentNode.children);
                var nav = document.getElementById('nav');
                var items = document.querySelectorAll('.item');

                // set main height
                view.parentNode.style.height = items[index].offsetHeight + 'px';

                siblingA.forEach(function(item){
                    item.classList.remove('seletced');
                })
                this.classList.add('seletced');

                nav.innerHTML = navText;

                view.style.transform = 'translate3d(-' +  (index * (100/3)) +'%,0,0)';
            }



            function tagToggle(){
                this.classList.toggle('seletced');

                // ajax part
            }

        }


    </script>
</body>

</html>
