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

var annotation = Titanium.Map.createAnnotation({
	latitude: saopaulo.latitude,
	longitude: saopaulo.longitude,
	title: 'Av. Paulista, 900',
	animate: true
});

var mapView = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: saopaulo,
	animate: true,
	regionFit: true,
	userLocation: false,
	annotations: [annotation],
	top: 43
});

// var loading = Titanium.UI.createActivityIndicator({
// 	style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
// 	height: 50,
// 	width: 10
// });

win.add(mapView);
win.open();

// loading.show();
api.busLinesAt('-23.593999', '-46.673014', 8, function(busLines) {
	for (var i=0; i<busLines.length; i++) {
		api.addBusLineToMap(busLines[i], mapView);
	}
	// loading.hide();
});