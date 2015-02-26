var FilterResultsComponent = require('/views/SocialComponents/FilterResultsComponent');

function SocialView() {
	this.view = this.createSocialView();
};

SocialView.prototype.createSocialView = function(){
	var self = this;

	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0, backgroundColor: '#ddd'
	});

	this.filterResultsComponent = new FilterResultsComponent();

	main.add(this.filterResultsComponent.view);

	return main;
};

module.exports = SocialView;