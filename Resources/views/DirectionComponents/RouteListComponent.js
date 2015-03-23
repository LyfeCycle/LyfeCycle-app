var headerHeight = 50;
var activeRouteBarHeight = 10;

function RouteListComponent() {
	this.tableHeader;
	this.view = this.createDirectionTable();
};

RouteListComponent.prototype.createDirectionTable = function() {
	var main = Ti.UI.createView({
		top: 190,
		width: Constants.deviceWidth,
		visible: false
	})

	this.table = Ti.UI.createTableView({
		top: headerHeight + activeRouteBarHeight,
		width: '100%',
		backgroundColor: Constants.green
	});

	main.add(this.table);
	return main;
};

RouteListComponent.prototype.createDirectionTableHeader = function(destinationText) {

	// Green part of header
	this.tableHeader = Ti.UI.createView({
		top: activeRouteBarHeight,
		backgroundColor: Constants.green,
		height: headerHeight,
		width: '100%'
	});
	var destination = Ti.UI.createLabel({
		left: 10,
		width: Constants.deviceWidth*.6,
		text: destinationText,
		font: {fontSize: 16, fontFamily: 'Helvetica Neue'},
		color: 'white'
	});
	this.startButton = Ti.UI.createView({
		height: '80%',
		width: Constants.deviceWidth*.2,
		right: 10,
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 5
	});
	var startLabel = Ti.UI.createLabel({
		text: 'Go!',
		font: {fontSize: 19, fontFamily: 'Helvetica Neue'},
		color: 'black'
	});

	// Yellow active ride bar
	this.activeRouteBar = Ti.UI.createView({
		width: '100%',
		height: activeRouteBarHeight,
		backgroundColor: 'yellow',
		visible: false,
		top: 0
	});

	var activeLabel = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 10, fontStyle: 'italic'},
		text: 'Currently on route',
		left: 10,
		color: 'black'
	});

	this.startButton.add(startLabel);
	this.activeRouteBar.add(activeLabel);
	this.tableHeader.add(destination);
	this.tableHeader.add(this.startButton);
	this.view.add(this.activeRouteBar);
	this.view.add(this.tableHeader);

	// Events
	this.startButton.addEventListener('click', function(){
		directionController.routeListComponentController.toggleRide();
	});
};

RouteListComponent.prototype.createDirectionRow = function(step) {
	// Seperate helper instruction from main string if one exists
	console.log(step);
	var helperInstructionText = step.text.indexOf('<div') > -1 ? step.text.match(/(<div.*>)(.*)(<\/div>)/)[0] : '';
	if (helperInstructionText) step.text = step.text.substring(0, step.text.indexOf('<div'));

	var row = Ti.UI.createTableViewRow({
		className: 'directionRow',
		selectedBackgroundColor: '#ddd',
		height: 110,
		backgroundColor: 'white'
	});

	// This is where we change the icon for each row
	var descriptionImage = Ti.UI.createImageView({
		right: 10,
		height: 50,
		width: 50,
		top: 10,
		image: (Math.random()<.5) ? 'images/comment-black.png' : 'images/traffic-cone-black.png'
	});

	var distance = Ti.UI.createLabel({
		right: 10,
		top: 70,
		text: step.distance
	});
	var instruction = Ti.UI.createLabel({
		top: 10,
		left: 10,
		width: Constants.deviceWidth - 70,
		text: step.text.replace(/(<([^>]+)>)/ig, "")
	});
	var instructionHelper = Ti.UI.createLabel({
		top: 70,
		left: 10,
		width: Constants.deviceWidth - 70,
		text: helperInstructionText.replace(/(<([^>]+)>)/ig, ""),
		font: {fontStyle: 'italic'}
	});

	row.add(descriptionImage);
	row.add(distance);
	row.add(instruction);
	row.add(instructionHelper);
	return row;
};

module.exports = RouteListComponent;