window.onload = function() {
	var btns = document.getElementsByTagName('a');
	var carousel = document.getElementById('carousel');
	var defaultDuration = getAttr('#carousel','animationDuration');

	btns[0].onclick = prev;
	var degree = 0;
	function prev(){
		degree += 40;
		carousel.style.cssText = 'transform : rotateY(' + degree + 'deg);animation: none';
	}

	btns[1].onclick = next;
	var degree = 0;
	function next(){
		degree -= 40;
		carousel.style.cssText = 'transform : rotateY(' + degree + 'deg);animation: none';
	}

	btns[2].onclick = stop;

	function stop(){
		carousel.classList.toggle('stop');
		carousel.classList.toggle('shake');
		this.innerText = this.innerText == 'Start' ? 'Stop' : 'Start';
	}


    btns[3].onclick = function(){    /*faster*/
        var curDuration = getAttr('#carousel','animationDuration');
        if ( parseInt(curDuration) > 4) {
            var nextDuration = parseInt(curDuration) - 2;
            nextDurationStr = nextDuration + 's';
            setAttr('#carousel','animationDuration',nextDurationStr);
        }
    }

	btns[4].onclick = function(){    /*Slower*/
		var curDuration = getAttr('#carousel','animationDuration');
		if ( parseInt(curDuration) < 40) {
			var nextDuration = parseInt(curDuration) + 2;
			nextDurationStr = nextDuration + 's';
			setAttr('#carousel','animationDuration',nextDurationStr);
		}
	}

	btns[5].onclick = function(){    /*Reload*/
			setAttr('#carousel','animationDuration',defaultDuration);
	}




    function getAttr(selector,attr){
        var classes = document.styleSheets[0].cssRules || document.styleSheets[0].rules
        for (var i = 0, len = classes.length; i < len; i++ ) {
            if(classes[i].selectorText == selector){
                return classes[i].style[attr];
            }
        }
    }

    function setAttr(selector,attr,value){
        var classes = document.styleSheets[0].cssRules || document.styleSheets[0].rules
        for (var i = 0, len = classes.length; i < len; i++ ) {
            if(classes[i].selectorText == selector){
                classes[i].style[attr] = value;
            }
        }
    }
}
