var ProfileCard = require('/views/SocialComponents/ProfileCard');

function SocialController(){

};

SocialController.prototype.refreshProfileCardTable = function(type){
	if (socialView.scrollingProfileCardsComponent.table)
		socialView.scrollingProfileCardsComponent.table.data = [];
	var self = this;
	if (type) {
		console.log("Grab the profiles via REST call based on type");
		switch (type) {
			case 'ALL':
				userClient.getAllUsers(function (results) {
					self.addRows(results);
				});
				break;
			default:
				userClient.getAllUsers(function (results) {
					self.addRowsByNeighboorhood(results);
				});
				break;
		}
	} else {
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
	// If it's empty, create an empty alert
	if (socialView.scrollingProfileCardsComponent.table.data.length === 0) {
		var row = Ti.UI.createTableViewRow({
			top: 20,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		row.add(Ti.UI.createLabel({
			text: 'Looks like there are no users!',
			font: {fontSize: 25, fontFamily: Constants.font},
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			color: '#999'
		}));
		socialView.scrollingProfileCardsComponent.table.appendRow(row);
	}
};

SocialController.prototype.addRowsByNeighboorhood = function(users) {
	userClient.getCurrentUser(function (user) {
		for (var key in users) {
			if (user.neighborhoodName && user.neighborhoodName === users[key].neighborhoodName) {
				var r = new ProfileCard(users[key]);
				socialView.scrollingProfileCardsComponent.addRowToTable(new ProfileCard(users[key]));
			}
		}
		// If it's empty, create an empty alert
		if (socialView.scrollingProfileCardsComponent.table.data.length === 0) {
			var row = Ti.UI.createTableViewRow({
				top: 20,
				selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
			});
			row.add(Ti.UI.createLabel({
				text: 'Looks like there are no users!',
				font: {fontSize: 25, fontFamily: Constants.font},
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				color: '#999'
			}));
			socialView.scrollingProfileCardsComponent.table.appendRow(row);
		}
	});
};

module.exports = SocialController;