function LoginView() {
	this.view = this.createLoginView();
};

LoginView.prototype.createLoginView = function() {
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
		height: 40
	});

	var phoneNumberTextField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: Constants.deviceHeight/2,
		left: 30,
		width: Constants.deviceWidth - 60,
		height: 40
	});

	var createAccountButtonBG = Titanium.UI.createView({
		top: Constants.deviceHeight/2 + 50,
		height: 50,
		width: Constants.deviceWidth - 200,
		backgroundColor: Constants.darkGreen,
		borderRadius: 10
	});

	var createAccountButton = Titanium.UI.createLabel({
		text: 'Create Account',
		font: {fontSize: 25, fontFamily: Constants.fontKG}
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
			//windowController.goToHomeWindow();

			// If user already exists in database..
			// windowController.goToHomeWindow();
			// else
			// show the text field for new user signup
			console.log('fb third_party_id: ', fb.getUid());
			main.add(neighborhoodTextField);
			main.add(createAccountButtonBG);
		}
	});
	fb.addEventListener('logout', function(e) {
	    this.logged_in_state = false;
	    console.log("herro");
	    windowController.goToLoginWindow();
	});


	createAccountButtonBG.addEventListener('click',function (e){
		Titanium.API.info("Creating new user");
		// Submit request to server to create a new user.
		httpclient.open("POST", "http://lyfecycle-api.herokuapp.com/users");
		httpclient.setRequestHeader("content-type", "application/json");
		var param = {"name": fb.getUid(),
					"homeLatitude": neighborhoodTextField.value,
					"homeLongitude": ""}
		httpclient.send(JSON.stringify(param));

		windowController.goToHomeWindow();
	});

	main.add(icon);
	main.add(fbLoginButton);

	return main;
};

module.exports = LoginView;