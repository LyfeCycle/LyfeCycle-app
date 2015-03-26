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

	var userNameTextField = Ti.UI.createTextField({
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

	var loginButtonBG = Titanium.UI.createView({
		top: Constants.deviceHeight/2 + 50,
		height: 50,
		width: Constants.deviceWidth - 200,
		backgroundColor: Constants.darkGreen,
		borderRadius: 10
	});

	var loginButton = Titanium.UI.createLabel({
		text: 'Login',
		font: {fontSize: 25, fontFamily: Constants.fontKG}
	});

	// Facebook style login button
	var fbLoginButton = fb.createLoginButton({
		top : Constants.deviceHeight/2 + 50,
    	style : fb.BUTTON_STYLE_WIDE
	});

	loginButtonBG.add(loginButton);

	loginButtonBG.addEventListener('click',function (e){
		Titanium.API.info("You clicked the button");
		windowController.goToHomeWindow();
	});

	
	main.add(icon);
	//main.add(userNameTextField);
	//main.add(phoneNumberTextField);
	//main.add(loginButtonBG);
	main.add(fbLoginButton);

	return main;
};

module.exports = LoginView;