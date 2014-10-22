var pushNotification;

document.addEventListener("deviceready", function(){

    pushNotification = window.plugins.pushNotification;
	
    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
	    pushNotification.register(
	    successHandler,
	    errorHandler,
	    {
	        "senderID":"536166568203",
	        "ecb":"onNotification"
	    });
	}else {
	    pushNotification.register(
	    tokenHandler,
	    errorHandler,
	    {
	        "badge":"true",
	        "sound":"true",
	        "alert":"true",
	        "ecb":"onNotificationAPN"
	    });
	}
		
});
function successHandler (result) {
	console.log(result);
    alert('result = ' + result);
}
function errorHandler (error) {
	console.log(result);
    alert('error = ' + error);
}

// handle GCM notifications for Android
function onNotification(e) {
	console.log(e);
    alert('Notification = ' + e.event);
}

// handle APNS notifications for iOS

function onNotificationAPN(e) {
	console.log(e);
    alert('Notification = ' + e.alert);
}