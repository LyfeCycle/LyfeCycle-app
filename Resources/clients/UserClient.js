function UserClient() {
	this.url = Constants.baseURL;
	this.fbId = fb.getUid(); // probably unnecessary, better to use fb.getUid() in the actual line
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

		client.open("GET", "http://lyfecycle-api.herokuapp.com/users/find?facebookId=" + fb.getUid());
		client.setRequestHeader("content-type", "application/json");
		client.send();
	}

};

UserClient.prototype.sendMilage = function(milage, callback) {
	var client = Ti.Network.createHTTPClient({
			timeout: Constants.timeout,
			onload: function(e){ callback() },
			onerror: function(e){ alert(e);}
	});
	client.open("POST", this.url + 'users/change-mileage');
	client.setRequestHeader("Content-Type","application/json");
	this.getCurrentUser(function (user) {
		client.send(JSON.stringify({"miles": milage, "userId": user._id}));
	});
}

module.exports = UserClient;