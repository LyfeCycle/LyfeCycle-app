function ScrollingProfileCardsComponent(){
	this.table;
	this.spinner;
	this.view = this.createScrollingProfileCardsComponent();
};

ScrollingProfileCardsComponent.prototype.createScrollingProfileCardsComponent = function(){
	var main = Ti.UI.createView({
		bottom: '2%',
		left: '2%',
		right: '2%',
		top: '21%',
		height: '77%'
	});

	this.table = Ti.UI.createTableView({
		width: '100%',
		separatorColor: 'transparent'
	});

	this.spinner =  Ti.UI.createActivityIndicator({
		color: Constants.green,
		font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		message: 'Loading...',
		style: (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		visible: false
	});

	main.add(this.table);
	main.add(this.spinner);

	return main;
};

ScrollingProfileCardsComponent.prototype.addRowToTable = function(rowInfo){
	this.table.appendRow();
};

ScrollingProfileCardsComponent.prototype.clearTable = function(){
	this.table.setData([]);
}

module.exports = ScrollingProfileCardsComponent;