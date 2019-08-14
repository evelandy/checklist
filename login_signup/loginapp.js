document.getElementById('loginUser').addEventListener('submit', loginUser);


function loginUser(e) {
    e.preventDefault();

    let username = document.getElementById("luser").value;
    let password = document.getElementById("lpass").value;

    let headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password))

    fetch('http://167.71.174.171/login', {
        method: 'POST',
        headers: headers
    })
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('x-access-token', data.token);
        if(data.token){
            window.location.href = "../userPages/dashboard.html";
        } else {
            window.location.href = "../login_signup/login.html";
        }
    })
    .catch((error) => console.log(error))
}
