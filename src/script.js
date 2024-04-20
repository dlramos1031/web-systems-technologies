const tbl = document.getElementById('accounts');
const btn = document.getElementById('submit');
let IDinc = 0;

btn.addEventListener('click', function() {
    let name = document.forms['accform']['username'].value;
    let email = document.forms['accform']['emailaddr'].value;
    let role = document.forms['accform']['role'].value;

    // Checking if fields are empty
    if (name == "" || email == "") {
        alert("Please enter both your Name and Email Address.");
        return false;
    }

    // Creating the new row
    let newRow = tbl.insertRow(-1);
    newRow.setAttribute('id', ++IDinc);
    
    // Creating the new cells in the new row
    for (let i = 0; i < 5; i++) {
        let newCell = newRow.insertCell(-1);
        newCell.setAttribute('class', 'p-2 border-collapse border-2 border-solid border-black overflow-hidden');
    }

    appendValues(-1, [IDinc, name, email, role]);
});

function appendValues(index, values) {
    for (let i = 0; i < 4; i++) {
        tbl.rows[index].cells.item(i).innerHTML = values[i];
    }
}