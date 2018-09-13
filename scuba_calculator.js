const table1 = [
    [10, 19, 25, 29, 32, 36, 40, 44, 48, 52, 57, 62, 67, 73, 79, 85, 92, 100, 108, 117, 127, 139, 152, 168, 188, 205],
    [9, 16, 22, 25, 27, 31, 34, 37, 40, 44, 48, 51, 55, 60, 64, 69, 74, 79, 85, 91, 97, 104, 111, 120, 129, 140],
    [7, 13, 17, 19, 21, 24, 26, 28, 31, 33, 36, 39, 41, 44, 47, 50, 53, 57, 60, 63, 67, 71, 75, 80],
    [6, 11, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 42, 44, 47, 49, 52, 54, 55],
    [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 33, 35, 36, 38, 40],
    [4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30],
    [4, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25],
    [3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [3, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15, 16], //0 place holder as pressure group J skipped over
    [3, 5, 6, 7, 8, 9, 10, 11, 0, 12, 13],
    [3, 5, 6, 7, 0, 8, 9, 10],
    [0, 4, 5, 6, 7, 8],
    ];


function getInputs() {
    const list = document.getElementById("depthList");
    const depthLevel = list.options[list.selectedIndex].value;
    const time = document.getElementById("diveTime").value;
    return [depthLevel, time];
}

function findPressureGroup(depth, time){
    let depthArray = table1[depth];
    let length = depthArray.length;
    let pressureGroup;
    if (time <= depthArray[0]){
        pressureGroup = 0;
    } else if(time >= depthArray[length - 1]){
        pressureGroup = 1000;
    } else {
        for(let i = 0; i < length-1; i++) {
            if ((depthArray[i] < time) && (time <= depthArray[i + 1])) {
                pressureGroup = i + 1;
            }
        }
    }
    return pressureGroup;
}

function safetyStopCheck (pressureGroup, depth){
    let depthArray = table1[depth];
    let length = depthArray.length;
    let stop;
    stop = length - 4 <= pressureGroup <= length - 2; //Test this, does it need &&???
    return stop;
}

const table2 = [
    [180],
    [228, 47],
    [250, 69, 21],
    [259, 78, 30, 8],
    [268, 87, 38, 16, 7],
    [282, 101, 53, 31, 22, 13, 6],
    [288, 107, 59, 37, 28, 20, 12, 5],
    [294, 113, 65, 43, 34, 26, 18, 11, 5],
    [300, 119, 71, 49, 40, 31, 24, 17, 11, 5],
    [305, 124, 76, 54, 45, 37, 29, 22, 16, 10, 4],
    [310, 129, 81, 59, 50, 42, 34, 27, 21, 15, 9, 4],
    [315, 134, 85, 64, 55, 46, 39, 32, 25, 19, 14, 9, 4],
    [319, 138, 90, 68, 59, 51, 43, 36, 30, 24, 18, 13, 8, 3],
    [324, 143, 94, 72, 63, 55, 47, 41, 34, 28, 23, 17, 12, 8, 3],
    [328, 147, 98, 76, 67, 59, 51, 45, 38, 32, 27, 21, 16, 12, 7, 3],
    [331, 150, 102, 80, 71, 63, 55, 48, 42, 36, 30, 25, 20, 16, 11, 7, 3],
    [335, 154, 106, 84, 75, 67, 59, 52, 46, 40, 34, 29, 24, 19, 15, 11, 7, 3],
    [339, 158, 109, 87, 78, 70, 63, 56, 49, 43, 38, 32, 27, 23, 18, 14, 10, 6, 3],
    [342, 161, 113, 91, 82, 73, 66, 59, 53, 47, 41, 36, 31, 26, 22, 17, 13, 10, 6, 2],
    [345, 164, 116, 94, 85, 77, 69, 62, 56, 50, 44, 39, 34, 29, 25, 21, 17, 13, 9, 6, 2],
    [348, 167, 119, 97, 88, 80, 72, 65, 59, 53, 47, 42, 37, 33, 28, 24, 20, 16, 12, 9, 5, 2],
    [351, 170, 122, 100, 91, 83, 75, 68, 62, 56, 50, 45, 40, 36, 31, 27, 23, 19, 15, 12, 8, 5, 2],
    [354, 173, 125, 103, 94, 86, 78, 77, 65, 59, 53, 48, 43, 39, 34, 30, 26, 22, 18, 15, 11, 8, 5, 2],
    [357, 296, 128, 106, 97, 89, 81, 74, 68, 62, 56, 51, 46, 41, 37, 33, 29, 25, 21, 18, 14, 11, 8, 5, 2],
    [360, 299, 131, 109, 100, 91, 84, 77, 71, 65, 59, 54, 49, 44, 40, 35, 31, 28, 24, 20, 17, 14, 11, 8, 5, 2]
];

function findNewPressureGroup(oldGroup, surfaceInterval){
    const timeIntervals = table2[oldGroup];
    const length = timeIntervals.length;
    let newGroup;
    if(surfaceInterval > timeIntervals[0]){
        newGroup = null;
    } else if (surfaceInterval < timeIntervals[length - 1]) {
        newGroup = oldGroup;
    }
    else {
        for (let i = 0; i < length - 1; i++){
            if (timeIntervals[i+1] < surfaceInterval < timeIntervals[i]){
                newGroup = i;
                }
        }
    }
    return newGroup;
}

table3 = [
    [10, 19, 25, 29, 32, 36, 40, 44, 48, 52, 57, 62, 67, 73, 79, 85, 92, 100, 108, 117, 127, 139, 152, 168, 188, 205],
    [9, 16, 22, 25, 27, 31, 34, 37, 40, 44, 48, 51, 55, 60, 64, 69, 74, 79, 85, 91, 97, 104, 111, 120, 129, 140],
    [7, 13, 17, 19, 21, 24, 26, 28, 31, 33, 36, 38, 41, 44, 47, 50, 53, 57, 60, 63, 67, 71, 75, 80],
    [6, 11, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 42, 44, 47, 49, 52, 54, 55],
    [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 33, 34, 36, 38, 40],
    [4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30],
    [4, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25],
    [3, 6, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16],
    [3, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13],
    [3, 5, 6, 7, 8, 8, 9, 10]
];

function findRNT(pressureGroup, depthLevel){
    const array = table3[depthLevel];
    const RNT = array[pressureGroup];
    return RNT;
}

document.getElementById("calculate").onclick = function(){
    let msg;
    let inputs = getInputs();
    let depth = parseInt(inputs[0]);
    let time = parseInt(inputs[1]);

    let group = findPressureGroup(depth, time);
    msg = "Group: " + group;

    let safety = safetyStopCheck(group, depth);

    if (safety){
        msg += " You will need a 3 minute safety stop at 15 feet";
    }

    let newGroup = findNewPressureGroup(group, 60);
    msg += " \n New pressure group is: " + newGroup;
//working up to here
    let secondDepth = 4;
    let RNT = findRNT(newGroup, secondDepth);

    msg += " RNT is: " + RNT;




    document.getElementById("output").innerHTML = msg;
    //return false;
};

function test() {
    let inputs = getInputs();
    let depth = parseInt(inputs[0]);
    let time = parseInt(inputs[1]);

    let group = findPressureGroup(depth, time);
    document.getElementById("output").innerHTML = group.toString();
    return group;
}



const html = '<div className="card-deck text-center m-2">
