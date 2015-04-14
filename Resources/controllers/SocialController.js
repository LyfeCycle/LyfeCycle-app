var ProfileCard = require('/views/SocialComponents/ProfileCard');

function SocialController(){

};

SocialController.prototype.refreshProfileCardTable = function(type){
	var self = this;
	if (type) {
		console.log("Grab the profiles via REST call based on type");
		switch (type) {
			case 'ALL':
				break;
			default:
				break;
		}
	}
	else {
		console.log("Grab all profiles (or default page) view REST call");
		userClient.getAllUsers(function (results) {
			self.addRows(results);
		});
	}
	
};

SocialController.prototype.addRows = function(users) {
	for (var key in users) {
		var r = new ProfileCard(users[key]);
		socialView.scrollingProfileCardsComponent.addRowToTable(new ProfileCard(users[key]));
	}
}

module.exports = SocialController;