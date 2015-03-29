// Login controller

function Session() {
	this.logged_in_state = false;

	// Facebook login/logout
	fb.addEventListener('login', function(e) {
		if (e.success) {
			this.logged_in_state = true;
			windowController.goToHomeWindow();
			console.log('fb third_party_id: ', fb.getUid());
		}
	});
	fb.addEventListener('logout', function(e) {
	    this.logged_in_state = false;
	});
};

Session.prototype.getLoginStatus = function() {
	if (logged_in_state == true) {
		return true;
	}
	else return false;
};

Session.prototype.Login = function() {
	windowController.goToLoginWindow();
};

Session.prototype.Logout = function() {
	windowController.goToLoginWindow();
};

Session.prototype.setLoginStateTrue = function() {
	this.logged_in_state = true;
};

Session.prototype.setLoginStateFalse = function() {
	this.logged_in_state = false;
}

module.exports = Session;