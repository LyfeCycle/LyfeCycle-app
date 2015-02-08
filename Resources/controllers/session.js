// Login controller

function Session() {
	this.logged_in_state = false;
}

Session.prototype.getLoginStatus = function() {
	if (logged_in_state == true) {
		return true;
	}
	else return false;
};

Session.prototype.Login = function() {
	loginwindow = Titanium.UI.createWindow();
}

module.exports = Session;