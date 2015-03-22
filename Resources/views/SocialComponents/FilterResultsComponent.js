var resultPages = [{title: 'All', id: 'ALL'}, {title: 'Nearby', id: 'NEARBY'}];

function FilterResultsComponent(){
	this.resultPages = resultPages;
	this.view = this.createFilterResultsComponent();
};

FilterResultsComponent.prototype.createFilterResultsComponent = function(){
	var main = Ti.UI.createScrollableView({
		height: '15%',
		top: '4%',
		showPagingControl: false
	});

	var views = [];
	for (var key in this.resultPages) views.push(this.createFilterPage(this.resultPages[key], key));

	main.setViews(views);

	main.addEventListener('scrollEnd', function (e){
		// Call controller here to make REST calls
		socialController.refreshProfileCardTable(e.view.id);
	});

	return main;
};

FilterResultsComponent.prototype.createFilterPage = function(filterInfo, key){
	var self = this;
	var main = Ti.UI.createView({
		height: '100%',
		width: '100%',
		backgroundColor: '#ccc',
		id: filterInfo.id
	});

	var title = Ti.UI.createLabel({
		font: {fontSize: 24, fontFamily: Constants.fontKG},
		text: filterInfo.title,
		color: 'white'
	});

	var leftArrow = Ti.UI.createLabel({
		height: '90%',
		left: '5%',
		text: '<',
		color: 'white',
		font: {fontFamily: Constants.fontMillion, fontSize: 30}
	});

	var rightArrow = Ti.UI.createLabel({
		height: '90%',
		right: '5%',
		text: '>',
		color: 'white',
		font: {fontFamily: Constants.fontMillion, fontSize: 30}
	});

	main.add(title);
	if (key != 0) main.add(leftArrow);
	if (key != this.resultPages.length-1) main.add(rightArrow);

	// Events
	leftArrow.addEventListener('click', function(){
		self.view.movePrevious();
	});

	rightArrow.addEventListener('click', function(){
		self.view.moveNext();
	});

	return main;
};



module.exports = FilterResultsComponent;