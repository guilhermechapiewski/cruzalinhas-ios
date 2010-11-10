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

var saopaulo = { latitude: -23.564655852575104, longitude: -46.651318073272705, latitudeDelta: 0.05, longitudeDelta: 0.05 };

var annotation = Titanium.Map.createAnnotation({
	latitude: saopaulo.latitude,
	longitude: saopaulo.longitude,
	title: 'Av. Paulista, 900',
	animate: true
});

var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: saopaulo,
	animate: true,
	regionFit: true,
	userLocation: false,
	annotations: [annotation],
	top: 43
});

// read in our routes from a comma-separated file
var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'.','route.csv');
var csv = f.read();
var points = [];
var lines = csv.toString().split("\n");
for (var c=0;c<lines.length;c++)
{
	var line = lines[c];
	var latlong = line.split(",");
	if (latlong.length > 1)
	{
		var lat = latlong[0];
		var lon = latlong[1];
		var entry = {latitude:lat,longitude:lon};
		points[c]=entry;
	}
}

// route object
var route = {
	name:"boston",
	points:points,
	color:"red",
	width:4
};

// add a route
mapview.addRoute(route);

win.add(mapview);
win.open();