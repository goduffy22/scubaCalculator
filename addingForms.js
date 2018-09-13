//TODO Redo this using React.js: Good demo for why React is so useful though!

function addForm(formNumber){
    let html =
'<div class="input-group mb-3">' +
        '<select class="custom-select" id="intervalHours' + formNumber + '">' +
            '<option value="0" selected>0</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '<option value="6">6</option>' +
            '<option value="7">7</option>' +
        '</select>' +
        '<div class="input-group-append">' +
            '<label class="input-group-text">Hour(s)</label>' +
        '</div>' +
        '<input type="number" min="0" max="59" id="intervalMinutes' + formNumber + '">' +
        '<div class="input-group-append">' +
            '<label class="input-group-text">Minute(s)</label>' +
        '</div>' +
'</div> ' +
        '<div class="input-group mb-3"> ' +
            '<select class="custom-select" id="depthList' + formNumber + '">' +
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
        '<div class="input-group mb-3">' +
            '<input type="number" class="input-group-text" id="diveTime' + formNumber + '">' +
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
        true); //3rd dive added but then refreshes straight away (tried bubbling and trickling
}

function getInputDive1() {
    const list = document.getElementById("depthList1");
    const depthLevel = parseInt(list.options[list.selectedIndex].value);
    const time = parseInt(document.getElementById("diveTime1").value);
    return [depthLevel, time];
}

function getInputDiveNum(i) {
    const depthList = "depthList" + i;
    const diveTime = "diveTime" + i;
    const intervalHours = "intervalHours" + i;
    const intervalMinutes = "intervalMinutes" + i;

    const hours = parseInt(document.getElementById(intervalHours).value);
    const minutes = parseInt(document.getElementById(intervalMinutes).value);
    const intervalTime = hours * 60 + minutes;

    const list = document.getElementById(depthList);
    const depthLevel = parseInt(list.options[list.selectedIndex].value);
    const time = parseInt(document.getElementById(diveTime).value);
    return [intervalTime, depthLevel, time];
}

document.getElementById("calculate").onclick = function() {
    let msg1 = formMessageDive1();
    let className = "alert-success";
    if(safetyStop1){
        className = "alert-warning";
    }
    const html = '<div class="alert ' + className + ' mt-3" role="alert">' +
                        msg1 +
                '</div>';
    addElement("infoDive", "div", "alertContainer1", html);

    let msg2 = formMessageDiveNum(2);
    if(safetyStop2){
        className = "alert-warning";
    }
    const html2 = '<div class="alert ' + className + ' mt-3" role="alert">' +
        msg2 +
        '</div>';
    addElement("infoDive", "div", "alertContainer2", html2);
};

function addElement(parentId, elementTag, elementId, html){
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute("id", elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
    return false;
}

const add1 = document.getElementById("add1");

add1.onclick = function(){
    addForm(2);
    return false;
};


