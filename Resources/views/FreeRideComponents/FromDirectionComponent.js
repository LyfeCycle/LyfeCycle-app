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
		// top: '10%',
		backgroundColor: '#888',
		borderColor: '#222',
		borderRadius: 10,
		borderWidth: 3
	});
	var title = Ti.UI.createLabel({
		top: '2%',
		text: 'Awesome!',
		textAlign: 'center',
		color: 'red',
		font: {fontFamily: Constants.fontKG, fontSize: 20}
	});
	var subtitle = Ti.UI.createLabel({
		top: '9%',
		text: 'Ride Complete!',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 17}
	});
	var horizontalBar = Ti.UI.createView({
		width: '80%',
		backgroundColor: 'white',
		height: 1,
		top: '15%'
	});
	// var middleBar = Ti.UI.createView({
	// 	height: '35%',
	// 	top: '22%',
	// 	left: '49%',
	// 	width: '0.5%',
	// 	backgroundColor: 'white'
	// });
	var leftSection = Ti.UI.createView({
		height: '30%',
		top: '25%',
		left: '5%',
		width: '40%',
		borderWidth: 3,
		borderColor: 'white',
		borderRadius: 5
	});
	var rightSection = Ti.UI.createView({
		height: '30%',
		top: '25%',
		right: '5%',
		width: '40%',
		borderWidth: 3,
		borderColor: 'white',
		borderRadius: 5
	});
	var leftTitle = Ti.UI.createLabel({
		top: '10%',
		text: 'Predicted Time',
		width: '100%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});
	var rightTitle = Ti.UI.createLabel({
		top: '10%',
		text: 'Real Time',
		width: '100%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16}
	});
	this.leftTime = Ti.UI.createLabel({
		top: '60%',
		width: '100%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16},
	});
	this.rightTime = Ti.UI.createLabel({
		top: '60%',
		width: '100%',
		textAlign: 'center',
		font: {fontFamily: Constants.fontKG, fontSize: 16},
	});
	this.result = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 18},
		textAlign: 'center',
		width: '95%',
		bottom: '28%'
	});
	var thanksText = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 15},
		textAlign: 'center',
		text: 'Thanks for riding with us.\nPlease report any incidents on your route.',
		width: '95%',
		bottom: '5%',
		color: 'red'
	});


	rightSection.add(rightTitle);
	leftSection.add(leftTitle);
	rightSection.add(this.rightTime);
	leftSection.add(this.leftTime);
	modal.add(leftSection);
	modal.add(rightSection);
	modal.add(this.result);
	modal.add(title);
	modal.add(subtitle);
	modal.add(horizontalBar);
	modal.add(thanksText);
	// modal.add(middleBar);
	view.add(modal);

	view.addEventListener('click', function(){
		self.hide();
	});

	return view;
};

FromDirectionComponent.prototype.render = function(timestart, timeend, timepredicted){

	this.leftTime.setText(createTimeText(timestart, timepredicted));
	this.rightTime.setText(createTimeText(timestart, timeend));
	this.result.setText(createResultText(timeend, timepredicted));
	this.view.animate(Ti.UI.createAnimation({opacity: 1.0, duration: 200}));

	function createResultText(time1, time2) {
		if (time1 < time2) return "You're speedy!";
		else if (time1 > time2) return "Slow & steady wins the race!";
		else return "Right on the money!";
	};

	function createTimeText(time1, time2){
		var msec = time2 - time1;
	    var hh = Math.floor(msec / 1000 / 60 / 60);
	    msec -= hh * 1000 * 60 * 60;
	    var mm = Math.floor(msec / 1000 / 60);
	    msec -= mm * 1000 * 60;
	    var ss = Math.floor(msec / 1000);
	    return ((String(hh).length == 1) ? '0'+hh : hh) + ":" + ((String(mm).length == 1) ? '0'+mm : mm) + "." + ((String(ss).length == 1) ? '0'+ss : ss);
	};
};

FromDirectionComponent.prototype.hide = function(){
	this.view.animate(Ti.UI.createAnimation({opacity: 0.0, duration: 200}));
};

module.exports = FromDirectionComponent;