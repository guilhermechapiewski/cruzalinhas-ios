Ti.include('api.js');

var win = Titanium.UI.createWindow({  
    title:'CruzaLinhas',
    backgroundColor:'#fff'
});

var searchBar = Titanium.UI.createSearchBar({
	showCancel: true,
	height: 43,
	top: 0,
	hintText: '(ex.: Avenida Paulista, 900)'
});
win.add(searchBar);

var saopaulo = { 
	latitude: -23.564655852575104, 
	longitude: -46.651318073272705, 
	latitudeDelta: 0.05, 
	longitudeDelta: 0.05 
};

var mapView = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: saopaulo,
	animate: true,
	regionFit: true,
	userLocation: false,
	top: 43
});

// var loading = Titanium.UI.createActivityIndicator({
// 	style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
// 	height: 50,
// 	width: 10
// });

win.add(mapView);
win.open();

searchBar.addEventListener('cancel', function() {
	searchBar.blur();
});

searchBar.addEventListener('return', function() {
	// loading.show();
	searchBar.blur();
	var address = searchBar.value + ' - São Paulo - Brazil';
	Ti.Geolocation.forwardGeocoder(address, function(data) {
		if (!data.latitude || !data.longitude) {
			Ti.UI.createAlertDialog({
				title: 'Endereço não encontrado',
				message: address
			}).show();
		} else {
			Ti.API.info('mapView is visible? ' + mapView.visible);
			Ti.API.info('address[' + address + '], latitude[' + data.latitude + '] and longitude[' + data.longitude + ']');
			
			mapView.removeAllAnnotations();
			
			mapView.setRegion({ 
				latitude: data.latitude,
				longitude: data.longitude,
				latitudeDelta: 0.05, 
				longitudeDelta: 0.05 
			});
			
			api.busLinesAt(data.latitude, data.longitude, 8, function(busLines) {
				// loading.hide();
				for (var i=0; i<busLines.length; i++) {
					api.addBusLineToMap(busLines[i], mapView);
				}
			});
			
			mapView.addAnnotation(Titanium.Map.createAnnotation({
				latitude: data.latitude,
				longitude: data.longitude,
				title: address,
				animate: true,
				myid: 1
			}));
		}
	});
});