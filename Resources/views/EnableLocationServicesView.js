// This view occurs when a user hasn't allow GPS usage for this app

function EnableLocationServicesView() {
	this.view = this.createEnableLocationServicesView();
};


EnableLocationServicesView.prototype.createEnableLocationServicesView = function(){
	var main = Ti.UI.createView({
		width: '100%',
		height: '100%',
		backgroundColor: Constants.green
	});

	var img = Ti.UI.createImageView({
		width: '50%',
		image: '/images/bike_wheel.png',
		top: '5%'
	});

	var title = Ti.UI.createLabel({
		font: {fontSize: 44, fontFamily: Constants.fontMillion},
		text: 'LyfeCycle',
		top: '40%'
	});

	var directions = Ti.UI.createLabel({
		font: {fontSize: 22, fontFamily: Constants.fontKG},
		text: 'Please enable Location Services to use LyfeCycle',
		bottom: '20%',
		textAlign: 'center',
		backgroundColor: '#fff'
	});

	main.add(img);
	main.add(title);
	main.add(directions);

	return main;
};

module.exports = EnableLocationServicesView;