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

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    
    const titulo = document.createElement("h2");
    titulo.textContent = "Bienvenido de nuevo";

    const parrafo = document.createElement("p");
    parrafo.textContent = `Hola ${nombreUsuario}, tus preferencias han sido cargadas.`;

    contenedor.appendChild(titulo);
    contenedor.appendChild(parrafo);
}

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");
    const campoNombre = document.getElementById("nombre");
    const campoColor = document.getElementById("color-fondo");
    const selectorTema = document.getElementById("tema");
    const botonResetear = document.getElementById("resetear");

    const nombreGuardado = getCookie("nombre");
    const colorGuardado = getCookie("color");
    const temaGuardado = getCookie("tema");

    if (nombreGuardado) {

        campoNombre.value = nombreGuardado;

        crearBienvenida(nombreGuardado);
    }

    if (colorGuardado) {

        campoColor.value = colorGuardado;

        document.body.style.backgroundColor = colorGuardado;
    }

    if (temaGuardado) {

        selectorTema.value = temaGuardado;

        if (temaGuardado === "oscuro") {

            document.body.classList.remove("tema-claro");
            document.body.classList.add("tema-oscuro");

        } else {

            document.body.classList.remove("tema-oscuro");
            document.body.classList.add("tema-claro");

        }

    }

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

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        guardarCookie("nombre", campoNombre.value);

        guardarCookie("color", campoColor.value);

        document.cookie = `tema=${selectorTema.value}; path=/`;

        crearBienvenida(campoNombre.value);

    });

    botonResetear.addEventListener("click", () => {

        borrarCookie("nombre");
        borrarCookie("color");
        borrarCookie("tema");

        campoNombre.value = "";
        campoColor.value = "#000000";
        selectorTema.value = "claro";

        document.body.style.backgroundColor = "";

        document.body.classList.remove("tema-claro");
        document.body.classList.remove("tema-oscuro");

        const contenedor =
            document.getElementById("contenedor-bienvenida");

        const titulo = contenedor.querySelector("h2");
        const parrafo = contenedor.querySelector("p");

        if (titulo) {
            titulo.remove();
        }

        if (parrafo) {
            parrafo.remove();
        }
    });


});




function guardarCookie(nombre, valor) {

    const fecha = new Date();

    fecha.setDate(fecha.getDate() + 7);

    document.cookie =
        `${nombre}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`;
}

function borrarCookie(nombre) {

    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}



