function ConfirmReportComponent(){
	this.overlay = this.createOverlay();
	this.modal = this.createConfirmReportComponent();
};

ConfirmReportComponent.prototype.createOverlay = function(){
	var main = Ti.UI.createView({
		backgroundColor: 'rgba(0,0,0,0.4)',
		height: '100%',
		width: '100%',
		opacity: 0
	});

	main.addEventListener('click', function(){
		reportController.closeConfirmModal();
	});

	return main;
};

ConfirmReportComponent.prototype.createConfirmReportComponent = function(){
	var modal = Ti.UI.createView({
		width: '80%',
		height: '22%',
		backgroundColor: Constants.green,
		borderRadius: 8,
		borderWidth: 3,
		borderColor: '#aaa',
		opacity: 0
	});

	modal.add(
		Ti.UI.createLabel({
			color: 'white',
			font: {fontFamily: Constants.fontKG, fontSize: 20},
			top: 1,
			text: 'Are you sure?'
		})
	);

	var yes = Ti.UI.createView({
		left: '10%',
		bottom: '10%',
		width: '35%',
		height: '50%',
		backgroundColor: Constants.darkGreen,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#aaa'
	});

	yes.add(
		Ti.UI.createLabel({
			color: 'white',
			font: {fontFamily: Constants.fontKG, fontSize: 20},
			text: 'Yes'
		})
	);

	var no = Ti.UI.createView({
		right: '10%',
		bottom: '10%',
		width: '35%',
		height: '50%',
		backgroundColor: Constants.darkGreen,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#aaa'
	});

	no.add(
		Ti.UI.createLabel({
			color: 'white',
			font: {fontFamily: Constants.fontKG, fontSize: 20},
			text: 'No'
		})
	);

	// Events

	yes.addEventListener('click', function(){
		reportController.confirmReport();
		reportController.closeConfirmModal();
	});

	no.addEventListener('click', function(){
		reportController.closeConfirmModal();
	});

	modal.add(yes);
	modal.add(no);

	return modal;
};

module.exports = ConfirmReportComponent;