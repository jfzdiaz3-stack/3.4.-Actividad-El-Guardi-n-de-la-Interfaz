/**
 * Obtiene el valor de una cookie por su nombre.
 * @param {string} nombre - El nombre de la cookie.
 * @returns {string|null} - El valor de la cookie o null si no se encuentra.
 * */

function getCookie(nombre) {

    // Separar  todas las cookies en un array
    const cookies = document.cookie.split("; ");

    //Recorre cada cookie
    for (let cookie of cookies) {

        const [clave, valor] = cookie.split("=");

        //Comprobar si la cookie coincide con el nombre buscado
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

/**
 * Genera dinámicamente un mensaje de bienvenida.
 * @param {string} nombreUsuario - El nombre del usuario para personalizar el mensaje.
 */

function crearBienvenida(nombreUsuario) {

    // Obtener el contenedor de bienvenida
    const contenedor = document.getElementById("contenedor-bienvenida");

    // Limpiar el contenedor antes de añadir nuevos elementos
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    // Crear elementos de bienvenida
    const titulo = document.createElement("h2");
    titulo.textContent = "Bienvenido de nuevo";

    const parrafo = document.createElement("p");
    parrafo.textContent = `Hola ${nombreUsuario}, tus preferencias han sido cargadas.`;

    //Añadir los elementos al contenedor
    contenedor.appendChild(titulo);
    contenedor.appendChild(parrafo);
}

// Esperar a que el DOM esté completamente cargado 
document.addEventListener("DOMContentLoaded", () => {

    //Obtener los elementos del formulario
    const formulario = document.getElementById("formulario");
    const campoNombre = document.getElementById("nombre");
    const campoColor = document.getElementById("color-fondo");
    const selectorTema = document.getElementById("tema");
    const botonResetear = document.getElementById("resetear");

    //Recuperar las cookies guardadas
    const nombreGuardado = getCookie("nombre");
    const colorGuardado = getCookie("color");
    const temaGuardado = getCookie("tema");

    // Restaurar el nombre guardado
    if (nombreGuardado) {

        campoNombre.value = nombreGuardado;

        //Mostrar mensaje de bienvenida
        crearBienvenida(nombreGuardado);
    }

    //Restaurar el color guardado
    if (colorGuardado) {

        campoColor.value = colorGuardado;

        document.body.style.backgroundColor = colorGuardado;
    }

    //Restaurar el tema guardado
    if (temaGuardado) {

        selectorTema.value = temaGuardado;

        //Aplicar tema oscuro
        if (temaGuardado === "oscuro") {

            document.body.classList.remove("tema-claro");
            document.body.classList.add("tema-oscuro");

        } else {

            //Aplicar tema claro
            document.body.classList.remove("tema-oscuro");
            document.body.classList.add("tema-claro");

        }

    }

    //Cambiar el color de fondo en tiempo real
    campoColor.addEventListener("input", () => {

        document.body.style.backgroundColor = campoColor.value;

    });

    //Cambiar entre tema claro y oscuro 
    selectorTema.addEventListener("change", () => {

        if (selectorTema.value === "oscuro") {

            document.body.classList.remove("tema-claro");
            document.body.classList.add("tema-oscuro");

        } else {

            document.body.classList.remove("tema-oscuro");
            document.body.classList.add("tema-claro");

        }

    });

    // Guardar preferencias al enviar el formulario
    formulario.addEventListener("submit", (evento) => {

        //Evitar que la página se recargue
        evento.preventDefault();

        //Guardar nombre y color en cookies de 7 días
        guardarCookie("nombre", campoNombre.value);
        guardarCookie("color", campoColor.value);

        //Guardar tema como cookie de sesión
        document.cookie = `tema=${selectorTema.value}; path=/`;

        //Mostrar bienvenida al guardar
        crearBienvenida(campoNombre.value);

    });

    //Restablecer completamente la interfaz
    botonResetear.addEventListener("click", () => {

        //Eliminar las cookies
        borrarCookie("nombre");
        borrarCookie("color");
        borrarCookie("tema");

        //Restablecer los valores del formulario
        campoNombre.value = "";
        campoColor.value = "#000000";
        selectorTema.value = "claro";

        //Restablecer el color de fondo y el tema
        document.body.style.backgroundColor = "";

        document.body.classList.remove("tema-claro");
        document.body.classList.remove("tema-oscuro");

        //Obtener el contenedor de bienvenida
        const contenedor =
            document.getElementById("contenedor-bienvenida");

        //Buscar los elementos creados dinámicamente
        const titulo = contenedor.querySelector("h2");
        const parrafo = contenedor.querySelector("p");

        //Eliminar el título si existe
        if (titulo) {
            titulo.remove();
        }

        //Eliminar el párrafo si existe
        if (parrafo) {
            parrafo.remove();
        }
    });


});

/**
 * Guarda una cookie con una duración de 7 días.
 * @param {string} nombre - El nombre de la cookie.
 * @param {string} valor - El valor de la cookie.
 */
function guardarCookie(nombre, valor) {

    const fecha = new Date();

    //Sumar 7 días a la fecha actual
    fecha.setDate(fecha.getDate() + 7);

    document.cookie =
        `${nombre}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`;
}

/**
 * Elimina una cookie estableciendo su fecha de expiración en el pasado.
 * @param {string} nombre - El nombre de la cookie a eliminar.
 */

function borrarCookie(nombre) {

    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}



