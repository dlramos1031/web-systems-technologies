const tbl = document.getElementById('accounts');    // The table
const btn = document.getElementById('submit');      // The Submit button
let IDinc = 0;  // Incrementor for the ID

// Shows the ID number on the form
function showID() {
    document.getElementById('ID').value = IDinc+1;
}   showID();

// Creates either edit or delete button in the Action cell
function createButton(row, type) {
    const btn = document.createElement('button');
    if (type == "Edit") {
        btn.setAttribute('class', "bg-slate-400 hover:bg-slate-500 px-2 rounded-lg");
        btn.textContent = "Edit";
        btn.addEventListener('click', function() { editValues(row.getAttribute("id")) });
    } else if (type == "Delete") {
        btn.setAttribute('class', "bg-slate-400 hover:bg-slate-500 px-2 mx-2 rounded-lg");
        btn.textContent = "Delete";
        btn.addEventListener('click', function() { deleteValues(row.getAttribute("id")) });
    }   return btn;
}

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

function editValues(id) {
    row = document.getElementById(id);

    function changeButton(text) {
        let btn = row.lastChild; // The Action cell

        function saveValues() {
            let newData = [row.children[1].innerText, row.children[2], row.children[3]];
            console.log(newData);
        }

        if (text == "Save") {
            
        } else {

        }
    }

    changeButton("Save");
    row.children[1].setAttribute("contenteditable", "true");
}

function deleteValues(id) {
    row = document.getElementById(id);
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
