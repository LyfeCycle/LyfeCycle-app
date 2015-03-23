function FromDirectionComponent(){
	this.view = this.createRideCompletitionModal();
};

// On Done button click, remove polyline
FromDirectionComponent.prototype.createRideCompletitionModal = function(){
	var self = this;
	var view = Ti.UI.createView({
		height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0
	});
	var modal = Ti.UI.createView({
		width: '90%',
		height: '90%',
		backgroundColor: '#888',
		borderColor: '#222',
		borderRadius: 10,
		borderWidth: 3
	});
	var title = Ti.UI.createLabel({
		top: '6%',
		text: 'Awesome!',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 20}
	});
	var middleBar = Ti.UI.createView({
		height: '35%',
		top: '22%',
		left: '49%',
		width: '0.5%',
		backgroundColor: 'white'
	});
	var leftTitle = Ti.UI.createLabel({
		top: '25%',
		left: '5%',
		width: '40%',
		text: 'Predicted Time',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});
	var rightTitle = Ti.UI.createLabel({
		top: '25%',
		right: '5%',
		width: '40%',
		text: 'Real Time',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});
	this.leftTime = Ti.UI.createLabel({
		top: '48%',
		left: '5%',
		width: '40%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16},
	});
	this.rightTime = Ti.UI.createLabel({
		top: '48%',
		right: '5%',
		width: '40%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16},
	});
	this.result = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 18},
		textAlign: 'center',
		width: '95%',
		bottom: '20%'
	});


	modal.add(rightTitle);
	modal.add(leftTitle);
	modal.add(this.rightTime);
	modal.add(this.leftTime);
	modal.add(this.result);
	modal.add(title);
	modal.add(middleBar);
	view.add(modal);

	view.addEventListener('click', function(){
		self.hide();
	});

	return view;
};

FromDirectionComponent.prototype.render = function(time1, time2){
	this.leftTime.setText('5:00');
	this.rightTime.setText('19:00');
	this.result.setText(createResultText(time1, time2));
	this.view.animate(Ti.UI.createAnimation({opacity: 1.0, duration: 200}));

	function createResultText(time1, time2) {
		return 'Result text';
	}
};

FromDirectionComponent.prototype.hide = function(){
	this.view.animate(Ti.UI.createAnimation({opacity: 0.0, duration: 200}));
};

module.exports = FromDirectionComponent;