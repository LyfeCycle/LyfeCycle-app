var FilterResultsComponent = require('/views/SocialComponents/FilterResultsComponent');
var ScrollingProfileCardsComponent = require('/views/SocialComponents/ScrollingProfileCardsComponent');

function SocialView() {
	this.view = this.createSocialView();
};

SocialView.prototype.createSocialView = function(){
	var self = this;

	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0, backgroundColor: '#ddd'
	});

	this.filterResultsComponent = new FilterResultsComponent();
	this.scrollingProfileCardsComponent = new ScrollingProfileCardsComponent();

	main.add(this.filterResultsComponent.view);
	main.add(this.scrollingProfileCardsComponent.view);

	return main;
};

module.exports = SocialView;