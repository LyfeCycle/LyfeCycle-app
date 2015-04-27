var headerHeight = 50;
var activeRouteBarHeight = 10;

function RouteListComponent() {
	this.tableHeader;
	this.view = this.createDirectionTable();
};

RouteListComponent.prototype.createDirectionTable = function() {
	var main = Ti.UI.createView({
		bottom: Constants.mapComponentHeightNegative,
		height: Constants.mapComponentHeight,
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
		right: Constants.deviceWidth*.1 + 5,
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 5
	});
	this.cancelButton = Ti.UI.createLabel({
		height: '80%',
		right: 10,
		color: 'black',
		text: 'X',
		font: {fontFamily: Constants.font, fontSize: 20}
	});
	var startLabel = Ti.UI.createLabel({
		text: 'Go!',
		font: {fontSize: 19, fontFamily: 'Helvetica Neue'},
		color: 'black'
	});

	// Yellow active ride bar
	this.activeRouteBar = createActiveRouteBar();

	var activeLabel = Ti.UI.createLabel({
		font: {fontFamily: Constants.font, fontSize: 10, fontStyle: 'italic'},
		text: 'Currently on route',
		left: 10,
		color: 'black'
	});

	this.startButton.add(startLabel);
	this.activeRouteBar.view.add(activeLabel);
	this.tableHeader.add(destination);
	this.tableHeader.add(this.startButton);
	this.tableHeader.add(this.cancelButton);
	this.view.add(this.activeRouteBar.view);
	this.view.add(this.tableHeader);

	// Events
	this.startButton.addEventListener('click', function(){
		directionController.routeListComponentController.toggleRide();
	});

	this.cancelButton.addEventListener('click', function(){
		directionController.routeListComponentController.cancelList();
	});

	function createActiveRouteBar(){
		var bar = this;
		bar.view = Ti.UI.createView({
			width: '100%',
			height: activeRouteBarHeight,
			backgroundColor: 'yellow',
			top: activeRouteBarHeight
		});

		bar.render = function(){
			bar.view.animate(Ti.UI.createAnimation({
				top: 0, duration: 50
			}));
		};

		bar.hide = function(){
			bar.view.animate(Ti.UI.createAnimation({
				top: activeRouteBarHeight, duration: 50
			}));
		}

		return bar;
	};
};

RouteListComponent.prototype.createDirectionRow = function(step) {
	// Seperate helper instruction from main string if one exists
	var helperInstructionText = step.text.indexOf('<div') > -1 ? step.text.match(/(<div.*>)(.*)(<\/div>)/)[0] : '';
	if (helperInstructionText) step.text = step.text.substring(0, step.text.indexOf('<div'));

	var row = Ti.UI.createTableViewRow({
		className: 'directionRow',
		selectedBackgroundColor: '#ddd',
		height: 110,
		backgroundColor: 'white'
	});

	// This is where we change the icon for each row
	var descriptionImage = ManeuverModel.validType(step.maneuver) ? Ti.UI.createImageView({
		right: 10,
		height: 50,
		width: 50,
		top: 10,
		image: ManeuverModel.IMAGES[step.maneuver]
	}) : null;

	// Add incidents to bottom
	// top: 70, height: 15
	var incidentRow = Ti.UI.createScrollView({
		contentHeight: 15, 
		height: 25, 
		width: Constants.deviceWidth - 70, 
		left: 10,
		showVerticalScrollIndicator: false,
		showHorizontalScrollIndicator: true,
		top: 62
	});
	console.log(step);
	for (var incident in step.alerts)
		incidentRow.add(createIncidentRowElement(incident, step.alerts[incident]));


	if (descriptionImage) row.add(descriptionImage);
	row.add(incidentRow);
	row.add(Ti.UI.createLabel({bottom: 5, right: 10, text: step.distance}));
	row.add(Ti.UI.createLabel({top: 10, left: 10, width: Constants.deviceWidth - 70, text: step.text.replace(/(<([^>]+)>)/ig, "")}));
	row.add(Ti.UI.createLabel({bottom: 5, left: 10, width: Constants.deviceWidth - 70, text: helperInstructionText.replace(/(<([^>]+)>)/ig, ""), font: {fontStyle: 'italic'}}));

	return row;

	// Helper functions
	function createIncidentRowElement(index, incident){
		var view = Ti.UI.createView({
			backgroundColor: 'yellow',
			height: 22, width: 22,
			left: 26*index,
			borderRadius: 11
		});

		view.add(Ti.UI.createImageView({
			image: IncidentTypeModel.IMAGES_ARRAY[incident],
			width: '70%', height: '70%'
		}));

		return view;
	};
};

module.exports = RouteListComponent;