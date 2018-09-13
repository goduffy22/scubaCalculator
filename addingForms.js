//TODO Redo this using React.js: Good demo for why React is so useful though!

function addForm(formNumber){
    let html = '' +
'<div class="input-group mb-3">' +
        '<select class="custom-select">' +
            '<option value="0" selected>Choose...</option>' +
            '<option value="0">0</option>' +
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
        '<input type="number" min="0" max="59">' +
        '<div class="input-group-append">' +
            '<label class="input-group-text">Minute(s)</label>' +
        '</div>' +
'</div> ' +
        '<div class="input-group mb-3"> ' +
            '<select class="custom-select">' +
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
            '<input type="number" class="input-group-text">' +
        '</div>' +
        '<button type="button" class="btn btn-outline-dark" id="' +
                'add' + formNumber +
        '">Add next Dive</button> ' ;
    addElement("form" + formNumber, "div", "dive" + formNumber, html);

    //Add button to add the next form
    let btnName = "add" + formNumber;
    let add = document.getElementById(btnName);

    // add.onclick = function(){
    //     addForm(formNumber + 1);
    //   return false;
    //};

    //At this point it's time try with react.js

    add.addEventListener("click", function(){
        addForm(formNumber + 1);
    },
        true); //3rd dive added but then refreshes straight away (tried bubbling and trickling

}

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


