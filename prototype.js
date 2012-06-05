// * Walk through the data and find weigh-ins.
// * Construct Burn Samples from these weigh-ins by calculating 
// the weight delta between the two weight points and the calories 
// burned that resulted in that delta.

// Basically, a burn sample tells us: "Between dateA and dateB, 
// XXXX calorie burn lead to Y.Y weight loss/gain."

// * Sort the burnSamples in order of steps, ascending.

// Fake and presorted burn samples
var burnSamples = [
	{ steps: 9000, 	change:  0.1 },
	{ steps: 9500, 	change:  0.05 },
	{ steps: 11000, change: -0.1 },
	{ steps: 12000, change: -0.2 },
	{ steps: 14000, change: -0.4 }
]

// * calculate average weight burn per step


var i,
	averageChangePerStep = 0;

for (i=0;i<burnSamples.length;i++) {

	// Flip places
	var right = burnSamples[i+1],
		left  = burnSamples[i];
	
	if (!burnSamples[i+1]) break; // reached final

	var stepDiff = right.steps-left.steps,
		changeDiff = right.change-left.change,
		changePerStep = changeDiff/stepDiff;

	averageChangePerStep += changePerStep;

}
averageChangePerStep = averageChangePerStep/(burnSamples.length-1);
console.log("Average change per step:", averageChangePerStep)
// * calculate how many steps each data point would need to 
// be changed to to get a 0 change

var averageStepsToGetTargetChange = 0;
for (i=0;i<burnSamples.length;i++) { 
	var dp = burnSamples[i]; 
	var stepsDelta = (-dp.change)/averageChangePerStep; // 0.1 / 0.0001 = 1000
	var targetSteps = dp.steps + stepsDelta;
	averageStepsToGetTargetChange += targetSteps;
}
averageStepsToGetTargetChange = 
	averageStepsToGetTargetChange/burnSamples.length;

console.log("averageStepsToGetTargetChange", averageStepsToGetTargetChange)


