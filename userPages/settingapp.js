document.getElementById('removeUser').addEventListener('submit', removeUser);
document.getElementById('editUser').addEventListener('submit', editUser);
document.getElementById('editPassword').addEventListener('submit', editPassword);


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
            getUser();
        }
    } 
}

function logout() {
    localStorage.removeItem('x-access-token');
    window.location = "../index.html";
}

function getUser() {
    let token = localStorage.getItem('x-access-token');
    let userInfo = JSON.parse(atob(token.split('.')[1]));
    let id = userInfo.id;

    fetch('http://167.71.174.171/api/user/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        }
    })
    .then((res) => res.json())
    .then((data) => {
        curUserArrayID = data[0].id;
        let output = `<h1 class='user-info-title'>Welcome back <div class='user-info-title-name'>${data[0].username}!</div></h1>`
        output += `
            <div class='user-info'>
                <div class='user-info-created'>
                <h3 class='user-info-head'>Member Since:</h3>
                <h3>${data[0].created.slice(0, 10)}</h3>
                </div>
                <div class='user-info-username'>
                <h3 class='user-info-head'>Username:</h3>
                <h3>${data[0].username}</h3>
                </div>
                <div class='user-info-id'>
                <h3 class='user-info-head'>ID:</h3>
                <h3>${data[0].id}</h3>
                </div>
            </div>
        `
        document.getElementById('output').innerHTML = output;
    })
    .catch((error) => console.log(error))
}

function removeUser() {
    let token = localStorage.getItem('x-access-token');
        let userInfo = JSON.parse(atob(token.split('.')[1]));
        let id = userInfo.id;
        logout();
        
        fetch('http://167.71.174.171/api/user/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
}

function editUser(e) {
    e.preventDefault();

    // let eid = document.getElementById('eid').value;
    let ename = document.getElementById('ename').value;

    let token = localStorage.getItem('x-access-token');

    fetch(`http://167.71.174.171/api/user/${curUserArrayID}/` + ename, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        },
        body: JSON.stringify({username:ename, id:curUserArrayID})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err))
}

function editPassword(e) {
    e.preventDefault();

    // let pid = document.getElementById('pid').value;
    let ppass = document.getElementById('ppass').value;

    let token = localStorage.getItem('x-access-token');

    fetch(`http://167.71.174.171/api/user/pass/${curUserArrayID}/` + ppass, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            withCredentials: true
        },
        body: JSON.stringify({password:ppass, id:curUserArrayID})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err))
}

