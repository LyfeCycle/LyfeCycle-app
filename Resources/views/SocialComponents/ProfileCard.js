var FullProfileView = require('/views/SocialComponents/FullProfileComponent');

function ProfileCard(userObj){
	console.log("userObj:");
	console.log(userObj);
	this.name = userObj.name;
	console.log(this.name);
	this.miles = userObj.milesRidden;
	this.neighborhood = userObj.neighborhoodName;
	// this.totalTime = userObj.totalTime;
	// this.achievements = userObj.achievements;
	this.profPic = 'https://graph.facebook.com/' + userObj.facebookId + '/picture';
	console.log(this.profPic);
	this.view = this.generateProfileCard().row;
	this.fullProfileView = new FullProfileView(userObj);
	this.profileCardView = this.generateProfileCard().view;
};

ProfileCard.prototype.generateProfileCard = function(){
	var self = this;
	var row = Ti.UI.createTableViewRow({
		top: 20,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	var view = Ti.UI.createView({
		height: 180,
		width: '100%',
		borderColor: '#555',
		borderWidth: 3,
		backgroundColor: '#888',
		top: '1%'
	});

	var profPic = Ti.UI.createImageView({
		top: '3.5%',
		left:'10%',
		image: this.profPic,
		width: '15%'
	});

	var name = Ti.UI.createLabel({
		top: '7%',
		right: '10%',
		text: this.name,
		width: '68%',
		height: '9%',
		textAlign: 'right',
		font: {fontFamily: Constants.fontKG, fontSize: 20}
	});

	var neighborhood = Ti.UI.createLabel({
		text: this.neighborhood,
		textAlign: 'center',
		color: 'red',
		top: '52%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	var line = Ti.UI.createView({
		width: '95%',
		height: 1,
		top: '35%',
		backgroundColor: '#555'
	});

	var totalMilesLabel = Ti.UI.createLabel({
		text: 'Total Miles: ',
		color: 'red',
		top: '40%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	var totalMilesValue = Ti.UI.createLabel({
		text: this.miles,
		color: 'white',
		top: '40%',
		left: '52%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	var neighborhoodLabel = Ti.UI.createLabel({
		text: 'Neighborhood: ',
		color: 'red',
		top: '52%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	var neighborhoodValue = Ti.UI.createLabel({
		text: this.neighborhood,
		color: 'white',
		top: '52%',
		left: '65%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	view.add(profPic);
	view.add(name);
	// view.add(neighborhood);
	view.add(line);
	view.add(totalMilesLabel);
	view.add(totalMilesValue);
	view.add(neighborhoodLabel);
	view.add(neighborhoodValue);
	row.add(view);

	// Events
	row.addEventListener('click', function(){
		self.fullProfileView.render();
	});

	return {
        row: row,
        view: view
    };
};


module.exports = ProfileCard;
