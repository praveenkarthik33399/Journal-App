
async function loadJournal() {
    const journalEntries = document.getElementById("journalEntries");

    try {
        const response = await fetch("http://localhost:3000/entries");

        if (!response.ok) {
            throw new Error("Failed to load entries");
        }

        const entries = await response.json();

        journalEntries.innerHTML = "";

        if (entries.length === 0) {
            journalEntries.textContent = "No journal entries yet.";
            return;
        }

        entries.forEach(entry => {
            const card = document.createElement("div");
            card.className = "journal-card";

            const title = document.createElement("h2");
            title.textContent = entry.title;

            const description = document.createElement("p");
            description.textContent = entry.description;

            const date = document.createElement("small");
            date.textContent = entry.createdAt
                ? new Date(entry.createdAt).toLocaleDateString()
                : "";

            card.append(title, description, date);
            journalEntries.appendChild(card);
        });

    } catch (error) {
        journalEntries.textContent = "Unable to load journal entries.";
        console.error(error);
    }
}

loadJournal();