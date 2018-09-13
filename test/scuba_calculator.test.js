
//var chai = require('chai');
var assert = chai.assert;

describe('ArrayTesting', function() {
    it('should start empty', function() {
        var arr = [];

        assert.equal(arr.length, 0);
    });
});

describe('scuba_calculator', function(){

    describe('findPressureGroup', function(){
        it('should return 8', function(){
            assert.equal(findPressureGroup(0,47), 8);
        });
        it('should return 0', function(){
            assert.equal(findPressureGroup(0, 5), 0);
        });
        it('should return 24', function(){
            assert.equal(findPressureGroup(0,186), 24);
        });
        it('should return 21', function(){
            assert.equal(findPressureGroup(0,139), 21);
        });
        it('should return 1000', function(){
            assert.equal(findPressureGroup(0,205), 1000);
        });
        it('should return 8', function(){

        });
    });

    describe('safetyStopCheck', function(){
        it('should be false', function(){
            assert.equal(safetyStopCheck(0, 0), false);
        });
        it('should be false', function(){
            assert.equal(safetyStopCheck(3, 4), false);
        });
        it('should be false', function(){
            assert.equal(safetyStopCheck(17, 3), false);
        });
        it('should be false', function(){
            assert.equal(safetyStopCheck(19, 2), false);
        });
        it('should be false', function(){
            assert.equal(safetyStopCheck(21, 1), false);
        });
        it('should be false', function(){
            assert.equal(safetyStopCheck(23, 2), false);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(0, 10), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(3, 11), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(7, 8), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(15, 5), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(20, 2), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(22, 1), true);
        });
        it('should be true', function(){
            assert.equal(safetyStopCheck(21, 3), true);
        });
    });

    describe('findNewPressureGroup', function(){

    });

    describe('findRNT', function(){

    });

    describe('pressureIndexToLetter', function(){
        it('should be A', function(){
            assert.equal(pressureIndexToLetter(0), "A");
        });
        it('should be Z', function(){
            assert.equal(pressureIndexToLetter(25), "Z");
        });

    })


});