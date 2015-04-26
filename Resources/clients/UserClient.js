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
			onerror: function(e){alert("Request to the LyfeCycle server timed out. Please exit the app and try again.");}
	});

	client.open("GET", this.url + 'users');
	client.setRequestHeader("Content-Type","application/json");
	client.send();
};

UserClient.prototype.getCurrentUser = function(callback){
	if (fb.loggedIn) {
		var self = this;
		var client = Ti.Network.createHTTPClient({
				timeout: Constants.timeout,
				onload: function(e){
					callback(JSON.parse(this.responseText)[0]);
				},
				onerror: function(e){alert("Request to the LyfeCycle server timed out. Please exit the app and try again");}
		});

		client.open("GET", "http://lyfecycle-api.herokuapp.com/users/find?facebookId=" + self.fbId);
		client.setRequestHeader("content-type", "application/json");
		client.send();
	}

};

module.exports = UserClient;