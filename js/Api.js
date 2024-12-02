// Página inicial
let currentPage = 1; // Establece la página inicial para la carga de personajes

// Seleccionamos el elemento 'main' en el HTML donde se mostrarán los personajes
const main = document.querySelector("main");

// Creamos un botón para cargar más personajes
const loadMoreButton = document.createElement("button"); // Crea el elemento botón

// Función para obtener personajes desde la API
function getCharacters(page, done) {
    // Construye la URL para obtener personajes en función de la página actual
    const url = `https://rickandmortyapi.com/api/character?page=${page}`;
    
    // Realiza una solicitud HTTP con fetch para obtener los personajes
    fetch(url)
        .then(response => response.json()) // Convierte la respuesta en un objeto JSON
        .then(data => {
            done(data); // Llama a la función 'done' pasando los datos obtenidos
        })
        .catch(error => {
            // Si hay un error en la carga de los personajes, muestra un mensaje en consola y una alerta
            console.error("Error al cargar los datos:", error);
            alert("No se pudieron cargar más personajes.");
        });
}

// Función para renderizar personajes en la página
function renderCharacters(data) {
    // Itera sobre los personajes obtenidos de la API
    data.results.forEach(personaje => {
        // Crea un fragmento HTML con la información del personaje
        const article = document.createRange().createContextualFragment(/*html*/ `
            <article>
                <div class="image-container">
                    <img src="${personaje.image}" alt="Personaje"> <!-- Imagen del personaje -->
                </div>
                <h2>${personaje.name}</h2> <!-- Nombre del personaje -->
                <span>${personaje.status}</span> <!-- Estado del personaje (activo, muerto, etc.) -->
            </article>
        `);

        // Agrega el artículo (personaje) al contenedor 'main' en el HTML
        main.append(article);
    });
}

// Función para manejar la carga de más personajes
function loadMore() {
    currentPage++; // Incrementa el número de la página actual
    getCharacters(currentPage, renderCharacters); // Llama a 'getCharacters' con la nueva página
}

// Inicializa la página con la primera carga de personajes
getCharacters(currentPage, renderCharacters); // Llama a 'getCharacters' para cargar los personajes iniciales

// Configuración y estilos para el botón "Cargar más"
loadMoreButton.textContent = "Cargar más"; // Establece el texto del botón
loadMoreButton.style.display = "block"; // Hace que el botón se muestre como bloque
loadMoreButton.style.margin = "20px auto"; // Añade margen para centrar el botón
loadMoreButton.style.padding = "10px 20px"; // Añade relleno (padding) para hacer el botón más grande
loadMoreButton.style.backgroundColor = "#004ba0"; // Establece el color de fondo del botón
loadMoreButton.style.color = "#fff"; // Establece el color del texto del botón
loadMoreButton.style.border = "none"; // Quita el borde del botón
loadMoreButton.style.borderRadius = "5px"; // Redondea las esquinas del botón
loadMoreButton.style.cursor = "pointer"; // Cambia el cursor cuando el ratón pasa sobre el botón

// Agrega un "escuchador" de eventos al botón, para que cargue más personajes cuando se haga clic
loadMoreButton.addEventListener("click", loadMore);

// Añade el botón al final del documento, dentro del cuerpo (body)
document.body.appendChild(loadMoreButton);
