const tbl = document.getElementById('accounts');    // The table
const btn = document.getElementById('submit');      // The Submit button
let IDinc = 0;  // Incrementor for the ID

// Shows the ID number on the form
function showID() {
    document.getElementById('ID').value = IDinc+1;
}   showID();

// Create Account button click event
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
});

function appendValues() {
    // Creating the new row
    let newRow = tbl.insertRow(-1);
    newRow.setAttribute('id', ++IDinc);
    newRow.setAttribute('class', "border-y-2 border-gray-600 text-center");

    // Putting the values in an array for the loop
    let values = [
        IDinc,
        document.getElementById('username').value,
        document.getElementById('emailaddr').value,
        document.getElementById('role').value,
        null
    ];
    
    // Creating the new cells in the new row
    function createCell() {
        let newCell = newRow.insertCell(-1);
        newCell.setAttribute('class', "py-2 border-collapse overflow-hidden");
        return newCell;
    }

    for (let i = 0; i < 4; i++) {
        createCell().innerHTML = values[i];
    }

    let cell = createCell();
    cell.appendChild(createButton(newRow, "Edit"));
    cell.appendChild(createButton(newRow, "Delete"));

    showID();   
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Action Cell

// Creates buttone and puts it in the Action cell of a specified row
function createButton(row, type) {
    const btn = document.createElement('button');
    btn.textContent = type;

    // Button appearance
    let shape = "px-2 rounded-lg ";
    let slate = "bg-slate-400 hover:bg-slate-500 ";
    let green = "bg-green-400 hover:bg-green-500 ";
    let orang = "bg-orange-400 hover:bg-orange-500 ";
    
    // Different types of Buttons
    if (type == "Edit") {
        btn.setAttribute('class', slate + shape);
        btn.addEventListener('click', function() { editValues(row) });
    } else if (type == "Delete") {
        btn.setAttribute('class', slate + shape);
        btn.addEventListener('click', function() { deleteValues(row) });
    } else if (type == "Save") {
        btn.setAttribute('class', green + shape);
        btn.addEventListener('click', function() { saveEdit(row) });
    } else if (type == "Cancel") {
        // Saving row data
        let oldData = [
            row.children[1].innerHTML,    // Name
            row.children[2].innerHTML,    // Email
            row.children[3].innerHTML     // Role
        ];
        btn.setAttribute('class', orang + shape);
        btn.addEventListener('click', function() { cancelEdit(row, oldData) });
    }
    return btn;
}

function changeMode(row, mode) {
    let action = row.lastChild;
    function setEditable(toggle) {
        row.children[1].setAttribute("contenteditable", toggle);
        row.children[2].setAttribute("contenteditable", toggle);
    }

    function removeButtons() {
        action.removeChild(action.firstChild);
        action.removeChild(action.firstChild);
    }

    if (mode == "edit") {
        setEditable("true");
        removeButtons();
        action.appendChild(createButton(row, "Save"));
        action.appendChild(createButton(row, "Cancel"));
    } else if (mode == "normal") {
        setEditable("false");
        removeButtons();
        action.appendChild(createButton(row, "Edit"));
        action.appendChild(createButton(row, "Delete"));
    }
}

function saveEdit(row) {
    changeMode(row, "normal");
}

function cancelEdit(row, old) {
    for (let i = 0; i < 3; i++) {
        row.children[i+1].innerHTML = old[i];
    }
    changeMode(row, "normal");
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function editValues(row) {
    changeMode(row, "edit");
}

function deleteValues(row) {
    row.parentNode.removeChild(row);
}

// Automatically adds many accounts (for debugging purposes)
function autoAddAccounts(nums) {
    document.getElementById('username').value = "Juan Dela Cruz";
    document.getElementById('emailaddr').value = "jdillacross@hotmail.com";
    document.getElementById('role').value = "User";
    for (let i = 0; i < nums; i++) {
        appendValues();
    }
}
