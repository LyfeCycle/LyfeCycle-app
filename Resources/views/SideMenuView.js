var SideMenuView = function(){
	this.view = this.generateSideMenuView();
};

SideMenuView.prototype.generateSideMenuView = function(){
	var main = Ti.UI.createView({
		height: '100%',
		width: 80,
		left: -80
	});

	var table = Ti.UI.createTableView({
		height: '100%',
		width: '100%',
		backgroundColor: '#555',
		separatorColor: '#eee'
	});

	var home = generateTableRow('Home');
	home.top = 50;
	table.appendRow(home);
	table.appendRow(generateTableRow('Maps'));
	table.appendRow(generateTableRow('Reports'));
	table.appendRow(generateTableRow('Social'));

	main.add(table);

	return main;

	// HELPER FUNCTIONS

	function generateTableRow(name){
		var row = Ti.UI.createTableViewRow({
			height: 30,
			width: '100%',
			title: name,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			color: 'white',
			font: {fontSize: 14}
		});

		row.addEventListener('click', function(){
			switch (row.title) {
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