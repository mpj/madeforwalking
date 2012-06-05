/*
 * GET home page.
 */
var FitbitModel = require('../lib/fitbitModel'),
    async = require('async');
    var key = 'df6b2dcad1b445afb2c2f1e23659614d',
    secret = 'd0b2b5cb19a14e958ceab40c444347b5',
    fitbit = new FitbitModel(key, secret);

exports.report = function(req, res) {
  fitbit.ensureAuthenticated(req, res, function(err, token) {
    if (err) {
      throw err;
      return;
    } 

    async.auto({
      
      calories: function(cb) { 
        fitbitData(token, 'activities/calories', cb) }, 
      
      weight:   function(cb) { 
        fitbitData(token, 'body/log/weight', cb) },
      
      steps:    function(cb) { 
        fitbitData(token, 'activities/steps', cb) },

      render: [ 'calories', 'weight', 'steps' ,
        function(callback, result) {
      
          var burnSamples = [];
          var i;
          for (i=0;i<result.weight.length;i++) {
            var w = result.weight[i];

            var wnext = result.weight[i+1];

            if (!wnext) break;
            if (wnext.date == w.date) { 
              continue;
            }


            
            var start = Date.parse(w.date);
            var end  = Date.parse(wnext.date);
            
            var calsPeriod = 0;
            result.calories.forEach(function(c) {
              var d = Date.parse(c.dateTime);
              if(d >= start && d < end)
                calsPeriod += parseInt(c.value);
            })

            var stepsPeriod = 0;
            var missedADay = false;
            result.steps.forEach(function(s) {
              var d = Date.parse(s.dateTime);
              if(d >= start && d < end) {
                 var steps = parseInt(s.value);
                stepsPeriod += steps;
                if (steps < 1000) {
                  missedADay = true;
                }
              }
            })

            if (stepsPeriod == 0 || missedADay) continue;
            // Crappy data if one day is missed.

            
            var STEP_SCALE = 30000;
            var DELTA_SCALE = 2;
            var days = (end-start)/(24*3600*1000);
            var delta = roundIt(wnext.weight-w.weight);
            var deltaPerDay = delta / days;
            var stepsPerDay = Math.floor(stepsPeriod/days);
            var burnPerDay = Math.floor(calsPeriod/days);

            burnSamples.push({
              start: prettyDateString(start),
              end:   prettyDateString(end),
              delta: roundIt(deltaPerDay),
              burn: burnPerDay,
              steps:  stepsPerDay,
              stepsBarSize: Math.floor((stepsPerDay / STEP_SCALE)*200) ,
              deltaBarSize: Math.floor((Math.abs(deltaPerDay)/DELTA_SCALE)*200),
              days: days
            });


          }
          res.render('report.jade', 
              { 
                title: 'Report',
                burnSamples: burnSamples
              });
        }
      ]
    },
    function(err, r) {
      if (err) throw err;
      res.send("OK")
    })
  })

  
}


function roundIt(num) {
  return Math.round(num*100)/100;
}

function prettyDateString(epoch) {
  var d = new Date(epoch);
  var monthName = [ 
    'JAB', 'FEB', 'MAR', 'APR', 'MAR', 'JUN', 
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ][d.getMonth()];
  var dateStr = d.getDate().toString();
  if (dateStr.length == 1) 
    dateStr = "0"+dateStr;
  return monthName + dateStr;
}


function fitbitData(token, dataPath, cb) {
  var path = '/user/-/' + dataPath + '/date/2012-06-05/1m.json';
  callFitbitAPI(token, path, function(err, data) {
    if (err) cb(err)
    else {
      var propName = dataPath.replace('/','-');
      if (propName.indexOf('weight') > -1)
        propName = "weight"; // bullshit case
      cb(null, data[propName]);
    }
  });
}


function callFitbitAPI(token, path, callback) {


  fitbit.get(path, token, function(err, data) {
    if (err) {
      console.warn("Failed connecting to FitBit. Clearing session.", err);
      fitbit.logout(req);
      callback(err, null)
    } else {
      callback(null, data);
    }
    
  })

  
}