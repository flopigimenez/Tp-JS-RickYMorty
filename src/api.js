async function mostrarPersonajes() {
    let buscar = document.getElementById("input-search").value.trim().toLowerCase();
    let container = document.getElementById("characters-container");
    container.innerHTML = ""; 

    let todosLosPersonajes = []; 

    try {
        let url = `https://rickandmortyapi.com/api/character`;
        
        while (url) {
            let response = await fetch(url);
            let data = await response.json();

            if (data.results) {
                todosLosPersonajes = todosLosPersonajes.concat(data.results);
                url = data.info.next; 
            } else {
                break;
            }
        }

        let filtrarDatos = buscar
            ? todosLosPersonajes.filter(element =>
                element.name.toLowerCase().includes(buscar)
            )
            : todosLosPersonajes;

        if (filtrarDatos.length === 0) {
            container.innerHTML = "<p>No se encontraron personajes con ese nombre.</p>";
            return;
        }
        
        filtrarDatos.forEach(personaje => {
            let personajeDiv = document.createElement("div");
            personajeDiv.classList.add("character");
            personajeDiv.innerHTML = `
                <h2>${personaje.name}</h2>
                <img src="${personaje.image}" alt="${personaje.name}">
                <p>Especie: ${personaje.species}</p>
            `;
            container.appendChild(personajeDiv);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        let container = document.getElementById("characters-container");
        container.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

document.getElementById("input-search").addEventListener("input", mostrarPersonajes);

document.addEventListener("DOMContentLoaded", mostrarPersonajes);