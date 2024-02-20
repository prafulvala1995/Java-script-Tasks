let users = [];
let editIndex = "";

window.onload = function() {
    if (localStorage.getItem('userData')) {
        users = JSON.parse(localStorage.getItem('userData'));
        displayUsers();
    }
};

function addData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const age = document.getElementById('age').value;
    const language = document.getElementById('language').value;

    const genderElements = document.getElementsByName('gender');
    gender = "";
    genderElements.forEach(element => {
        if (element.checked) {
            gender = element.value;
            element.checked = false;
        }
    });

    const hobbyElements = document.getElementsByName('hobby');
    const hobby = [];
     hobbyElements.forEach(element => { 
        if (element.checked) {
            hobby.push(element.value);
            element.checked = false;
        }
    }); 


    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const numberError = document.getElementById('numberError');
    const ageError = document.getElementById('ageError');
    const genderError = document.getElementById('genderError');
    const languageError = document.getElementById('languageError');
    const hobbyError = document.getElementById('hobbyError');
    

    nameError.innerHTML = '';
    emailError.innerHTML = '';
    numberError.innerHTML = '';
    ageError.innerHTML = '';
    genderError.innerHTML = '';
    languageError.innerHTML = '';
    hobbyError.innerHTML = '';

    let hasEmptyFields = false; 

    if (name.trim() === ""){
        nameError.innerHTML =  'Please enter a name';
        hasEmptyFields = true;
    }else {
        nameError.innerHTML = '';
    }

    if (email.trim() === ""){
        emailError.innerHTML =  'Please enter email';
        hasEmptyFields = true;
    }else {
        emailError.innerHTML = '';
    }

    if (number.trim() === ""){
        numberError.innerHTML =  'Please enter a number';                                                                  
        hasEmptyFields = true;  
    }else {
        numberError.innerHTML = '';
    }

    if (age.trim() === ""){
        ageError.innerHTML =  'Please enter age';
        hasEmptyFields = true;
    }else {
        ageError.innerHTML = '';
    }

    if (gender === ""){
        genderError.innerHTML =  'Please Select a Gender';
        hasEmptyFields = true;
    }else {
        genderError.innerHTML = '';
    }

    if (language.trim() === ""){
        languageError.innerHTML =  'Please Select a Language';
        hasEmptyFields = true;
    }else {
        languageError.innerHTML = '';
    }

    if (hobby.length === 0){
        hobbyError.innerHTML =  'Please Select a Hobby';
        hasEmptyFields = true;
    }else {
        hobbyError.innerHTML = '';
    }

    if (hasEmptyFields) {
        return; 
    }
    
    if (editIndex === ""){
        const user = { name , email , number, age , gender , language , hobby};
        users.push(user);
    }else {
        users[editIndex] = { name , email , number, age , gender , language , hobby};
        editIndex = "";
    }
    
    displayUsers();
    clearForm();
    localStorage.setItem('userData', JSON.stringify(users));
}

function displayUsers(){
    const userList = document.getElementById('userList');
    userList.innerHTML = "";

    users.forEach((user, index) => {
       let tr = document.createElement('tr');
       tr.innerHTML = `
        <td> <input type="checkbox" class="" onclick="checkall(${index})" ></input> </td>
        <td> ${user.name} </td>
        <td> ${user.email} </td>
        <td> ${user.number} </td>
        <td> ${user.age} </td>
        <td> ${user.gender} </td>
        <td> ${user.language} </td>
        <td> ${user.hobby} </td>
        <td><button type="button" class="btn btn-warning" onclick="editData(${index})"> Edit </button>
            <button type="button" class="btn btn-danger" onclick="deleteData(${index})"> Delete </button> </td>
       `;
       userList.appendChild(tr);
    });
}

function clearForm(){
    document.getElementById('name').value = "" ;
    document.getElementById('email').value = "" ;
    document.getElementById('number').value = "" ;
    document.getElementById('age').value = "" ;
    document.getElementById('language').value = "" ;
    // document.getElement('gender').value = "" ;
}

function editData (index){
    editIndex = index;
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('number').value = user.number;
    document.getElementById('age').value = user.age;
    document.getElementById('language').value = user.language;

    genderElements = document.getElementsByName('gender');
    genderElements.forEach(element => {
        if (element.value === user.gender) {
            element.checked = true;            
        }
    });

    hobbyElements = document.getElementsByName('hobby');
    hobbyElements.forEach(element => {
        if (user.hobby.includes(element.value)) {
            element.checked = true;            
        }
    });
}

function deleteData (index){
    users.splice(index, 1);
    displayUsers();
    localStorage.setItem('userData', JSON.stringify(users));

}

// filer Data ---------------------

function filterTable() {
    const search = document.getElementById('search').value.toLowerCase();
    const filterData = users.filter(user => {
        return(
            user.name.toLowerCase().includes(search)
        );
    });
    displayFilter(filterData);
}

function displayFilter(filterData) {
    const userList = document.getElementById('userList');
    userList.innerHTML = "";

    filterData.forEach((user, index) => {
       let tr = document.createElement('tr');
       tr.innerHTML = `
        <td> <input type="checkbox" class="" onclick="checkall(${index})" ></input> </td>
        <td> ${user.name} </td>
        <td> ${user.email} </td>
        <td> ${user.number} </td>
        <td> ${user.age} </td>
        <td> ${user.gender} </td>
        <td> ${user.language} </td>
        <td> ${user.hobby} </td>
        <td><button type="button" class="btn btn-warning" onclick="editData(${index})"> Edit </button>
            <button type="button" class="btn btn-danger" onclick="deleteData(${index})"> Delete </button> </td>
       `;
       userList.appendChild(tr);
    });

}


//  Delete All Data ----------------------

function selectAll (checkbox) {
    const checkboxes = document.getElementById('userList').getElementsByTagName('input');
    for (let i=0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === 'checkbox'){
            checkboxes[i].checked = checkbox.checked;
        }
    }
}

function deleteSelected () {
    // const table = document.getElementById('userList');
    const rows = document.getElementsByTagName('tr');
    const selectedIndexes = [];

    for (let i = 0; i < rows.length; i++) {
        const checkbox = rows[i].getElementsByTagName('input')[0];
        if (checkbox.checked) {
            selectedIndexes.push(i - 1);
        }
    }

    selectedIndexes.sort((a,b) => (b - a));
    selectedIndexes.forEach(index => {
        users.splice(index, 1);
    });
    displayUsers();
    localStorage.setItem('userData', JSON.stringify(users));
}   


