// Login controller
function Session() {
	this.userExists = false;
	this.fbId = fb.getUid();

	fb.addEventListener('login', function(e) {
		console.log("event listening: login");
		sessionController.Login();
	});

	fb.addEventListener('logout', function(e) {
		console.log("event listening: logout");
		windowController.goToHomeWindow();
		alert("You are now using LyfeCycle in offline mode!");
	});
};


Session.prototype.Login = function() {
	var self = this;
	if (fb.loggedIn) {
		this.CheckUserExists(function (exists) {
			if (exists) {
				this.userExists = true;
				windowController.goToHomeWindow();
				console.log("user exists in database");
			}
			else {
				this.userExists = false;
				windowController.goToLoginWindow();
			}
		});
	}
	else {
		windowController.goToHomeWindow();
		alert("You are using LyfeCycle in offline mode. Login under 'Profile' to track your progress!");
	}

};

Session.prototype.CheckUserExists = function(callback) {
	var self = this;
	var httpclient = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			if (this.responseText == "[]") {
				callback(false);
			}
			else if (JSON.parse(this.responseText)[0]["facebookId"] == self.fbId) {
				callback(true);
			}
			else {
				callback(false);
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.info(e);
		},
			timeout : 5000  // in milliseconds
	});

	httpclient.open("GET", "http://lyfecycle-api.herokuapp.com/users/find?facebookId=" + self.fbId);
	httpclient.setRequestHeader("content-type", "application/json");
	httpclient.send();

};

Session.prototype.Logout = function() {
	windowController.goToLoginWindow();
};

module.exports = Session;