If my eating habits are like the last few weeks, how many steps do I need to walk to maintain my weight? YYYYY


TIP: Historically, on the days where you've walked to little, you walked XXX too little on average, so you should walk YYYYY+XXX today.


Problem:
I want to know, at the start of each day, how many steps I
need to walk to maintain or lose weight. 

Can I look at recent history of steps and weight gains, and figure out at what point I on average lose/gain weight? 


Solution: 

* Subscribe to API updates and update weight and step data from the API.
* Populate data. Data refers to steps connected to a date, or weight connected to a datetime.
	* This is done by an inital walk of the data from the fitbit api, stepping backwards in dates until we have a good sample. 
	* After this, the data is updated by subscribing to changes to fitbit. 
      These are added to the data.

* Walk through the data and find weigh-ins.

We have datetimes when we had a certain weight. 
Between these, we have calorie burn.


* Construct Burn Samples from these weigh-ins by calculating the weight delta between the two weight points and the calories burned that resulted in that delta.
Basically, a burn sample tells us: "Between dateA and dateB, XXXX calorie burn lead to Y.Y weight loss/gain."

9000	11000    12000 
0.1     -0.1     -0.2

Varför kan jag inte bara slå ihop dem?
Because there is an arbitrary base value messing things up.



Weight before period: 68kg
Calories burned during period: 28000
Calories eaten  during period: ?????
Weight after period: 65kg

What did we learn? That 28000 is more than we ate, and that we lost 3kg = 
That we this week needed to burn 28000 cals to lose 3kg.
Does this tell us that weight burn is 1kg per 9333 calories?

NO, because there is an unknown EATEN here, burn of weight did NOT start at 0 calories. We CANNOT know from this single data point where exactly burn started, because we ate an unknown amount of calories. 

This is why we need more data points. 





Weight before period: 65kg
Calories burned during period: 11000
Weight after period: 66kg

What can we learn from this data point? 
That we need to burn 11000 to GAIN 1kg




-(1/(1/(x-2000)))

* Calculate weight burn per calorie burned


9000	11000    12000
0.1     -0.1     -0.2

* calculate how many steps each data point would need to 
  be changed to to get a 0 change

9000				11000    	12000
0.1    				-0.1     02--0.2
-0.1/-.00000625

* Average that number. This number is the number of steps one needs 
  to walk to maintain weight, given no extreme change in eating habits.



TODO: The days don't have to be the day after - the algo will still work if there are days in between weigh-ins.







12000-11000      1000
-0.2--0.1             -0.1


1000/1000=1
-0.1/1000 = -0,0001 kg per steg



