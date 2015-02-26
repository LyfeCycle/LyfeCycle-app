var FilterResultsComponent = require('/views/SocialComponents/FilterResultsComponent');
var ScrollingCardsComponent = require('/views/SocialComponents/ScrollingCardsComponent');

function SocialView() {
	this.view = this.createSocialView();
};

SocialView.prototype.createSocialView = function(){
	var self = this;

	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0, backgroundColor: '#ddd'
	});

	this.filterResultsComponent = new FilterResultsComponent();
	this.scrollingCardsComponent = new ScrollingCardsComponent();

	main.add(this.filterResultsComponent.view);
	main.add(this.scrollingCardsComponent.view);

	return main;
};

module.exports = SocialView;