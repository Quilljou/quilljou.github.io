window.onload = function() {
    //global var
    var g = {
        userToggle : document.getElementById('userToggle'),
        navbarToggle : document.getElementById('navbarToggle'),
        navRight : tryGet('navRight'),
        btnPlay : document.querySelectorAll('#btnPlay'),
        paused : false,
        ablums : document.querySelectorAll('#ablum'),
        scrollDown : document.querySelectorAll('.btn-scroll-down')
    }
    function tryGet(id){
        try{
            return document.getElementById(id);
        }catch(TypeError) {
            console.log('still unaviable');
        }
    }

        // fadeup animation
       var fadeUpObjs = document.querySelectorAll('.willFadeUp');
       console.log(fadeUpObjs);

        window.onscroll = function() {
            for(var i = 0; i < fadeUpObjs.length; i++ ) {
            var scrollTarget = document.body.scrollTop === 0 ? document.documentElement : document.body;

                if(getOffsetY(fadeUpObjs[i]) <= scrollTarget.scrollTop + window.innerHeight + fadeUpObjs[i].clientHeight / 2) {
                    //距离页面上端的高度 小于 滚动的高度 + 窗口的高度 + 自身的高度的时候开始fade
                    fadeUpObjs[i].classList.add('fadeUp');
                }
            }
        }

        function getOffsetY(ele){
            var current = ele;
            var offsetY = 0;
            while(current.offsetParent !== null) {
                offsetY += current.offsetTop;
                current = current.offsetParent;
            }
            return offsetY;
        }




    //album resize
    square();
    function square() {
        var ablums = document.getElementById('ablums');
        var features = document.getElementById('features');
        if (window.innerWidth <= 768) {
            ablumsWidth = ablums.offsetWidth;
            ablums.style.height = ablumsWidth + "px";
        }
        if (window.innerWidth <= 500) {
            features.style.height = '1178px';
        }
    }
    window.addEventListener('resize', square, false);


    // scroll down btn

    for(var m = 0; m < g.scrollDown.length; m++) {
        g.scrollDown[m].onclick = function() {
            // scrollTarget = document.body.scrollTop === 0 ? document.documentElement : document.body;
            // for firefox and chrome
            var targetEle = this.parentNode.tagName.toLowerCase() === 'section'?this.parentNode:this.parentNode.parentNode;
            scrollTo(targetEle,400);
        }
    }


    function scrollTo(targetEle,duration){
        var scrollTarget = document.body.scrollTop === 0 ? document.documentElement : document.body;
        if(duration<=0) {return};
            var perTick = scrollTarget.scrollTop > targetEle.offsetTop ?scrollTarget.scrollTop - targetEle.offsetTop:targetEle.offsetTop - scrollTarget.scrollTop;
            perTick = perTick / duration * 10;

            setTimeout(function(){
                if(scrollTarget.scrollTop === targetEle.offsetTop ) return;
                if(scrollTarget.scrollTop > targetEle.offsetTop) {
                    scrollTarget.scrollTop -= perTick;
                }else {
                    scrollTarget.scrollTop += perTick;
                }
                scrollTo(targetEle,duration-10)
            },10)
    }


    //ablum part
    for(var m = 0; m < g.ablums.length; m++) {
        g.ablums[m].onmouseenter = function() {
            var musicOverlay = this.querySelector('#musicOverlay');
            musicOverlay.classList.remove('hidden');
        }
        g.ablums[m].onmouseleave = function() {
            var musicOverlay = this.querySelector('#musicOverlay');
            // var btn = this.querySelector('#btnPlay');
            var music = this.getElementsByTagName('audio')[0];
            var progress = this.querySelector('#progress');

            if(music.paused) {
                if(music.currentTime !== music.duration) {
                    musicOverlay.classList.add('hidden');
                    music.load();
                }
                progress.style.width = '0';
            }
        }
    }

    for(var z = 0; z < g.btnPlay.length; z++) {
        g.btnPlay[z].onclick = function() {
            var music = this.parentNode.getElementsByTagName('audio')[0];
            var paths = this.querySelectorAll('.play-pause');
            var progress = this.parentNode.querySelector('#progress');
            console.log(paths);

            // switch paly and pause butto
            for(var i = 0;i < paths.length;i++) {paths[i].classList.toggle('hidden')};

            // play and pause
            music.paused ? music.play() : music.pause();

            // progress
            music.ontimeupdate = function() {
                var perc = this.currentTime / this.duration * 100;
                var btn = this.parentNode.querySelector('#btnPlay');
                var fullTrack = this.parentNode.querySelector('#fullTrack');

                progress.style.width = perc + '%';

                if(perc >= 100) {
                    progress.style.width = '0';
                    btn.classList.add('hidden');
                    fullTrack.classList.remove('hidden');
                }
            }
        }
    }

    //nav part
    g.userToggle.onclick = toggle;


    function toggle(event) {
        var more = document.getElementById('more');
        more.classList.toggle('hidden');
        if(g.userToggle.style.transform) {
            g.userToggle.style.transform = '';
        }else {
            g.userToggle.style.transform = 'rotate(180deg) translateY(-14px)';
        }
        event.stopPropagation();
    }


    try {
        g.navbarToggle.onclick = navRightToggle;
        window.onclick = toggleRemove;

        function toggleRemove() {
            g.navbarToggle.classList.remove('nav-toggle-opened');
            g.navRight.classList.add('hidden');


            // usr togglle
            var more = document.getElementById('more');
            more.classList.add('hidden');
            if(g.userToggle.style.transform) {
                g.userToggle.style.transform = '';
            }
        }

        function navRightToggle(event) {
            g.navbarToggle.classList.toggle('nav-toggle-opened');
            g.navRight.classList.toggle('hidden');
            event.stopPropagation();
        }


    }catch(Error) {
        console.log('still nothing');
    }


    (function(){
    //     var carousel = document.getElementById('carousel');
        var carouselContainer = document.getElementById('carouselContainer');
    //     // var width = g.carousel.offsetWidth;
    //     var items = document.querySelectorAll('.item');
        var index = 0;
        var left = document.getElementById('left');
        var right = document.getElementById('right');
        var btns = document.querySelectorAll('.btn-control span')
    //
        right.onclick = move;
        left.onclick = move;
    //

        function move() {
            if(this == right) {
                    // return
                    next();

                    function next() {
                        if(index >= 3) {
                            index = -1;
                        }
                    ++index;
                }
            }else {
                    prev();

                    function prev() {
                    if(index <= 0) {
                        index = 4;
                    }
                    --index;
                    // carouselContainer.style.transform = translateX('-' + index * 100 +'%');
                }
            }

            carouselContainer.style.transform = 'translate3d(-' + (index * 25) +'%,0,0)';
            console.log(index);
            for(var y = 0; y < 4;y++) {btns[y].classList.remove('active-btn')}
            btns[index].classList.add('active-btn');
        }
        for(var x = 0; x < 4; x++) {
            btns[x].index = x;
            btns[x].onclick = function() {
                carouselContainer.style.transform = 'translate3d(-' + (this.index * 25) +'%,0,0)';
                for(var y = 0; y < 4;y++) {btns[y].classList.remove('active-btn')}
                btns[this.index].classList.add('active-btn');
            }
        }
    })()
}
