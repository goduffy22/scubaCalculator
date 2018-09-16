function formMessageDiveNum(i, previousGroup){
    if ((i > 1) && (previousGroup === null)) { //Maybe take out previousGroup from here and use in the loop of the click function
        return ;
    }

    let intervalTime;
    let depthLevel;
    let diveTime;
    let RNT = 0;

    let inputs = getInputDive(i);
    if (i === 1){
        depthLevel = inputs[0];
        diveTime = inputs[1];
    } else {
        intervalTime = parseInt(inputs[0]);
        depthLevel = parseInt(inputs[1]);
        diveTime = parseInt(inputs[2]);
        let newGroup = findNewPressureGroup(previousGroup, intervalTime);
        RNT = findRNT(newGroup, depthLevel);
    }

    let group = findPressureGroup(depthLevel, diveTime + RNT);

    let msg = 'Dive ' + i + '<br>';
    let safetyStop = safetyStopCheck(group, depthLevel);

    if(group === null) {
        let maxTime = table1[depthLevel].slice(-1)[0];
        msg += "DANGER! You have reached the no decompression limit. <br>";
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
        if (safetyStop){
            msg += "WARNING: You will need a 3 minute safety stop at 15 feet<br>";
        }
        msg += "Your pressure group straight after this dive will be:   " + String.fromCharCode(65 + group);
        msg += "<br>Enjoy your dive!";
    }
    return [msg, group, safetyStop];
}