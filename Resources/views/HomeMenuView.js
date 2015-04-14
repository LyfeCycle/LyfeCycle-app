function HomeMenuView() {
	this.mapButton;
	this.freeRideButton;
	this.socialButton;
	this.transparentLayer;
	this.backgroundMap;
	this.main;
	this.view = this.createHomeView();
};

HomeMenuView.prototype.createHomeView = function(){
	var self = this;

	this.mapButton = createButton('maps', '/images/compass-black.png', '15%');
	this.freeRideButton = createButton('free ride', '/images/traffic-cone-black.png', '35%');
	this.socialButton = createButton('social', '/images/comment-black.png', '55%');

	this.main = Ti.UI.createView({
		height: Constants.viewHeight,
		width: '100%',
		backgroundColor: '#ddd',
		bottom: 0
	});

	this.transparentLayer = Ti.UI.createView({
		height: Constants.viewHeight,
		opacity: 1.0
	});

	console.log('create home view');

	this.backgroundMap = MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate: false,
	    regionFit: true,
	    userLocation: false,
	    opacity: 0.5,
	    region: {latitude: gpsLocationController.getCurrentLatitude(),
	    		longitude: gpsLocationController.getCurrentLongitude(),
	    		latitudeDelta: 0.001,
	    		longitudeDelta: 0.001},
	    top: 0,
	    height: Constants.deviceHeight
	});

	this.backgroundMap.addEventListener('locUpdate', function(e) {
		console.log("locUpdate caught");
		self.backgroundMap.region = {latitude: gpsLocationController.getCurrentLatitude(),
									longitude: gpsLocationController.getCurrentLongitude()}
	});

	this.main.add(this.backgroundMap);
	this.main.add(this.transparentLayer);
	this.main.add(this.mapButton);
	this.main.add(this.freeRideButton);
	this.main.add(this.socialButton);

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

	return this.main;


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
			font: {fontSize: 42, fontFamily: Constants.font}
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
			font: {fontSize: 42, fontFamily: Constants.font}
		});

		view.add(imgView);
		view.add(label);
		return view;
	}
};

module.exports = HomeMenuView;
