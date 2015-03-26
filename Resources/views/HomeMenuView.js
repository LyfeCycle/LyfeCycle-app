function HomeMenuView() {
	this.mapButton;
	this.freeRideButton;
	this.socialButton;
	this.view = this.createHomeView();
};

HomeMenuView.prototype.createHomeView = function(){

	this.mapButton = createButton('Maps', '/images/compass-black.png', '10%');
	this.freeRideButton = createButton('Free Ride', '/images/traffic-cone-black.png', '30%');
	this.socialButton = createButton('Social', '/images/comment-black.png', '50%');

	var main = Ti.UI.createView({
		height: Constants.viewHeight,
		width: '100%',
		backgroundColor: '#ddd',
		bottom: 0
	});

	var transparentLayer = Ti.UI.createView({
		height: Constants.viewHeight,
		opacity: 1.0
	});

	var startLat = 42.3520314;
    var startLong = -71.1255678;
	var delta = 0.005;

	var backgroundMap = MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate:false,
	    regionFit:true,
	    opacity:0.5,
	    region: {latitude:startLat, longitude:startLong, latitudeDelta: delta, longitudeDelta: delta},
	    top: 0,
	    height: Constants.deviceHeight
	});

	main.add(backgroundMap);
	main.add(transparentLayer);
	main.add(this.mapButton);
	main.add(this.freeRideButton);
	main.add(this.socialButton);

	// Events

	this.mapButton.addEventListener('click', function() {
		windowController.goToDirectionWindow();
	});

	this.freeRideButton.addEventListener('click', function() {
		windowController.goToFreeRideWindow();
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
