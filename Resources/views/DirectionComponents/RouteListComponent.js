function RouteListComponent() {
	this.tableHeader = this.createDirectionTableHeader();
	this.view = this.createDirectionTable();
}

RouteListComponent.prototype.generateRouteList = function(directions) {
	// var jsonParsed = JSON.parse(directions);
	// if (jsonParsed.routes && jsonParsed.routes.length > 0 && jsonParsed.routes[0].legs.length > 0) {
	// 	var route = jsonParsed.routes[0].legs[0];
	// 	this.updateDirectionTableData(route.steps, route);
	// } else {
	// 	Ti.API.info("No routes to add");
	// }
	// this.updateDirectionTableData(route.steps, route);
	this.updateDirectionTableData();
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
		image: 'images/gear.png'
	});
	var distance = Ti.UI.createLabel({
		right: 10,
		top: 70,
		text: step.distance.text
	});
	var instruction = Ti.UI.createLabel({
		top: 10,
		left: 10,
		width: Constants.deviceWidth - 70,
		text: step.html_instructions.replace(/(<([^>]+)>)/ig, "")
	});
	row.add(descriptionImage);
	row.add(distance);
	row.add(instruction);
	return row;
};

RouteListComponent.prototype.createDirectionTable = function() {
	return Ti.UI.createTableView({
		top: 200,
		width: Constants.deviceWidth,
		backgroundColor: 'white',
		visible: false
	});
};

RouteListComponent.prototype.updateDirectionTableData = function(directions, meta) {
	var header = this.createDirectionTableHeader(meta);
	var directionSection = Ti.UI.createTableViewSection({
		headerTitle: 'Directions'
	});
	// for (var i = 0; i < directions.length; i++) {
	// 	directionSection.add(this.createDirectionRow(directions[i]));
	// }
	this.view.setData([this.tableHeader, directionSection]);
	this.view.show();
};

RouteListComponent.prototype.createDirectionTableHeader = function(meta) {
	var row = Ti.UI.createTableViewRow({
		className: 'header',
		backgroundColor: Constants.green,
		height: 50
	});
	var ok = Ti.UI.createLabel({
		right: '5%',
		text: 'Ok!',
		font: {fontSize:14, fontFamily: 'Helvetica Neue'},
		color: 'white'
	});
	// var distanceText = Ti.UI.createLabel({
	// 	text: 'Total distance: ' + meta.distance.text,
	// 	color: 'white'
	// });
	// var destinationText = Ti.UI.createLabel({
	// 	text: 'To ' + meta.end_address,
	// 	color: 'white'
	// });
	// var timeText = Ti.UI.createLabel({
	// 	text: 'Will take ' + meta.duration.text,
	// 	color: 'white'
	// });
	// row.add(distanceText);
	// row.add(destinationText);
	// row.add(timeText);
	row.add(ok);
	return row;

}

module.exports = RouteListComponent;