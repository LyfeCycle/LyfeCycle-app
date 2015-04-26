var IncidentTypeModel = require('/models/IncidentTypeModel');

function SettingsComponent(height, top){
	this.view = this.createSettingsComponent(height, top);
};

SettingsComponent.prototype.createSettingsComponent = function(height, top){
	var view = Ti.UI.createScrollView({
		width: '100%',
		height: height,
		top: top
	});

	var label = Ti.UI.createLabel({
		text: 'Turn on/off certain incidents',
		top: 2,
		height: 40, width: '100%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	for (var setting in IncidentTypeModel.TYPES) {
		view.add(createSlider(IncidentTypeModel.TYPES[setting]));
	}

	view.add(label);
	return view;

	function createSlider(index){
		var row = Ti.UI.createView({
			backgroundColor: 'white',
			width: '100%',
			height: 70,
			top: index*70 + 40,
			id: index
		});
		row.add(Ti.UI.createView({
			backgroundColor: 'black',
			width: '100%',
			height: 1,
			top: 0
		}));
		row.add(Ti.UI.createView({
			backgroundColor: 'black',
			width: '100%',
			height: 1,
			bottom: 0
		}));
		var basicSwitch = Ti.UI.createSwitch({
		  value: true,
		  right: 10
		});
		var picture = Ti.UI.createImageView({
			left: 5, width: 50, image: IncidentTypeModel.IMAGES_ARRAY[index]
		});
		var labelName = Ti.UI.createLabel({
			text: generateRowName(index),
			color: '#000',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			width: '80%',
			left: 60,
			font: {fontStyle: Constants.font, fontSize: 18}
		});


		row.add(basicSwitch);
		row.add(picture);
		row.add(labelName);

		// EVENTS
		basicSwitch.addEventListener('change',function(e){
			settingsController.settingsArray[row.id] = basicSwitch.value;
		});

		return row;

		function generateRowName(index){
			var name = IncidentTypeModel.TYPES_ARRAY[index].split(/(?=[A-Z])/); 
			name[0] = name[0].charAt(0).toUpperCase() + name[0].slice(1);
			var capitalizedName = '';
			for (var i = 0; i < name.length; i++) {
				capitalizedName += name[i] + ' ';
			}
			return capitalizedName;
		};
	};
};

module.exports = SettingsComponent;