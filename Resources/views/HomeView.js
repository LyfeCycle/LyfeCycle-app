var Constants = require('/views/Constants');

function HomeView() {
	this.mapButton;
	this.reportButton;
	this.socialButton;
	this.main = this.createHomeView();
};

HomeView.prototype.createHomeView = function(){
	this.mapButton = createButton('Maps', null, 50);
	this.reportButton = createButton('Reports', null, 90);
	this.socialButton = createButton('Social', null, 130);

	var main = Ti.UI.createView({
		height: Constants.deviceHeight,
		width: Constants.deviceWidth,
		backgroundColor: '#bbb'
	});

	main.add(this.mapButton);
	main.add(this.reportButton);
	main.add(this.socialButton);

	return main;


	function createButton(title, img, top, callback) {
		var view = Ti.UI.createView({
			top: top,
			width: Constants.homeViewButtonWidth,
			height: 40
		});

		var imgView = Ti.UI.createImageView({
			image: img,
			width: 70,
			height: 70
		});

		var label = Ti.UI.createLabel({
			text: title,
			left: 90,
			font: {fontSize: 20, fontFamily: 'KGHAPPY'}
		});

		view.add(imgView);
		view.add(label);

		// view.addEventListener('click', callback());
		return view;
	}
};

module.exports = HomeView;