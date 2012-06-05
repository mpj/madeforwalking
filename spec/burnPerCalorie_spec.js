var vows = require('vows'),
    assert = require('assert');

var burnPerCalorie = require('../lib/burnPerCalorie');

vows.describe('burnPerCalorie').addBatch({
    
    'Mixed': {

        topic: function() {
            return burnPerCalorie([
                { calories: 9000,  change:  0.1 },
                { calories: 9500,  change:  0.05 },
                { calories: 11000, change: -0.1 },
                { calories: 12000, change: -0.2 },
                { calories: 14000, change: -0.4 }
            ])
        },

        'should be -0.0001': function (val) {
            assert.equal (val, -0.0001);
        }
    },

    'All positive': {

        topic: function() {
            return burnPerCalorie([
                { calories: 9000,  change:  0.1 },
                { calories: 9500,  change:  0.025 },
                { calories: 9500,  change:  0.025 },
            ])
        },

        'should be -0.0001': function (val) {
            assert.equal (val, -0.0001);
        }
    },


}).export(module); // Export the Suite