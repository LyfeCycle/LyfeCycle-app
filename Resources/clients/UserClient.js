function UserClient() {
	this.url = Constants.baseURL;
	this.fbId = fb.getUid();
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

UserClient.prototype.getCurrentUser = function(callback){
	var self = this;
	var client = Ti.Network.createHTTPClient({
			timeout: Constants.timeout,
			onload: function(e){
				callback(JSON.parse(this.responseText)[0]);
			},
			onerror: function(e){alert("Couldn't connect!!");}
	});

	client.open("GET", "http://lyfecycle-api.herokuapp.com/users/find?facebookId=" + self.fbId);
	client.setRequestHeader("content-type", "application/json");
	client.send();
};

module.exports = UserClient;