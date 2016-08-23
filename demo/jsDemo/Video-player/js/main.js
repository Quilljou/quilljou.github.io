window.onload = function() {
    var video = document.getElementById('video');
    var videoContainer = document.querySelector('.video-container')

    // enter fullscreen and exitFullscreen
    var fullScreen = document.getElementsByClassName('fullscreen')[0];
    var screenCount = 0;
    fullScreen.onclick = function() {
        console.log(videoContainer);
        if(screenCount % 2 == 0){
            launchIntoFullscreen(videoContainer);
        }else {
            exitFullscreen(videoContainer);
        }
        screenCount++;
    }
    function launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function exitFullscreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }


    // start and pause
    var play = document.querySelector('.play');
    play.onclick = function (){
        if(video.paused){
            video.play();
        }else {
            video.pause();
        }
        this.classList.toggle('fa-play'); /* change icon*/
        this.classList.toggle('fa-pause');
    }


    //volume
    var volumeBtns = document.querySelectorAll('.volume span');
    var volumeBar = document.querySelector('.volume-bar');
    var volumeGo = document.querySelector('.volume .bar-go');

    volumeBtns[0].onclick = function() {
        if(video.muted === false) {
            video.muted = true;
        }else{
            video.muted = false;
        }
        this.classList.toggle('fa-volume-up');
        this.classList.toggle('fa-volume-off');
    }

    volumeBtns[0].onmouseenter = function(){
        volumeBar.classList.remove('hide');
        setTimeout(function(){
            volumeBar.classList.add('hide');
        },5000)
    }
    volumeBar.onmouseleave = function(){
        this.classList.add('hide');
    }

    volumePercentage = 100 * video.volume;
    console.log(volumePercentage);
    volumeGo.style.height = volumePercentage +'%';


    // progress bar
    var curTime = document.querySelector('.cur-time');
    var totalTime = document.getElementsByClassName('total-time')[0];
    var progress = document.querySelector('.go')
    var t = setInterval(function () {
    if(video.readyState > 0) {
        var duration = video.duration;
        console.log(duration);
        clearInterval(t);
    }
}, 500);


    video.ontimeupdate = function() {
        curTime.innerText = makeTime(video.currentTime);
        percentage = 100 * video.currentTime / video.duration;
        progress.style.width = percentage +'%';

    };
    totalTime.innerText = makeTime(video.duration)

    function makeTime(second){
        var timeText = Math.round(second / 59) + ':' + (Math.round(second % 59) < 10 ? '0' + Math.round(second % 59) : Math.round(second % 59));
        return timeText;
    }
}
