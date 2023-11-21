async function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if (email.value === "" || password.value === "") {
        // TODO: #004
        return;
    } else {
        const request = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "sophie.bluel@test.tld",
                "password": "S0phie"
            })
        });
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000 * 3600 * 2;
        now.setTime(expireTime);
        document.cookie="token=" + (await request.json())["token"] + ";expires=" + now.toUTCString() +";path=/";
    }
    location.href = "../index.html";
    sessionStorage.setItem("logged", "1");
}
