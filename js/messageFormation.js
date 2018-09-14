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

    if(noDecompLimit) {
        let maxTime = table1[depth].slice(-1)[0];
            msg += "DANGER! You have reached the no decompression limit. ";
        if(time - maxTime <= 5){
            msg += "You are less than 5 minutes over the limit, consider reducing the dive time. IF you go ahead with the dive" +
                " you MUST do an 8 minute safety stop at 15 feet and have a surface interval time of " +
                " at least 6 hours before your next dive."
        } else {
            msg += "You are more than 5 minutes over the limit. It is strongly recommended that you reduce" +
                "your dive time or maximum depth and then recalculate. IF you go ahead with the dive " +
                "you must take a 15 minute safety stop at 15 feet and don't dive for 24 hours after."
        }
    } else {
        if (safetyStop1) {
            msg += "WARNING: You will need a 3 minute safety stop at 15 feet<br>";
        }
        msg += "Your pressure group straight after this dive will be:   " + String.fromCharCode(65 + group1);
        msg += "<br>Enjoy your first dive!";
    }
    return msg;
}

function formMessageDiveNum(i){
    if (noDecompLimit) {
        return ;
    }
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

    if(noDecompLimit) {
        let maxTime = table1[depthLevel].slice(-1)[0];
        msg += "DANGER! You have reached the no decompression limit.";
        if(diveTime - maxTime <= 5){
            msg += "You are less than 5 minutes over the limit, consider reducing the dive time. IF you go ahead with the dive" +
                " you MUST do an 8 minute safety stop at 15 feet and have a surface interval time of " +
                " at least 6 hours before your next dive.";
        } else {
            msg += "You are more than 5 minutes over the limit. It is strongly recommended that you reduce" +
                "your dive time or maximum depth and then recalculate. IF you go ahead with the dive " +
                "you must take a 15 minute safety stop at 15 feet and don't dive for 24 hours after."
        }
    } else {
        if (safetyStop2){
            msg += "WARNING: You will need a 3 minute safety stop at 15 feet<br>";
        }
        msg += "Your pressure group straight after this dive will be:   " + String.fromCharCode(65 + group2);
        msg += "<br>Enjoy your second dive!";
    }
    return msg;
}