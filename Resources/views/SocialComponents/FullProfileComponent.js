var FullProfileComponent = function(userObj){
	this.name = userObj.name;
	this.miles = userObj.miles;
	this.neighborhood = userObj.neighborhood;
	this.totalTime = userObj.totalTime;
	this.achievements = userObj.achievements;
	this.profPic = userObj.profPic;
	this.view = this.generateFullProfile();
};

FullProfileComponent.prototype.generateFullProfile = function(){
	var self = this;
	var main = Ti.UI.createView({
		fullscreen: true,
		backgroundColor: 'rgba(0,0,0,0.3)',
		opacity: 0
	});

	var container = Ti.UI.createView({
		width: '90%',
		height: '90%',
		backgroundColor: '#888',
		borderColor: '#222',
		borderRadius: 10,
		borderWidth: 3
	});

	var profPic = Ti.UI.createImageView({
		top: '7%',
		left:'10%',
		image: this.profPic,
		width: '15%'
	});

	var name = Ti.UI.createLabel({
		top: '6%',
		right: '10%',
		text: this.name,
		width: '68%',
		height: '9%',
		textAlign: 'right',
		font: {fontFamily: Constants.fontKG, fontSize: 20}
	});

	var neighborhood = Ti.UI.createLabel({
		top: '14%',
		right: '10%',
		text: this.neighborhood,
		textAlign: 'center',
		font: {fontFamily: 'Helvetica Neue', fontSize: 13},
		color: 'red'
	});

	var totalMilesValue = Ti.UI.createLabel({
		text: this.miles,
		color: 'white',
		top: '20%',
		left: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 14}
	});

	var totalTimeValue = Ti.UI.createLabel({
		text: this.totalTime,
		color: 'white',
		top: '20%',
		right: '10%',
		font: {fontFamily: Constants.fontKG, fontSize: 14}
	});

	var bio = Ti.UI.createLabel({
		text: 'I love bicycling so much. My favorite professor is Pisano! I ride my bike to work every day...',
		color: '#ddd',
		top: '27%',
		right: '10%',
		left: '10%',
		textAlign: 'center',
		font: {fontFamily: 'Helvetica Neue', fontSize: 15}
	});

	var line = Ti.UI.createView({
		width: '95%',
		height: 1,
		top: '45%',
		backgroundColor: '#555'
	});

	container.add(profPic);
	container.add(name);
	container.add(neighborhood);
	container.add(totalMilesValue);
	container.add(totalTimeValue);
	container.add(bio);
	container.add(line);

	main.add(container);

	main.addEventListener('click', function(){
		self.close();
	});

	return main;
};

FullProfileComponent.prototype.close = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 0
	});
	this.view.animate(animation);
};

FullProfileComponent.prototype.render = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1.0
	});
	this.view.animate(animation);
};

module.exports = FullProfileComponent;

