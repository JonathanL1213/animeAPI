const API_URL = "https://api.jikan.moe/v4/anime?q=";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const animeContainer = document.getElementById("animeContainer");

// Función para manejar la búsqueda
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query === "") {
        alert("Por favor, escribe el nombre de un anime.");
        return;
    }

    fetchAnimes(query);
});

// Función para realizar la consulta a la API
async function fetchAnimes(query) {
    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();
        if (data.data.length === 0) {
            animeContainer.innerHTML = "<p>No se encontraron resultados.</p>";
        } else {
            renderAnimes(data.data);
        }
    } catch (error) {
        console.error("Error al buscar animes:", error);
        animeContainer.innerHTML = "<p>Error al buscar animes. Intenta nuevamente más tarde.</p>";
    }
}

// Función para renderizar los resultados
function renderAnimes(animes) {
    animeContainer.innerHTML = "";

    animes.forEach((anime) => {
        const card = document.createElement("div");
        card.className = "anime-card";

        card.innerHTML = `
            <h3>${anime.title}</h3>
            <p><strong>Episodios:</strong> ${anime.episodes || "Desconocido"}</p>
            <a href="${anime.url}" target="_blank">Más información</a>
        `;

        animeContainer.appendChild(card);
    });
}