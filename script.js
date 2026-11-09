function getCookie(nombre) {

    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {

        const [clave, valor] = cookie.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

function crearBienvenida(nombreUsuario) {

    const contenedor = document.getElementById("contenedor-bienvenida");

    const titulo = document.createElement("h2");
    titulo.textContent = "Bienvenido de nuevo";

    const parrafo = document.createElement("p");
    parrafo.textContent = `Hola ${nombreUsuario}, tus preferencias han sido cargadas.`;

    contenedor.appendChild(titulo);
    contenedor.appendChild(parrafo);
}

document.addEventListener("DOMContentLoaded", () => {

    const nombreGuardado = getCookie("nombre");

    if (nombreGuardado) {
        crearBienvenida(nombreGuardado);
    }

});

const campoColor = document.getElementById("color-fondo");
const selectorTema = document.getElementById("tema");

campoColor.addEventListener("input", () => {

    document.body.style.backgroundColor = campoColor.value;

});

selectorTema.addEventListener("change", () => {

    if (selectorTema.value === "oscuro") {

        document.body.classList.remove("tema-claro");
        document.body.classList.add("tema-oscuro");

    } else {

        document.body.classList.remove("tema-oscuro");
        document.body.classList.add("tema-claro");

    }

});
