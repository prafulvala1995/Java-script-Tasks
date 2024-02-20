let users = [];
let editIndex = "";

function addData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    if (name && email && age && address) {
        if (editIndex === "") {
            const user = { name, email, age ,address };
            users.push(user);
        } else {
            users[editIndex] = { name, email, age , address };
            editIndex = "";
        }
        displayUsers();
        clearForm();
    }else if (name == ""){
        alert("Please enter Name");
    }else if (email == ""){
        alert("Please enter Email");
    }else if (age == ""){
        alert("Please enter age");
    }else{
        alert("Please enter Address");
    }
}   

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.address}</td>
        <td>
            <button class="btn btn-warning" onclick="editData(${index})">Edit</button>
            <button class="btn btn-danger" onclick="deleteData(${index})">Delete</button>
        </td>
        `;
    userList.appendChild(tr); 
    });
}

function editData(index) {
        editIndex = index;
        const user = users[index];
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('age').value = user.age;
        document.getElementById('address').value = user.address;
}

function deleteData(index) {
    users.splice(index, 1);
    displayUsers();
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
}
// console.log(displayUser);
displayUsers();

