module.exports = function(burnSamples) {
	var totalChangePerStep = 0;
	for (var i=0;i<burnSamples.length;i++) {

		// Flip places
		var right = burnSamples[i+1],
			left  = burnSamples[i];
		
		if (!burnSamples[i+1]) break; // reached final

		var calDiff = right.calories-left.calories,
			changeDiff = right.change-left.change,
			changePerStep = changeDiff/calDiff;

		totalChangePerStep += changePerStep;

	}
	return totalChangePerStep/(burnSamples.length-1);

}