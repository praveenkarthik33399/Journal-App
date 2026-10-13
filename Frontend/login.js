
document.getElementById("loginForm")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const message = await response.text();
        alert(message);

        if (response.ok) {
            window.location.href = "post.html";
        }
    } catch (error) {
        alert("Server connection failed");
    }
});