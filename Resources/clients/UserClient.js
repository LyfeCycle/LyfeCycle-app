function UserClient() {
	this.url = Settings.baseURL;
};

UserClient.prototype.getAllUsers = function(callback){
	var client = Ti.Network.createHTTPClient({
			timeout: Settings.timeout,
			onload: function(e){
				callback(JSON.parse(this.responseText));
			},
			onerror: function(e){alert("Couldn't connect!!");}
	});

	client.open("GET", this.url + 'users');
	client.setRequestHeader("Content-Type","application/json");
	client.send();
};

module.exports = UserClient;