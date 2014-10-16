function LocalStorage(){

	this.cookeiname = "citrus_visit_timer";
	this.tempExp = 'Wed, 31 Oct 2020 00:00:00 GMT';

	this.Init = function (){
	
	}

	// возвращает cookie с именем name, если есть, если нет, то undefined
	this.getCookie = function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	this.setCookie = function setCookie(name, value, options) {
		  options = options || {};

		  var expires = options.expires;

		  if (typeof expires == "number" && expires) {
		    var d = new Date();
		    d.setTime(d.getTime() + expires*1000);
		    expires = options.expires = d;
		  }
		  if (expires && expires.toUTCString) { 
		  	options.expires = expires.toUTCString();
		  }

		  value = encodeURIComponent(value);

		  var updatedCookie = name + "=" + value;

		  for(var propName in options) {
		    updatedCookie += "; " + propName;
		    var propValue = options[propName];    
		    if (propValue !== true) { 
		      updatedCookie += "=" + propValue;
		     }
		  }

		  document.cookie = updatedCookie;
	 }

	this.Get = function(key){
		return this.getCookie(key);		
	}
	this.Set = function(key,value){
		this.setCookie(key, value, {"expires":this.tempExp});
		return true;
	}
	

	this.Init();
		
}
