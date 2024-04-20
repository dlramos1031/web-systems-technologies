const tbl = document.getElementById('accounts');    // The table
const btn = document.getElementById('submit');      // The Submit button
let IDinc = 1;  // Incrementor for the ID

// Shows the ID number on the form
function showID() {
    document.getElementById('ID').value = IDinc+1;
}   showID();

btn.addEventListener('click', function(event) {
    // Checking if fields are empty
    if (document.getElementById('username').value == "" || 
        document.getElementById('emailaddr').value == "") {
        alert("Please enter both your Name and Email Address.");
    } else {
        appendValues();
    }

    // Prevents the site to reload when submitting (NECESSARY)
    // Before this, I didn't know what to do because everytime
    // I submit, the site reloads and the table clears. This
    // is also the same reason why I put 'click' instead of
    // 'submit' in the addEventListener() argument.
    event.preventDefault();

    showID();
});

function appendValues() {
    // Creating the new row
    let newRow = tbl.insertRow(-1);
    newRow.setAttribute('id', ++IDinc);

    // Putting the values in an array for the loop
    let values = [
        IDinc,
        document.getElementById('username').value,
        document.getElementById('emailaddr').value,
        document.getElementById('role').value
    ];
    
    // Creating the new cells in the new row
    for (let i = 0; i < 4; i++) {
        let newCell = newRow.insertCell(-1);
        newCell.setAttribute('class', 'p-2 border-collapse border-2 border-solid border-black overflow-hidden');
        newCell.innerHTML = values[i];
    }
}

function editValues(id) {

}