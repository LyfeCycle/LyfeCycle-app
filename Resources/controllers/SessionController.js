// Login controller
function Session() {

	// FB login/logout event listeners
	fb.addEventListener('login', function (e) {
		sessionController.Login();
	});

	fb.addEventListener('logout', function (e) {
		windowController.goToHomeWindow();
		alert("Logged out! You are now using LyfeCycle in offline mode!");
	});
};


Session.prototype.Login = function() {
	if (fb.loggedIn) {
		this.CheckUserExists(function (exists) {
			if (exists) {
				windowController.goToHomeWindow();
			}
			else {
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
			else if (JSON.parse(this.responseText)[0]["facebookId"] == fb.getUid()) {
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

	httpclient.open("GET", "http://lyfecycle-api.herokuapp.com/users/find?facebookId=" + fb.getUid());
	httpclient.setRequestHeader("content-type", "application/json");
	httpclient.send();

};

Session.prototype.Logout = function() {
	windowController.goToLoginWindow();
};

module.exports = Session;