window.onload = function(){
	// toggle part
	var toggle = document.getElementsByClassName('toggle')[0];
	toggle.addEventListener("click",function(){
		this.classList.toggle('toggle-activate');
		// using classList toggle class
	});

	// back part
	var back = document.getElementsByClassName('back')[0];
	back.addEventListener("click",function(){
		this.classList.toggle('back-activate');
	});

	// button part
	var button = document.getElementsByClassName('button')[0];
	var on = button.getElementsByClassName('on')[0];
	var buttonCount = 1;
	on.addEventListener("click",function(event){
		if (buttonCount % 2 == 1) {
			this.classList.add('button-off');
			this.classList.remove('button-on');
			this.parentNode.classList.add('change-bg');

		}
		else {
			this.classList.add('button-on');
			this.classList.remove('button-off');
			this.parentNode.classList.remove('change-bg');
		}
		buttonCount++;
	});
}


// wait for nex step
// function toggleClass(ele,eleClass) {
// 	var className = ele.className;
// 	var classNames = className.split(' ');
// 	for(var i=0,len=classNames.length; i< len; i++ ) {
// 		if (classNames[i] == eleClass) {
// 			classNames.pop(classNames[i]);
// 		}
// 	}
// 	classNames.push(eleClass);
// 	className = classNames.join(' ');
// 	return ele.className = className;
// }
