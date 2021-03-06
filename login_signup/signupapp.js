document.getElementById('addUser').addEventListener('submit', addUser);


function addUser(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // put token in like this
    let token = localStorage.getItem('x-access-token');

    fetch('http://167.71.174.171/api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',

            // add this to pass token 
            'x-access-token': token,
            withCredentials: true
        },
        body:JSON.stringify({username:username, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.location = "../login_signup/login.html";
    })
    .catch((err) => console.log(err))
}
