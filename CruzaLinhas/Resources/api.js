Ti.include('colors.js');

var api = {};

api.busLinesAt = function(latitude, longitude, max, successCallback) {
	var client = Ti.Network.createHTTPClient();
	
	client.onload = function(e) {
		var result = JSON.parse(this.responseText),
			limit = (result < limit) ? result : max,
			busLines = [];
		
		for (var i=0; i<limit; i++) {
			busLines[i] = result[i].key;
		}
		
		successCallback(busLines);
	};
	
	client.open('GET', 'http://cruzalinhas.appspot.com/linhasquepassam.json?lat=' + latitude + '&lng=' + longitude);
	client.send();
}

api.addBusLineToMap = function(busLine, mapView) {
	var client = Ti.Network.createHTTPClient();
	
	client.onload = function(e) {
		var result = JSON.parse(this.responseText),
			points = [];
		
		for (var i=0; i<result.length; i++) {
			points[i] = { latitude: result[i][0], longitude: result[i][1] };
		};
		
		mapView.addRoute({
			name: busLine,
			points: points,
			color: colors.next(),
			width: 4
		});
	};
	
	client.open('GET', 'http://cruzalinhas.appspot.com/linha.json?key=' + busLine);
	client.send();
};
