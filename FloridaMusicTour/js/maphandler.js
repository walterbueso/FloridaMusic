(function () {
	/* "use strict"; */

	if (document.getElementById("map")) {

		var locs = [
			//name, phone, lat, long
			["Miami", "+90 0 (232) 324 11 83", 25.859850, -80.124983],
			["Tallahassee", "+90 0 (232) 324 11 83", 30.438121, -84.285020],
			["Orlando", "+90 0 (232) 324 11 83", 28.538335, -81.379236],
			["Jacksonville", "+90 0 (232) 324 11 83", 30.332184, -81.655651]
		];

		var locations = [];
		var markers = [];
		var infowindow = new google.maps.InfoWindow();

		//create map infos for all our locations
		for(var i = 0; i < locs.length; i++) {
			//html markup, name, lat, long
			var tempArray = ['<div class="map-info-box"><ul class="contact-info-list"><li><span><i class="fa fa-home fa-fw"></i></span> '+locs[i][0]+'</li><li><span><i class="fa fa-phone fa-fw"></i></span> '+locs[i][1]+'</li></ul></div>', locs[i][0], locs[i][2], locs[i][3]];
			locations.push(tempArray);
		}

		//create map
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 6,
			center: new google.maps.LatLng(28.392155, -81.532215 ),
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		});

		//loop througha nd initialize markers
		for (var i = 0; i < locations.length; i++) { 
			//create marker 
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][2], locations[i][3]),
				map: map,
				animation: google.maps.Animation.DROP,
				icon: '/images/pin.png',
		});

		//add marker to array
		markers.push(marker);

		//create infowindows and listeners for markers
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
				//expand panel
				$('#'+locations[i][1]).collapse("show");
			}
		})(marker, i));
		
			//func to change the map marker
		function bindClick(i) {
			return function(){
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, markers[i]);
			};
		}

		//set collapse listener
		$('#'+locations[i][1]).on('show.bs.collapse', bindClick(i));

		//if this is the first location, set it to active
		if(i == 0) {						
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, markers[i]);
		}
		}

	

		//hack to get around a bootstrap bug
		//without this after programtically showing/hiding a panel the accordian fails
		$('#accordion4').on('show.bs.collapse', function () {
			for(var i = 0; i < locations.length; i++) {
				$('#'+locations[i][1]).collapse("hide");
			}
		});
	}

}());