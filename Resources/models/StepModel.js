module.exports.validStep = function(stepJSON) {
	return {
			'latitude': stepJSON['end_location']['lat'],
			'longitude': stepJSON['end_location']['lng'],
			'text': stepJSON['html_instructions'], 
			'distance': stepJSON.distance['text'], 
			'duration': stepJSON.duration['text'],
			'maneuver': stepJSON['maneuver']
		   };
}