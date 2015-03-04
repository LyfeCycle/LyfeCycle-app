var SideMenuView = function(){
	this.viewWidth = 100;
	this.overlay = this.generateOverlay();
	this.view = this.generateSideMenuView();
};

SideMenuView.prototype.generateOverlay = function(){
	var overlay = Ti.UI.createView({
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 50,
		opacity: 0
	});

	overlay.addEventListener('click', function(){
		sideMenuController.closeSideMenu();
	});

	return overlay;
};

SideMenuView.prototype.generateSideMenuView = function(){
	var main = Ti.UI.createView({
		height: '100%',
		width: this.viewWidth,
		left: -1*this.viewWidth,
		backgroundColor: '#555',
		zIndex: 100
	});

	main.add(generateTableRow('Home', 0));
	main.add(generateTableRow('Maps', 1));
	main.add(generateTableRow('Reports', 2));
	main.add(generateTableRow('Social', 3));
	return main;

	// HELPER FUNCTIONS

	function generateTableRow(name, index){
		var autoTop = 50;
		var height = 30;
		var row = Ti.UI.createView({
			height: height,
			width: '100%',
			id: name,
			top: autoTop + index*height
		});

		row.add(
			Ti.UI.createLabel({
				text: name,
				color: 'white',
				font: {fontSize: 14},
				width: '100%',
				textAlign: 'center'
			})
		);

		row.add(
			Ti.UI.createView({
				backgroundColor: 'white',
				bottom: 0,
				width: '100%',
				height: 1
			})
		);

		if (index === 0) {
			row.add(
				Ti.UI.createView({
					backgroundColor: 'white',
					top: 0,
					width: '100%',
					height: 1
				})
			);
		}

		row.addEventListener('click', function(){
			switch (row.id) {
				case 'Home':
					windowController.goToHomeWindow();
					break;
				case 'Maps':
					windowController.goToDirectionWindow();
					break;
				case 'Reports':
					windowController.goToReportWindow();
					break;
				case 'Social':
					windowController.goToSocialWindow();
					break;
			}
		});

		return row;
	};
};

module.exports = SideMenuView;