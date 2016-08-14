window.onload = function() {
    // .features part
    console.log(window.innerWidth);
    window.addEventListener('resize',function(){
        var ablums =document.getElementById('ablums');
        var features = document.getElementById('features');
        if(window.innerWidth <= 768 ) {
            ablumsWidth = ablums.offsetWidth;
            ablums.style.height = ablumsWidth + "px";
            console.log(ablums.offsetHeight);
        }
        if(window.innerWidth <= 500) {
            features.style.height = '1178px';
        }
    });


}
