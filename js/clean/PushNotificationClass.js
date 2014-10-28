var pushNotification;

function InitpushNotifications(){
	
	document.addEventListener("deviceready", function(){

	    pushNotification = window.plugins.pushNotification;
		
		console.log(device);
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

}
function successHandler (result) {
	console.log(result);	
}
function errorHandler (error) {
	console.log(result);
   // alert('error = ' + error);
}

// handle GCM notifications for Android
/*
e = Object {regid: "APA91bF_xZ1w0WkxQ-N-Patuw88volk0606XZxQlloS3pEdYEz…KLBo5Mfe89g4SchRs9EPmwRNFpWMQnOAKDuI5po0nRbjCYpbU", event: "registered"}
event: "registered"
regid: "APA91bF_xZ1w0WkxQ-N-Patuw88volk0606XZxQlloS3pEdYEznLG5foQCSqJu09DCgNmtyfhmd1eA9XzU3Snpghp93ct0h_GkCYfu1ZFP2gRDeugNpCG8_K0xZ4hv2cBd4KptKLBo5Mfe89g4SchRs9EPmwRNFpWMQnOAKDuI5po0nRbjCYpbU"
}
Object {message: "Это мое первое сообщение2", payload: Object, collapse_key: "do_not_collapse", from: "536166568203", foreground: true…}
collapse_key: "do_not_collapse"
event: "message"
foreground: true
from: "536166568203"
message: "Это мое первое сообщение2"
payload: Object
largeIcon: "large_icon"
message: "Это мое первое сообщение2"
smallIcon: "small_icon"
sound: "1"
subtitle: "This is a subtitle. subtitle"
tickerText: "Ticker text here...Ticker text here...Ticker text here"
title: "Hello World. I am CitrusApp Push"
vibrate: "1"
 */
 
function onNotification(e) {
	console.log(e);
	switch(e.event){
		case "registered":
		{
			RegisterDevice(e.regid,"google");	
		}
			break;
		case "message":
			break;
		default:
			break;
	}
   // alert('Notification = ' + e.event);
}

// handle APNS notifications for iOS

function onNotificationAPN(e) {
	console.log(e);
   // alert('Notification = ' + e.alert);
}


function AfterRegisterDevice(data){
    console.log(data);
  //  alert(data);
}

function RegisterDevice(key,provider,mobile){
    var phone = "";
    if(arguments.length==3 && mobile!= undefined){
        phone = mobile;
    }
    var php_path = "device.php";
    var data = 'register&key='+key+'&mobile='+phone+'&provider='+provider;



    $.ajax({
        url: "http://m.citrus.ua/ajax/on/"+php_path+"?method="+data,
        dataType: 'json',
        async: true,
        success: function( json ) {

            AfterRegisterDevice(json);
        },
        timeout: 8000 ,
        error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout"
            if(status == "timeout"){
                ShowMessage(1);
                return false;

            }

        }
    });

}