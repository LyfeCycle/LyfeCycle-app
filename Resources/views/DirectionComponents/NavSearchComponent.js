function NavSearchComponent() {
	this.navSearchBar = this.createNavSearchBar();
	this.navSearchButton = this.createNavSearchButton();
	this.view = this.createNavSearchComponent();
};

NavSearchComponent.prototype.createNavSearchComponent = function(){
	var main = Ti.UI.createView({
		height: '9%',
		width: '90%',
		top: '2%'
	});

	main.add(this.navSearchButton);
	main.add(this.navSearchBar);

	return main;
};

NavSearchComponent.prototype.createNavSearchBar = function(){
	return Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor: '#FFF',
		color: '#000',
		opacity: 0.7,
		font: {fontSize:14, fontFamily: 'Helvetica Neue'},
		top: 0, 
		left: 0,
		width: '80%',
		height: '100%'
	});
};

NavSearchComponent.prototype.createNavSearchButton = function(){
	var button = Ti.UI.createImageView({
		height: '100%',
		image: '/images/mag_glass.png',
		right: 0,
		top: 0,
		width: '15%'
	});
	return button;
};

module.exports = NavSearchComponent;