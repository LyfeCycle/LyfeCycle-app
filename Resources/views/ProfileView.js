var SettingsComponent = require('/views/ProfileComponents/SettingsComponent');
var ProfileCard = require('/views/SocialComponents/ProfileCard');

function ProfileView() {
	this.settingsComponent = new SettingsComponent('55%', 200);
	this.view = this.createProfileView();
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

	// Generate profile card with current user
	userClient.getCurrentUser(function (results) {

		var card = new ProfileCard(results);
		main.add(card.profileCardView);
	});

	main.add(this.settingsComponent.view);

	return main;
};

module.exports = ProfileView;