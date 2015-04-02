var mockUsers = 
[{
	name: 'Kevin Mannix',
	miles: 457.3,
	neighborhood: 'Allston',
	totalTime: '130:55',
	achievements: [],
	profPic: '/images/kevin.png'
}, {
	name: 'Alex Wong',
	miles: 133.9,
	neighborhood: 'Kenmore',
	totalTime: '170:12',
	achievements: [],
	profPic: '/images/alex.jpg'
}, {
	name: 'Deven Dayal',
	miles: 861.2,
	neighborhood: 'Brighton',
	totalTime: '209:28',
	achievements: [],
	profPic: '/images/deven.jpg'
}];
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