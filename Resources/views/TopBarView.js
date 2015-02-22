var TopBarView = function() {
	this.view = this.createTopBarView();
};

TopBarView.prototype.createTopBarView = function() {
	var main = Ti.UI.createView({
		backgroundColor: Constants.green,
		width: '100%',
		height: Constants.topBarHeight,
		top: 0
	});

	return main;
};

module.exports = TopBarView;