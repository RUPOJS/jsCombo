inputSelect = function (object_name) {
   
	this.edit = document.getElementById(object_name);
	 
	var ddl = document.getElementById(object_name).parentNode.getElementsByTagName('DIV');
	this.dropdownlist = ddl[0];
	
	this.currentitem = null;
	
	this.currentitemindex = null;
	
	this.visiblecount = 0;
	
	var parobject = this;   
	
	var pick = document.getElementById(object_name).parentNode.getElementsByTagName('SPAN');
	pick[0].onclick =function () {
		parobject.edit.focus();
	};
	
	this.edit.onfocus = function () {
		parobject.dropdownlist.style.display = 'block';
	};
	
	this.edit.onblur = function () {
		if(allowLoose)
		setTimeout(function () {parobject.dropdownlist.style.display = 'none';}, 150);
	};
	var allowLoose=true;
	
	parobject.dropdownlist.onmousedown = function(event) {
		allowLoose = false;
    return false;
	}
	parobject.dropdownlist.onmouseup = function(event) {
		setTimeout(function () {allowLoose = true;}, 150);
    return false;
	}
	
	this.listitems = this.dropdownlist.getElementsByTagName('A');
	for (var i=0;i < this.listitems.length; i++) {
		var t = i;
		
		this.listitems[i].onclick = function () {
			var upv = this.innerHTML;   
			upv = upv.replace(/\<b\>/ig, '');
			upv = upv.replace(/\<\/b\>/ig, '');
			parobject.edit.value = upv;
			parobject.dropdownlist.style.display = 'none';
			return false;
		}
		
		this.listitems[i].onmouseover = function (e) {
			for (var i=0;i < parobject.listitems.length; i++) {
				if (this == parobject.listitems[i]) {
					if (parobject.currentitem) {
						parobject.currentitem.className = parobject.currentitem.className.replace(/light/g, '')
					}
					parobject.currentitem = parobject.listitems[i];
					parobject.currentitemindex = i;
					parobject.currentitem.className += ' light';
				}
			}
		}
	};
	
	
	this.edit.onkeydown = function (e) {
		e = e || window.event;
		if(e.keyCode == 9) {
			if (parobject.visiblecount) {
				var upv = parobject.currentitem.innerHTML;   
				upv = upv .replace(/\<b\>/ig, '');
				upv = upv .replace(/\<\/b\>/ig, '');
				parobject.edit.value = upv;
			};
			parobject.dropdownlist.style.display = 'none';
			e.cancelBubble = true;
            e.preventDefault();			
			e.stopPropagation();	
				
			
			return false;
			
		}	
		if (e.keyCode == 38) {
			
			var cn =0;
			if (parobject.visiblecount > 0) {
				if (parobject.visiblecount == 1) {
					parobject.currentitemindex = parobject.listitems.length-1;
				};
				do {
					parobject.currentitemindex--;
					cn++;
				} 
				while (parobject.currentitemindex>0 && parobject.listitems[parobject.currentitemindex].style.display == 'none');
				if(parobject.currentitemindex < 0) parobject.currentitemindex = parobject.listitems.length-1;
				
				if (parobject.currentitem) {
					parobject.currentitem.className = parobject.currentitem.className.replace(/light/g, '')
				};
				parobject.currentitem = parobject.listitems[parobject.currentitemindex];
				parobject.currentitem.className += ' light';
				parobject.currentitem.scrollIntoView(false);
			};
			e.cancelBubble = true;
			if (navigator.appName != 'Microsoft Internet Explorer')	{
				e.preventDefault();
				e.stopPropagation();
			}
			return false;
		}
			
		
		else if (e.keyCode == 40){
			
			var ic=0;
			if (parobject.visiblecount > 0) {
				do {
					parobject.currentitemindex++;
				}
				while (parobject.currentitemindex < parobject.listitems.length && parobject.listitems[parobject.currentitemindex].style.display == 'none');
				if(parobject.currentitemindex >= parobject.listitems.length) parobject.currentitemindex = 0;
				
				if (parobject.currentitem) {
					parobject.currentitem.className = parobject.currentitem.className.replace(/light/g, '')
				}
				parobject.currentitem = parobject.listitems[parobject.currentitemindex];
				parobject.currentitem.className += ' light';
				parobject.currentitem.scrollIntoView(false);
			}
			e.cancelBubble = true;
			if (navigator.appName != 'Microsoft Internet Explorer')	{
				e.preventDefault();
				e.stopPropagation();
			}
			return false;
		}
		
	};	
	this.edit.onkeyup = function (e) {
		e = e || window.event;	
		if (e.keyCode == 13) {
			if (parobject.visiblecount != 0) {
				var upv = parobject.currentitem.innerHTML;   
				upv = upv .replace(/\<b\>/ig, '');
				upv = upv .replace(/\<\/b\>/ig, '');
				parobject.edit.value = upv;
			};
			parobject.dropdownlist.style.display = 'none';
			e.cancelBubble = true;
			return false;
		}	
		
		else {
			parobject.dropdownlist.style.display = 'block';
			parobject.visiblecount = 0;
			if (parobject.edit.value == '') {
				for (var i=0;i < parobject.listitems.length; i++) {
					parobject.listitems[i].style.display = 'block';
					parobject.visiblecount++;
					var pv = parobject.listitems[i].innerHTML;
					pv = pv.replace(/\<b\>/ig, '');
					parobject.listitems[i].innerHTML = pv.replace(/\<\/b\>/ig, '');
				}
			}
			else {
				var re = new RegExp( '('+parobject.edit.value +')',"i");
				for (var i=0;i < parobject.listitems.length; i++) {
					var pv = parobject.listitems[i].innerHTML;
					pv = pv.replace(/\<b\>/ig, '');
					pv = pv.replace(/\<\/b\>/ig, '');
					if ( re.test(pv) ) {
						parobject.listitems[i].style.display = 'block';
						parobject.visiblecount++;
						parobject.listitems[i].innerHTML = pv.replace(re, '<b>$1</b>');
					}
					else {
						parobject.listitems[i].style.display = 'none';
					}
				}
			}
		}
	}
	
	
	
}
