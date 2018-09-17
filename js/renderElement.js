//TODO Redo this using React.js: Good demo for why React is so useful though!

var diveCount = 1; //The only global variable, different way?
addEvent(1);

function addForm(formNumber){
    let html =
        '<div class="card">' +
         '<div class="card-header">' +
               '<h4 class="my-0 font-weight-normal">Dive ' + formNumber + '</h4>' +
             '</div>' +
               '<div class="card-body">' +
                 '<form id="form' + formNumber + '">' +
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
        '">Add next Dive</button>' +
        '<button id="remove' + formNumber + '" class="mt-auto btn btn-outline-danger addForm " type="button">Remove Dive</button>' +
        '</form>' +
        '</div>' +
        '</div>' ;
    addElement("diveContainer" + formNumber, "div", "dive" + formNumber, html);
    addEvent(formNumber);
    removeEvent(formNumber);
    window.scrollTo(0,document.body.scrollHeight);
    diveCount++;
}


function addEvent(i){
    const add = document.getElementById("add" + i);
    add.onclick = function(){
        addForm(i + 1);
        add.onclick = null;
    };
}

function removeEvent(i){
    let removeName = "remove" + i;
    let remove = document.getElementById(removeName);

    remove.onclick = function() {
        let j = i;
        while (j <= diveCount){
            removeElement("dive" + j);
            j++;
        }
        diveCount = i - 1;
        addEvent(diveCount);

    };
}






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
    window.scrollTo(0, document.body.scrollHeight);

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

function removeElement(elementId) {
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

document.getElementById("calculate").addEventListener("click", function() {
    const infoDive = document.getElementById("infoDive");
    while (infoDive.firstChild) {
        infoDive.removeChild(infoDive.firstChild);
    }

    let group = null;

    for (let i = 1; i <= diveCount; i++){


        try {
            group = renderAlert(i, group);
        } catch (e) {

        } finally {
            window.scrollTo(0, document.body.scrollHeight);
        }
        //Try-finally needed in case that there are more than one dive
            // and the previous group is null/no info entered in one of the dives. But doesn't scroll still. Why???

    }

    window.scrollTo(0, document.body.scrollHeight); //Scrolls to dive info straight away
});

document.getElementById("resetAll").onclick = function() {
    window.location.reload();
};



