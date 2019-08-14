document.getElementById('completeTodo').addEventListener('submit', completeTodo);
document.getElementById('removeTodo').addEventListener('submit', removeTodo);
document.getElementById('addTodo').addEventListener('submit', addTodo);
document.getElementById('editTodo').addEventListener('submit', editTodo);

let d = new Date();
let n = d.toDateString();
document.getElementById('dash-date').innerHTML = n;


function loader() {
    let token = localStorage.getItem('x-access-token');
    if(!token){
        window.location.href = "../login_signup/login.html"; 
    } else {
        let userInfo = JSON.parse(atob(token.split('.')[1]));
        let expireTime = userInfo.exp;
        let timeNow = Math.floor((new Date()).getTime() / 1000);
        let timeUp = expireTime - timeNow;
        if(timeUp <= 0){
            window.location.href = "../login_signup/login.html";
        } else {
            getTodo();
        }
    } 
}

function logout() {
    localStorage.removeItem('x-access-token');
    window.location = "../index.html";
}

function addTodo(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    let token = localStorage.getItem('x-access-token');

    fetch('http://167.71.174.171/api/todo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        },
        body:JSON.stringify({title:title, body:body})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err))
}

function getTodo() {
    let token = localStorage.getItem('x-access-token');
    fetch('http://167.71.174.171/api/todo', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        }
    })
    .then((res) => res.json())
    .then((data) => {
        todoID = data[0].id;
        let toutput = ''
        let tododata = data.length;
        for(let i = 0; i < tododata; i ++) {

            if(data[i].complete !== false) {
                logic = 'Re-Open';
            } else {
                logic = 'Complete';
            }

            if(logic !== 'Re-Open') {
                toutput += `
                    <div class="card border-info mb-3 todo-card-main">
                        <h3 class="card-header todo-input-title">${data[i].title}</h3>
                        <div class="card-body">
                            <p class="card-text todo-input-body">${data[i].body}</p>
                        </div>
                        <div class='todo-input-btn'>
                            <input class='btn-secondary btn' type='button' value='Delete' onClick={removeTodo(${data[i].id})}>
                            <input class='btn-danger btn' type='button' value='${logic}' onClick={completeTodo(${data[i].id})}>
                            
                        </div>
                    </div>
            `;} else {
                toutput += `
                    <div class="card border-danger mb-3 todo-card-main">
                        <h3 class="card-header todo-input-title t-i">${data[i].title.strike()}</h3>
                        <div class="card-body">
                            <p class="card-text todo-input-body t-i">${data[i].body.strike()}</p>
                        </div>
                        <div class='todo-input-btn'>
                            <input class='btn-secondary btn' type='button' value='Delete' onClick={removeTodo(${data[i].id})}>
                            <input class='btn-success btn' type='button' value='${logic}' onClick={completeTodo(${data[i].id})}>

                        </div>
                    </div>
            `;}
            document.getElementById('toutput').innerHTML = toutput;
        }
    })
    .catch((err) => console.log(err))
}
function removeTodo(id) {
    let token = localStorage.getItem('x-access-token');

    fetch('http://167.71.174.171/api/todo/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err))
}

function completeTodo(id) {

    let token = localStorage.getItem('x-access-token');

    fetch('http://167.71.174.171/api/todo/complete/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        getTodo();
    })
    .catch((err) => console.log(err))
}

function editTodo(e) {
    e.preventDefault();

    // let tid = document.getElementById('tid').value;
    let tid = todoID;
    let ttitle = document.getElementById('ttitle').value;
    let tbody = document.getElementById('tbody').value;

    let token = localStorage.getItem('x-access-token');

    fetch(`http://167.71.174.171/api/todo/edit/${tid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        },
        body: JSON.stringify({title:ttitle, body:tbody, id:tid})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err))
}
