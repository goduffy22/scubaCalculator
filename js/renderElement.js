//TODO Redo this using React.js: Good demo for why React is so useful though!

function addForm(formNumber){
    let html =
        '<label for="intervalHours' + formNumber + '">Surface Interval Time:</label>' +
'<div class="input-group mb-3">' +
        '<select class="custom-select" id="intervalHours' + formNumber + '">' +
            '<option value="0" selected>0</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '<option value="6">6 +</option>' +
        '</select>' +
        '<div class="input-group-append">' +
            '<span class="input-group-text">Hour(s)</span>' +
        '</div>' +
        '<input type="number" min="0" max="59" id="intervalMinutes' + formNumber + '">' +
        '<div class="input-group-append">' +
            '<span class="input-group-text">Minute(s)</span>' +
        '</div>' +
        '</div>' +
        '<label for="depthList' + formNumber + '">Max. Depth (ft) of Dive</label>' +
        '<div class="input-group mb-3"> ' +
            '<select class="custom-select" style="text-align-last: center" id="depthList' + formNumber + '">' +
                '<option selected>Choose...</option>' +
                '<option value="0">35</option>' +
                '<option value="1">40</option>\n' +
                '<option value="2">50</option>\n' +
                '<option value="3">60</option>\n' +
                '<option value="4">70</option>\n' +
                '<option value="5">80</option>\n' +
                '<option value="6">90</option>\n' +
                '<option value="7">100</option>\n' +
                '<option value="8">110</option>\n' +
                '<option value="9">120</option>\n' +
                '<option value="10">130</option>\n' +
            '</select>' +
        '</div> ' +
        '<label for="diveTime' + formNumber + '">Dive Time (mins)</label>' +
        '<div class="input-group mb-3">' +
            '<input type="number" min=0 class="input-group text-center" id="diveTime' + formNumber + '">' +
        '</div>' +
        '<button type="button" class="btn btn-outline-dark" id="' +
                'add' + formNumber +
        '">Add next Dive</button> ' ;
    addElement("form" + formNumber, "div", "dive" + formNumber, html);

    //Add button to add the next form
    let btnName = "add" + formNumber;
    let add = document.getElementById(btnName);

    add.addEventListener("click", function(){
        addForm(formNumber + 1);
    },
        true);
}

const add1 = document.getElementById("add1");

add1.onclick = function(){
    addForm(2);
    return false;
};


function getInputDive(i) {
    const depthList = "depthList" + i;
    const diveTime = "diveTime" + i;
    const list = document.getElementById(depthList);
    const depthLevel = parseInt(list.options[list.selectedIndex].value);
    const time = parseInt(document.getElementById(diveTime).value);

    if (i === 1){
        return [depthLevel, time];
    } else {
        const intervalHours = "intervalHours" + i;
        const intervalMinutes = "intervalMinutes" + i;
        const hours = parseInt(document.getElementById(intervalHours).value);
        const minutes = parseInt(document.getElementById(intervalMinutes).value);
        const intervalTime = hours * 60 + minutes;

        return [intervalTime, depthLevel, time];
    }
}


function renderAlert(i, previousGroup){
    let className = "alert-success";
    let props = formMessageDiveNum(i, previousGroup);
    let msg = props[0]; //Could enter them directly rather than using space to create vars
    let group = props[1];
    let safetyStop = props[2];
    if(group === null){
        className = "alert-danger";
    }
    else if (safetyStop){
        className = "alert-warning";
    }
    const html = '<div class="alert ' + className + ' mt-3" role="alert">' +
        msg +
        '</div>';
    addElement("infoDive", "div", ("alertContainer" + i), html);

    return group;
}

function addElement(parentId, elementTag, elementId, html){
    const p = document.getElementById(parentId);
    const newElement = document.createElement(elementTag);
    newElement.setAttribute("id", elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

document.getElementById("calculate").onclick = function() {
    const infoDive = document.getElementById("infoDive");
    while (infoDive.firstChild) {
        infoDive.removeChild(infoDive.firstChild);
    }
    let group =  renderAlert(1, null); //TODO Make into loop  (could do for infinite element but better in react), sort out black box case
    group = renderAlert(2, group);
    group = renderAlert(3, group);
    renderAlert(4, group);

};

document.getElementById("resetAll").onclick = function() {
    window.location.reload();
};

