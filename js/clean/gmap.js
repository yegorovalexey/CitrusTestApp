var map, panorama;

function gmapLoadScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyCBYP8UQzxdpP2AGuPS7UW7zl0wRuVQdeQ&sensor=TRUE&callback=gmapInitialize";
	document.body.appendChild(script);
}

function gmapInitialize() {
	var sv = new google.maps.StreetViewService();
	panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
	
	var mapOptions = {
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  
		// Try HTML5 geolocation
	  if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude,
										   position.coords.longitude);

	  var bluedot = {
			url: 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png',
			size: new google.maps.Size(32, 32),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(0,32)
		};
		
 		var marker = new google.maps.Marker({
					position: pos,
					map: map,
					icon: bluedot,
				});					   

		  map.setCenter(pos);
		}, function() {
		  //handleNoGeolocation(true);
		  var pos = new google.maps.LatLng(50.432655,30.515996);
		map.setCenter(pos);
		});
	  } else {
		// Browser doesn't support Geolocation
		//handleNoGeolocation(false);
		var pos = new google.maps.LatLng(50.432655,30.515996);
		map.setCenter(pos);
	  }

 	$.ajax({ 
	  url: "ajax/on/gmap.php", 
	  dataType: 'json',
	  data:'method=getShop',
	  success: function( json ) {
	  
	  var iconimage = {
			url: 'http://wifi.citrus.ua/img/citrus-mappin.png',
			size: new google.maps.Size(48, 48),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(24,48)
		};
	  
		 if(json.items != undefined && json.items.length > 0){
			$.each( json.items, function(key, val){
				if(val.latlng){
					var myLatlng = new google.maps.LatLng(val.lat,val.lng);
						var marker = new google.maps.Marker({
							position: myLatlng,
							map: map,
							title: val.adress,
							icon: iconimage,
						});
						
						var contentString = '<div style="overflow:hidden">Адрес:'+val.adress+'<br>Телефон:'+val.phone+'</div>';
						var infowindow = new google.maps.InfoWindow({
							content: contentString
						});
			
						google.maps.event.addListener(marker, 'click', function(event) {
						map.setZoom(18);
						map.setCenter(marker.getPosition());
						infowindow.open(map,marker);
						sv.getPanoramaByLocation(event.latLng, 50, processSVData);
					});
			
				}
			});
			$.mobile.loading("hide");
		}
	  }
	 });	  
}

function processSVData(data, status) {
  if (status == google.maps.StreetViewStatus.OK) {
    var marker = new google.maps.Marker({
      position: data.location.latLng,
      map: map,
      title: data.location.description
    });
	
/*     panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
	
	$('#pano, #toggleStreetView').show();
	$('#map_canvas').hide();
	
    panorama.setVisible(true);

    google.maps.event.addListener(marker, 'click', function() {
      var markerPanoID = data.location.pano;
      panorama.setPano(markerPanoID);
      panorama.setPov({
        heading: 270,
        pitch: 0
      });
		panorama.setVisible(true);
    }); */
	
  }
}

/* $(document).on('click', '#toggleStreetView', function() {
	$('#pano, #toggleStreetView').hide();
	$('#map_canvas').show();
}); */

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

