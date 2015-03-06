function IncidentPanelComponent(){
	this.open = true;
	this.backgroundColor = '#eee';
	this.handle = this.createHandle();
	this.panel = this.createPanel(); 
	this.view = this.createIncidentPanelComponent();
};

IncidentPanelComponent.prototype.createPanel = function(){
	var main = Ti.UI.createView({
		height: '100%',
		width: '75%',
		borderRadius: 8,
		backgroundColor: Constants.darkGreen,
		right: -2
	});

	var numTypes = Object.keys(IncidentTypeModel.TYPES).length;
	for (var key in IncidentTypeModel.TYPES) {
		main.add(this.generateIcon(key, numTypes, this.backgroundColor));
	}

	return main;
};

IncidentPanelComponent.prototype.createHandle = function(){
	var self = this;
	var handle = Ti.UI.createView({
		width: '25%',
		height: '13%',
		backgroundColor: '#aaa',
		borderRadius: 3,
		left: '8%'
	});

	var arrow = Ti.UI.createImageView({
		image: '/images/handle_arrow.png',
		height: '30%',
		left: 0
		//transform: Ti.UI.create2DMatrix().rotate(270)
	});

	// Animations
	var closePanel = Ti.UI.createAnimation({
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		right: '-18%'
	});

	var openPanel = Ti.UI.createAnimation({
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		right: -10
	});

	// Events
	handle.addEventListener('click', function (){
		if (self.open) {
			arrow.transform = Ti.UI.create2DMatrix().rotate(180);
			self.view.animate(closePanel);
			self.clearPanelChildren();
			self.open = false;
		} else {
			arrow.transform = Ti.UI.create2DMatrix().rotate(0);
			self.view.animate(openPanel);
			self.open = true;
		}
	});

	handle.add(arrow);
	return handle;
};

IncidentPanelComponent.prototype.createIncidentPanelComponent = function(){

	var main = Ti.UI.createView({
		height: '85%',
		width: '24%',
		right: -10
	});

	main.add(this.handle);
	main.add(this.panel);

	return main;
};

IncidentPanelComponent.prototype.generateIcon = function(key, num, backgroundColor){
	var self = this;
	var top = 5;
	var buffer = 2
	var height = ((100-top*2) - buffer*(num-1))/num;
	var mainCircle = Ti.UI.createView({
		backgroundColor: this.backgroundColor,
		left: '5%',
		height: height + '%',
		width: '80%',
		borderRadius: 8,
		top: top + IncidentTypeModel.TYPES[key]*(height + buffer) + '%',
		id: key
	});

	var img = Ti.UI.createImageView({
		height: '80%',
		image: IncidentTypeModel.IMAGES[key]
	});

	mainCircle.add(img);

	// Events

	mainCircle.addEventListener('click', function (e){
		if (this.backgroundColor === 'yellow') {
			self.clearPanelChildren();
			reportController.selectIncident();
		} else {
			self.clearPanelChildren();
			this.backgroundColor = 'yellow';
			reportController.selectIncident(this.id);
		}
	});

	return mainCircle;
};

IncidentPanelComponent.prototype.clearPanelChildren = function(){
	for (var key in this.panel.children) {
		this.panel.children[key].backgroundColor = this.backgroundColor;
	}
	reportController.selectIncident();
};

module.exports = IncidentPanelComponent;