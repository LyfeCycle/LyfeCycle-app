var SettingsComponent = require('/views/ProfileComponents/SettingsComponent');

function ProfileView() {
	this.settingsComponent = new SettingsComponent('40%', 200);
	this.view = this.createProfileView();
	this.profileData;
	this.nameLabel;
	this.totalMilesLabel;
	this.totalMilesValue;
	this.profilePicture;
};

ProfileView.prototype.createProfileView = function(){
	var self = this;

	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0, backgroundColor: '#ddd'
	});

	// Facebook style login button
	var fbLoginButton = fb.createLoginButton({
		bottom : '2%',
    	style : fb.BUTTON_STYLE_WIDE
	});

	main.add(fbLoginButton);

	var view = Ti.UI.createView({
		height: 180,
		width: '90%',
		borderColor: '#555',
		borderWidth: 3,
		backgroundColor: '#888',
		top: '1%'
	});

	fb.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			self.profileData = JSON.parse(e.result);
			self.nameLabel.text = self.profileData["name"];
		} else if (e.error) {
			console.log(e.error);
		} else {
			console.log('Unknown fb response');
		}
	});

	var profilePicLink = "https://graph.facebook.com/" + fb.getUid()+"/picture";

	this.profilePicture = Ti.UI.createImageView({
		image: profilePicLink,
		left: '10%',
		top: '7%',
	});

	this.nameLabel = Ti.UI.createLabel({
		top: '7%',
		right: '10%',
		width: '68%',
		height: '9%',
		textAlign: 'right',
		font: {fontFamily: Constants.fontKG, fontSize: 20}
	});

	this.totalMilesLabel = Ti.UI.createLabel({
		text: 'Total Miles: ',
		color: 'red',
		top: '40%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	this.totalMilesValue = Ti.UI.createLabel({
		text: "42069",
		color: 'white',
		top: '40%',
		left: '52%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	view.add(this.nameLabel);
	view.add(this.totalMilesLabel);
	view.add(this.totalMilesValue);
	view.add(this.profilePicture);

	main.add(this.settingsComponent.view);
	main.add(view);

	return main;
};

module.exports = ProfileView;