const getId = id => document.getElementById(id);
const getSel = sel => document.querySelector(sel);
const form = document.forms['form1'];
const add = form.add;
const edit = form.edit;
const login = form.login;
const password = form.password;
const email = form.email;
let idCurrentUser;
let users = [];

function User(idPar, logPar, pasPar, emailPar) {
    this.id = idPar;
    this.login = logPar;
    this.password = pasPar;
    this.email = emailPar;
}
add.onclick = function () {
    let newUser = new User(id = 0, login.value, password.value, email.value);
    users.push(newUser);
    form.reset();
    render();
}

function editOne() {
    getSel('.add').style.display = 'none';
    getSel('.edit').style.display = 'block';
    let currentId = event.target.parentNode.parentNode.firstChild.firstChild.textContent;
    users.forEach(element => {
        if (element.id == currentId) {
            idCurrentUser = element.id;
            login.value = element.login;
            password.value = element.password;
            email.value = element.email;
        }
    })
}
edit.onclick = function () {
    getSel('.add').style.display = 'block';
    this.style.display = 'none';
    let newUser = new User(id = idCurrentUser, login.value, password.value, email.value);
    users.forEach(element => {
        if (element.id === newUser.id) {
            element.login = newUser.login;
            element.password = newUser.password;
            element.email = newUser.email;
        }
    })
    form.reset()
    render();
}

function deleteOne() {
    let currentId = event.target.parentNode.parentNode.firstChild.firstChild.textContent;
    users.forEach(element => {
        if (element.id == currentId) {
            users.splice(element.id - 1, 1);
        }
    })
    render();
}


function render() {
    getId('tBody').innerHTML = '';
    let id = 0;
    for (const user of users) {
        let tr = document.createElement('tr');
        user.id = ++id;
        for (const key in user) {
            let td = document.createElement('td');
            td.innerHTML = user[key];
            tr.append(td);
        }
        let tdEdit = document.createElement('td');
        tdEdit.innerHTML = `<button onclick ="editOne()" class ="btn btn-warning">Edit</button>`;
        let tdDelete = document.createElement('td');
        tdDelete.innerHTML = `<button onclick ="deleteOne()" class ="btn btn-danger">Delete</button>`;
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);
        getId('tBody').innerHTML += tr.innerHTML;

    }
}