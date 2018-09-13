// Do safetyStops need to be global??? Answer: At the moment yes, used with calculate onclick fn
var safetyStop1 = false;
var safetyStop2 = false;
var safetyStop3 = false;
var safetyStop4 = false;
var group1 = null;
var group2 = null;
var group3 = null;


function formMessageDive1(){
    let msg = "Dive 1<br>";
    let inputs = getInputDive1();
    let depth = parseInt(inputs[0]);
    let time = parseInt(inputs[1]);
    group1 = findPressureGroup(depth, time);
    safetyStop1 = safetyStopCheck(group1, depth);

    if (safetyStop1){
        msg += "WARNING: You will need a 3 minute safety stop at 15 feet<br>";
    }
    msg += "Your pressure group straight after this dive will be:   " + String.fromCharCode(65 + group1);
    msg += "<br>Enjoy your first dive!";

    return msg;
}

function formMessageDiveNum(i){
    let msg = "Dive 2<br>";
    let inputs = getInputDiveNum(i);
    let intervalTime = parseInt(inputs[0]);
    let depthLevel = parseInt(inputs[1]);
    let diveTime = parseInt(inputs[2]);
    //TODO MUUUUUST change group1 to some form with i (may have to recalc?)
    let newGroup = findNewPressureGroup(group1, intervalTime);
    //Could be null!
    let RNT = findRNT(newGroup, depthLevel);

    group2 = findPressureGroup(depthLevel, diveTime + RNT);

    safetyStop2 = safetyStopCheck(group2, depthLevel);

    if (safetyStop2){
        msg += "WARNING: You will need a 3 minute safety stop at 15 feet<br>";
    }
    msg += "Your pressure group straight after this dive will be:   " + String.fromCharCode(65 + group2);
    msg += "<br>Enjoy your second dive!";

    return msg;
}