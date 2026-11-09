# El Guardián de la Interfaz

## Descripción

Aplicación web desarrollada con HTML, CSS y JavaScript que permite al usuario personalizar el aspecto visual de la página mediante la selección de un color de fondo y un tema visual (claro u oscuro).

Las preferencias se almacenan mediante cookies para que se mantengan al recargar la página o volver a acceder a ella.

---

## Funcionalidades

### Generación dinámica del DOM

- Creación dinámica de un título (`h2`) y un párrafo.
- Uso de `createElement()`.
- Uso de `textContent`.
- Inserción de elementos mediante `appendChild()`.

### Personalización visual

- Selección de color mediante `input type="color"`.
- Cambio instantáneo del color de fondo.
- Selector de tema claro u oscuro.
- Aplicación de estilos mediante `classList.add()` y `classList.remove()`.

### Gestión de cookies

- Almacenamiento del nombre del usuario.
- Almacenamiento del color de fondo.
- Almacenamiento del tema visual.
- Recuperación automática de preferencias al cargar la página.

### Restablecimiento de la interfaz

- Eliminación de cookies.
- Restauración de valores por defecto.
- Eliminación del mensaje de bienvenida generado dinámicamente.

---

## Funciones implementadas

### getCookie(nombre)

Obtiene el valor de una cookie a partir de su nombre.

### crearBienvenida(nombreUsuario)

Genera dinámicamente el mensaje de bienvenida en el DOM.

### guardarCookie(nombre, valor)

Guarda una cookie con una duración de siete días.

### borrarCookie(nombre)

Elimina una cookie asignándole una fecha de expiración pasada.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript

---

## Nombre y apellidos:

José Fernández Díaz