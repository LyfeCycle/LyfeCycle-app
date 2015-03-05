function IncidentPanelComponent(){
	this.view = this.createIncidentPanelComponent();
};

IncidentPanelComponent.prototype.createIncidentPanelComponent = function(){
	var main = Ti.UI.createView({
		width: '65%',
		height: '12%',
		top: -10,
		borderRadius: 8,
		backgroundColor: Constants.darkGreen
	});

	return main;
};

module.exports = IncidentPanelComponent;