var IncidentTypeModel = require('/models/IncidentTypeModel');

function SettingsController(){
	this.settingsArray = this.createSettingsArray();
};

SettingsController.prototype.createSettingsArray = function(){
	var array = [];
	for (var incident in IncidentTypeModel.TYPES) {
		array.push(true);
	}
	return array;
};

module.exports = SettingsController;