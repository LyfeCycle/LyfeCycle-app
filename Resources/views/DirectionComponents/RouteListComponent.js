function RouteListComponent() {
	this.tableHeader;
	this.view = this.createDirectionTable();
};

RouteListComponent.prototype.createDirectionTable = function() {
	return Ti.UI.createTableView({
		top: 200,
		width: Constants.deviceWidth,
		backgroundColor: 'white',
		visible: false
	});
};

RouteListComponent.prototype.createDirectionTableHeader = function(destinationText) {
	this.tableHeader = Ti.UI.createTableViewRow({
		className: 'header',
		backgroundColor: Constants.green,
		height: 50
	});
	var destination = Ti.UI.createLabel({
		text: destinationText,
		font: {fontSize: 24, fontFamily: 'Helvetica Neue'},
		color: 'white'
	});
	this.tableHeader.add(destination);
};

RouteListComponent.prototype.createDirectionRow = function(step) {
	var row = Ti.UI.createTableViewRow({
		className: 'directionRow',
		selectedBackgroundColor: '#ddd',
		height: 90
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
	row.add(descriptionImage);
	row.add(distance);
	row.add(instruction);
	return row;
};

module.exports = RouteListComponent;