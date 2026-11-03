// 1. MODO CLARO Y OSCURO
const botonTema = document.getElementById("botonTema");

botonTema.addEventListener("click", function() {
  document.body.classList.toggle("modo-oscuro");

  if (document.body.classList.contains("modo-oscuro")) {
    botonTema.textContent = "Modo claro";
  } else {
    botonTema.textContent = "Modo oscuro";
  }
});

// 2. FILTRO DE CANCIONES POR ARTISTA
const botonesMusica = document.querySelectorAll(".filtro-musica");
const canciones = document.querySelectorAll(".cancion");

botonesMusica.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const artistaElegido = boton.dataset.artist;

    canciones.forEach(function(cancion) {
      const artistaCancion = cancion.dataset.artist;

      if (artistaElegido === "todos" || artistaElegido === artistaCancion) {
        cancion.style.display = "block";
      } else {
        cancion.style.display = "none";
      }
    });

    botonesMusica.forEach(function(b) {
      b.classList.remove("btn-dark");
      b.classList.add("btn-outline-dark");
    });
    boton.classList.remove("btn-outline-dark");
    boton.classList.add("btn-dark");
  });
});

// 3. FILTRO DE VIDEOJUEGOS
const botonesJuegos = document.querySelectorAll(".filtro-juego");
const juegos = document.querySelectorAll(".juego-item");

botonesJuegos.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const tipo = boton.dataset.game;

    juegos.forEach(function(juego) {
      if (tipo === "todos" || juego.dataset.game === tipo) {
        juego.style.display = "block";
      } else {
        juego.style.display = "none";
      }
    });
  });
});

// 4. FILTRO DE DEPORTES
const botonesDeporte = document.querySelectorAll(".filtro-deporte");
const deportes = document.querySelectorAll(".deporte-item");

botonesDeporte.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const tipo = boton.dataset.sport;

    deportes.forEach(function(deporte) {
      if (tipo === "todos" ||
          (tipo === "favoritos" && deporte.dataset.sport === "favorito")) {
        deporte.style.display = "block";
      } else {
        deporte.style.display = "none";
      }
    });
  });
});

// 5. FILTRO DE PROYECTOS
const botonesProyecto = document.querySelectorAll(".filtro-proyecto");
const proyectos = document.querySelectorAll(".proyecto-item");
const enlacesProyecto = document.querySelectorAll("[data-project-filter]");

function filtrarProyectos(categoria) {
  proyectos.forEach(function(proyecto) {
    if (categoria === "todos" || proyecto.dataset.category === categoria) {
      proyecto.style.display = "block";
    } else {
      proyecto.style.display = "none";
    }
  });
}

botonesProyecto.forEach(function(boton) {
  boton.addEventListener("click", function() {
    filtrarProyectos(boton.dataset.category);
  });
});

enlacesProyecto.forEach(function(enlace) {
  enlace.addEventListener("click", function() {
    filtrarProyectos(enlace.dataset.projectFilter);
  });
});

// 6. MENÚ: CERRAR DESPUÉS DE ELEGIR UNA OPCIÓN EN CELULAR
const enlacesMenu = document.querySelectorAll(".navbar-nav .nav-link");
const menu = document.getElementById("menu");

enlacesMenu.forEach(function(enlace) {
  enlace.addEventListener("click", function() {
    if (menu.classList.contains("show")) {
      document.querySelector(".navbar-toggler").click();
    }
  });
});

// 7. FORMULARIO DE CONTRATACIÓN CON VALIDACIONES PROGRESIVAS
const formulario = document.getElementById("formularioContratacion");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const tipoContratacion = document.getElementById("tipoContratacion");
const descripcion = document.getElementById("descripcion");
const enviar = document.getElementById("enviar");
const resultado = document.getElementById("resultadoFormulario");

function mostrarMensaje(campo, idMensaje, valido, mensajeError) {
  const mensaje = document.getElementById(idMensaje);

  if (valido) {
    campo.classList.remove("campo-error");
    campo.classList.add("campo-correcto");
    mensaje.textContent = "Campo correcto.";
    mensaje.className = "mensaje correcto";
  } else {
    campo.classList.remove("campo-correcto");
    campo.classList.add("campo-error");
    mensaje.textContent = mensajeError;
    mensaje.className = "mensaje error";
  }
}

function validarNombre() {
  const valido = nombre.value.trim().length >= 5;
  mostrarMensaje(nombre, "errorNombre", valido, "Escribe tu nombre completo (mínimo 5 caracteres).");
  return valido;
}

function validarCorreo() {
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
  mostrarMensaje(correo, "errorCorreo", valido, "Ingresa un correo electrónico válido.");
  return valido;
}

function validarTelefono() {
  const valido = /^[0-9]{8}$/.test(telefono.value.trim());
  mostrarMensaje(telefono, "errorTelefono", valido, "El celular debe contener exactamente 8 dígitos.");
  return valido;
}

function validarTipo() {
  const valido = tipoContratacion.value !== "";
  mostrarMensaje(tipoContratacion, "errorTipo", valido, "Selecciona el tipo de contratación.");
  return valido;
}

function validarDescripcion() {
  const valido = descripcion.value.trim().length >= 10;
  mostrarMensaje(descripcion, "errorDescripcion", valido, "Describe la propuesta con al menos 10 caracteres.");
  return valido;
}

// Cada campo se habilita cuando el anterior cumple su validación.
nombre.addEventListener("input", function() {
  const valido = validarNombre();
  correo.disabled = !valido;
  if (!valido) {
    telefono.disabled = true;
    tipoContratacion.disabled = true;
    descripcion.disabled = true;
    enviar.disabled = true;
  }
});

correo.addEventListener("input", function() {
  const valido = validarCorreo();
  telefono.disabled = !valido;
  if (!valido) {
    tipoContratacion.disabled = true;
    descripcion.disabled = true;
    enviar.disabled = true;
  }
});

telefono.addEventListener("input", function() {
  const valido = validarTelefono();
  tipoContratacion.disabled = !valido;
  if (!valido) {
    descripcion.disabled = true;
    enviar.disabled = true;
  }
});

tipoContratacion.addEventListener("change", function() {
  const valido = validarTipo();
  descripcion.disabled = !valido;
  if (!valido) enviar.disabled = true;
});

descripcion.addEventListener("input", function() {
  enviar.disabled = !validarDescripcion();
});

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const todoCorrecto =
    validarNombre() &&
    validarCorreo() &&
    validarTelefono() &&
    validarTipo() &&
    validarDescripcion();

  if (todoCorrecto) {
    resultado.textContent = "¡Solicitud completada! Esta demostración no envía los datos a un servidor; puedes contactarme mediante mis redes sociales.";
    resultado.className = "text-success fw-bold";
    formulario.reset();

    correo.disabled = true;
    telefono.disabled = true;
    tipoContratacion.disabled = true;
    descripcion.disabled = true;
    enviar.disabled = true;

    [nombre, correo, telefono, tipoContratacion, descripcion].forEach(function(campo) {
      campo.classList.remove("campo-correcto", "campo-error");
    });

    document.querySelectorAll(".mensaje").forEach(function(mensaje) {
      mensaje.textContent = "";
    });
  } else {
    resultado.textContent = "Revisa los campos y completa correctamente la solicitud.";
    resultado.className = "text-danger fw-bold";
  }
});
