document.addEventListener("DOMContentLoaded", async () => {
    const process_params = new URLSearchParams(window.location.search);
    const genre = process_params.get("genre");
    const text = document.getElementById("genre");
    text.innerHTML = genre;
    text.classList.add("text-capitalize");

    const db = await fetch("musicas.json");
    if (db.ok) {
        const card_group = document.getElementsByClassName("card-group")[0];
        card_group.innerHTML='';

        const musics = await db.json();
        for (const music of musics.filter( m => m.genre == genre)){
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                window.location.href = `song.html?title=${encodeURIComponent(music.title)}`;
            });

            card.innerHTML =
            `<img src="${music.cover}" class="card-img-top" alt="capa">
            <div class="card-body">
            <h5 class="card-title">${music.title}<br>${music.band}</h5>
            <p>${music.description}<br>Duration: ${music.length}</p>
            </div>`;
            card_group.appendChild(card);
        }
    }
})