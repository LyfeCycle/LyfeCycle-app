function UserClient() {
	this.url = Constants.baseURL;
};

UserClient.prototype.getAllUsers = function(callback){
	var client = Ti.Network.createHTTPClient({
			timeout: Constants.timeout,
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