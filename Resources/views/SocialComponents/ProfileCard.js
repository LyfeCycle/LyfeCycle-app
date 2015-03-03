var FullProfileView = require('/views/SocialComponents/FullProfileComponent');

function ProfileCard(userObj){
	this.name = userObj.name;
	this.miles = userObj.miles;
	this.neighborhood = userObj.neighborhood;
	this.totalTime = userObj.totalTime;
	this.achievements = userObj.achievements;
	this.profPic = userObj.profPic;
	this.view = this.generateProfileCard();
	this.fullProfileView = new FullProfileView(userObj);
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
		backgroundColor: '#888'
	});

	var profPic = Ti.UI.createImageView({
		top: '7%',
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
		top: '20%',
		right: '10%',
		text: this.neighborhood,
		textAlign: 'center',
		font: {fontFamily: 'Helvetica Neue', fontSize: 13},
		color: 'red'
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

	var totalTimeLabel = Ti.UI.createLabel({
		text: 'Total Time: ',
		color: 'red',
		top: '52%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	var totalTimeValue = Ti.UI.createLabel({
		text: this.totalTime,
		color: 'white',
		top: '52%',
		left: '52%',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});

	view.add(profPic);
	view.add(name);
	view.add(neighborhood);
	view.add(line);
	view.add(totalMilesLabel);
	view.add(totalMilesValue);
	view.add(totalTimeLabel);
	view.add(totalTimeValue);
	row.add(view);

	// Events
	row.addEventListener('click', function(){
		self.fullProfileView.render();
	});

	return row;
};

module.exports = ProfileCard;
