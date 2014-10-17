function LocalStorage(){

	this.Init = function (){
	
	}


	this.Get = function(key){
		return localStorage.getItem(key);
	}
	this.Set = function(key,value){
		localStorage.setItem(key, value);
		return true;
	}
	

	this.Init();
		
}
