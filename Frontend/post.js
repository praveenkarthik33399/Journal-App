
document.getElementById("postForm")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description =
        document.getElementById("description").value;

    try {
        const response = await fetch("http://localhost:3000/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description })
        });

        const message = await response.text();
        alert(message);

        if (response.ok) {
            window.location.href = "journal.html";
        }
    } catch (error) {
        alert("Server connection failed");
    }
});