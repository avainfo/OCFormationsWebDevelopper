async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        showDialog();
    } else {
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, // sophie.bluel@test.tld
                    password // S0phie
                })
            });
            if (response.ok) {
                const {token} = await response.json();
                setCookie(token, 2);
                location.href = "../index.html";
            } else {
                showDialog();
            }
        } catch (error) {
            console.error("Error during login:", error);
            showDialog();
        }
    }
}

function showDialog() {
    const anim = [
        { opacity: "0" },
        { opacity: "1" },
    ];

    const animTiming = {
        duration: 150,
        iterations: 1,
        fill: "forwards"
    };

    document.getElementsByTagName("dialog")[0].style.display = "flex";
    document.getElementsByTagName("dialog")[0].animate(anim, animTiming);
}

function setCookie(value, hours) {
    const now = new Date();
    const expireTime = now.getTime() + hours * 60 * 60 * 1000;
    now.setTime(expireTime);
    document.cookie = `token=${value};expires=${now.toUTCString()};path=/`;
}
