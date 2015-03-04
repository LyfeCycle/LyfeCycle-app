function HomeMenuView() {
	this.mapButton;
	this.reportButton;
	this.socialButton;
	this.view = this.createHomeView();
};

HomeMenuView.prototype.createHomeView = function(){

	this.mapButton = createButton('Maps', '/images/compass-black.png', '10%');
	this.reportButton = createButton('Reports', '/images/traffic-cone-black.png', '30%');
	this.socialButton = createButton('Social', '/images/comment-black.png', '50%');

	var main = Ti.UI.createView({
		height: Constants.viewHeight,
		width: '100%',
		backgroundColor: '#ddd',
		bottom: 0
	});

	main.add(this.mapButton);
	main.add(this.reportButton);
	main.add(this.socialButton);

	// Events

	this.mapButton.addEventListener('click', function() {
		console.log("Clicking map button");
		windowController.goToDirectionWindow();
	});

	this.reportButton.addEventListener('click', function() {

	});

	this.socialButton.addEventListener('click', function() {
		windowController.goToSocialWindow();
	});

	return main;


	function createButton(title, img, top, callback) {
		var view = Ti.UI.createView({
			top: top,
			width: Constants.homeViewButtonWidth,
			height: 80
		});

		var imgViewBg = Ti.UI.createView({
			width: 70,
			height: 70,
			left: 10,
			backgroundColor: Constants.green,
			borderRadius: 35
		});

		var imgShadow = Ti.UI.createView({
			width: 70,
			height: 70,
			left: 13,
			top: 10,
			backgroundColor: '#000',
			borderRadius: 35
		});

		var imgView = Ti.UI.createImageView({
			image: img,
			width: '70%',
			height: '70%'
		});

		var label = Ti.UI.createLabel({
			text: title,
			left: 100,
			font: {fontSize: 25, fontFamily: Constants.standardFont}
		});

		imgViewBg.add(imgView);
		view.add(imgShadow);
		view.add(imgViewBg);
		view.add(label);

		// view.addEventListener('click', callback());
		return view;
	}

	function createBanner(height) {
		var imgSize = height*0.7,
			imgLeft = 10;

		var view = Ti.UI.createView({
			width: Constants.deviceWidth,
			height: height,
			top: 0,
			backgroundColor: Constants.green
		});

		var imgView = Ti.UI.createImageView({
			height: imgSize,
			width: imgSize,
			left: imgLeft,
			image: '/images/bike_wheel.png'
		});

		var label = Ti.UI.createLabel({
			// left: imgLeft + imgSize + 10,
			text: 'LyfeCycle',
			right: imgLeft,
			font: {fontSize: 42, fontFamily: Constants.fontMillion}
		});

		view.add(imgView);
		view.add(label);
		return view;
	}
};

module.exports = HomeMenuView;
