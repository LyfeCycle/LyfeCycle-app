function LoginView() {
	this.view = this.createLoginView();
};

LoginView.prototype.createLoginView = function() {
	var main = Ti.UI.createView({
		height: Constants.deviceHeight,
		width: Constants.deviceWidth,
		backgroundColor: '#acdf6b'
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
	})

	var loginButton = Titanium.UI.createButton({
		title: 'Login',
		top: Constants.deviceHeight/2 + 40,
		width: Constants.deviceWidth - 200,
		height: 50
	});
	loginButton.addEventListener('click',function(e)
	{
		Titanium.API.info("You clicked the button");
	});

	main.add(userNameTextField);
	main.add(phoneNumberTextField);
	main.add(loginButton);

	return main;
};

module.exports = LoginView;