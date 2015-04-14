function LoginView() {
	this.view = this.createLoginView();
	this.fbId = fb.getUid();
};

LoginView.prototype.createLoginView = function() {
	var self = this;

	var main = Ti.UI.createView({
		height: '100%',
		width: '100%',
		backgroundColor: '#acdf6b'
	});

	var icon = Ti.UI.createImageView({
		top: (Constants.deviceHeight/11),
		width: Constants.deviceWidth*0.4,
		image: '/images/bike_wheel.png'
	});

	var neighborhoodTextField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: Constants.deviceHeight/2 - 50,
		left: 30,
		width: Constants.deviceWidth - 60,
		height: 40,
		hintText: "Neighborhood"
	});

	var createAccountButtonBG = Titanium.UI.createView({
		top: Constants.deviceHeight/2 + 50,
		height: 50,
		width: Constants.deviceWidth - 200,
		backgroundColor: Constants.darkGreen,
		borderRadius: 10
	});

	var createAccountButton = Titanium.UI.createLabel({
		text: 'Create',
		font: {fontSize: 25, fontFamily: Constants.font}
	});

	createAccountButtonBG.add(createAccountButton);

	// Facebook login/logout
	var fbLoginButton = fb.createLoginButton({
		top : Constants.deviceHeight/2 + 50,
    	style : fb.BUTTON_STYLE_WIDE
	});
	fb.addEventListener('login', function(e) {
		if (e.success) {
			Titanium.API.info("Facebook authentication");
			var httpclient = Ti.Network.createHTTPClient({
				// function called when the response data is available
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					if (this.responseText == "[]") {
						main.add(neighborhoodTextField);
						main.add(createAccountButtonBG);
					}
					else if (JSON.parse(this.responseText)[0]["facebookId"] == self.fbId) {
						windowController.goToHomeWindow();
					}
					else {
						main.add(neighborhoodTextField);
						main.add(createAccountButtonBG);
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
		}
	});
	fb.addEventListener('logout', function(e) {
	    this.logged_in_state = false;
	    windowController.goToLoginWindow();
	});
	/* END FB */

	createAccountButtonBG.addEventListener('click',function (e){
		Titanium.API.info("Creating new user");
		// Get user's name for database entry
		fb.requestWithGraphPath('me', {}, 'GET', function (e) {
			if (e.success) {
				var name = JSON.parse(e.result)["name"];
				fbCompleted(name);
			} else if (e.error) {
				console.log(e.error);
			} else {
				console.log('Unknown fb response');
			}
		});
	});

	function fbCompleted(name) {
		var httpclient2 = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				windowController.goToHomeWindow();
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
			},
				timeout : 5000  // in milliseconds
		});
		// Submit request to server to create a new user.
		httpclient2.open("POST", "http://lyfecycle-api.herokuapp.com/users");
		httpclient2.setRequestHeader("content-type", "application/json");
		var param = {"name": name,
					"facebookId": fb.getUid(),
					"neighborhoodName": neighborhoodTextField.value}
		httpclient2.send(JSON.stringify(param));
	}

	main.add(icon);
	main.add(fbLoginButton);

	return main;
};

module.exports = LoginView;