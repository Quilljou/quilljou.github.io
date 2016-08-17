window.onload = function() {
    var item1 = document.getElementsByClassName('item1')[0];
    var ul = item1.getElementsByTagName('ul')[0];
    ul.addEventListener('click', function(event) {
        var span = event.target
        if (span && span.nodeName == 'SPAN') {
            removeClicked();
            span.parentNode.className = 'js-clicked';
        }
    })

    function removeClicked() {
        for (var i = 0, len = ul.childNodes.length; i < len; i++) {
            var li = ul.childNodes[i];
            li.className = null;
        }
    }

    var item2 = document.getElementsByClassName('item2')[0];
    var openBtn = document.getElementById('open-btn');
    var dialogWrapper = item2.getElementsByClassName('dialog-wrapper')[0];
    openBtn.addEventListener('click', function(event) {
        event.preventDefault();
        dialogWrapper.classList.add('show-dialog')
    });
    var okBtn = document.getElementById('ok-btn');
    var close = item2.getElementsByTagName('span')[0];
    okBtn.addEventListener('click', function() {
        event.preventDefault();
        dialogWrapper.classList.remove('show-dialog')
    });
    close.addEventListener('click', function() {
        event.preventDefault();
        dialogWrapper.classList.remove('show-dialog')
    });


    // item4  part
    var toggle1 = document.getElementsByClassName('toggle-1')[0];
    toggle1.addEventListener("click", function() {
        var item4 = document.getElementById('item-4');
        item4.classList.toggle('toggle-1-activate');
        // using classList toggle class
    });



    // item6 part
    var now = new Date();

    function setHourDegree() {
        var hour = now.getHours();
        var h = document.getElementsByClassName('hour')[0];
        hour = hour >= 12 ? hour - 12 : hour;
        var hourDegree = hour * 30;
        changeDegree(h, hourDegree);
    }
    setHourDegree();


    function setSecondDegree(){
        var second = now.getSeconds();
        var s = document.getElementsByClassName('second')[0];
        var secondDegree = second * 6;
        changeDegree(s,secondDegree);
    }
    setSecondDegree();

    function setMinuteDegree(){
        var minute = now.getMinutes();
        var m = document.getElementsByClassName('minute')[0];
        var minuteDegree = minute * 6;
        changeDegree(m,minuteDegree);
    }
    setMinuteDegree();

    function changeDegree(ele, degree) {
        ele.style.transform = 'rotate('+ (degree - 180) +'deg)';
    }
}
