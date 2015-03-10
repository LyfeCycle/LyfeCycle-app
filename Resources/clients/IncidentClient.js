function IncidentClient(){
	this.url = Settings.baseURL;
};

IncidentClient.prototype.postIncident = function(type, latitude, longitude){
	console.log(type);
	console.log(latitude);
	console.log(longitude);
	var json = JSON.stringify({
		"name": type,
		"latitude": latitude.toString(),
		"longitude": longitude.toString(),
		"tag": type
	});
	console.log(json);
	var client = Ti.Network.createHTTPClient({
			timeout: Settings.timeout,
			onload: function(e){},
			onerror: function(e){alert("Couldn't connect!!");}
	});

	client.open("POST", this.url + 'locations');
	client.setRequestHeader("Content-Type","application/json");
	client.send(json);
};

IncidentClient.prototype.getAllIncidents = function(callback){
	var client = Ti.Network.createHTTPClient({
			timeout: Settings.timeout,
			onload: function(e){
				callback(JSON.parse(this.responseText));
			},
			onerror: function(e){alert("Couldn't connect!!");}
	});

	client.open("GET", this.url + 'locations');
	client.setRequestHeader("Content-Type","application/json");
	client.send();
};


module.exports = IncidentClient;