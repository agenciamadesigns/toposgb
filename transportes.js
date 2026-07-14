document.addEventListener("DOMContentLoaded", () => {
  iniciarHeader();
  iniciarMenu();
  iniciarAnimaciones();
  iniciarFormularioTransporte();
  actualizarAnio();
});


/* ========================================
   HEADER FIJO
======================================== */

function iniciarHeader() {
  const header = document.getElementById("header");

  if (!header) {
    return;
  }

  function actualizarHeader() {
    if (window.scrollY > 60) {
      header.classList.add("is-fixed");
    } else {
      header.classList.remove("is-fixed");
    }
  }

  actualizarHeader();

  window.addEventListener("scroll", actualizarHeader, {
    passive: true
  });
}


/* ========================================
   MENÚ CELULAR
======================================== */

function iniciarMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (!menuToggle || !nav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const estaAbierto = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(estaAbierto)
    );

    document.body.style.overflow = estaAbierto
      ? "hidden"
      : "";
  });

  nav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}


/* ========================================
   ANIMACIONES AL HACER SCROLL
======================================== */

function iniciarAnimaciones() {
  const elementos = document.querySelectorAll(".reveal");

  if (!elementos.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => {
      elemento.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  elementos.forEach((elemento) => {
    observer.observe(elemento);
  });
}


/* ========================================
   FORMULARIO A WHATSAPP
======================================== */

function iniciarFormularioTransporte() {
  const formulario = document.getElementById("transportForm");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const numeroWhatsApp = "526621234567";

    const nombre = obtenerValor("nombre");
    const empresa = obtenerValor("empresa");
    const telefono = obtenerValor("telefono");
    const correo = obtenerValor("correo");
    const tipoCarga = obtenerValor("tipoCarga");
    const peso = obtenerValor("peso");
    const origen = obtenerValor("origen");
    const destino = obtenerValor("destino");
    const dimensiones = obtenerValor("dimensiones");
    const mensaje = obtenerValor("mensaje");

    if (!nombre || !telefono || !tipoCarga || !origen || !destino) {
      alert(
        "Completa los campos obligatorios antes de enviar."
      );

      return;
    }

    const texto = `
*NUEVA SOLICITUD DE TRANSPORTE*

*Nombre:* ${nombre}
*Empresa:* ${empresa || "No especificada"}
*Teléfono:* ${telefono}
*Correo:* ${correo || "No especificado"}

*Tipo de carga:* ${tipoCarga}
*Peso aproximado:* ${peso || "No especificado"}
*Dimensiones:* ${dimensiones || "No especificadas"}

*Origen:* ${origen}
*Destino:* ${destino}

*Descripción:*
${mensaje || "Sin información adicional"}
    `.trim();

    const urlWhatsApp =
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(
      urlWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  });
}


function obtenerValor(id) {
  const elemento = document.getElementById(id);

  if (!elemento) {
    return "";
  }

  return elemento.value.trim();
}


/* ========================================
   AÑO DEL FOOTER
======================================== */

function actualizarAnio() {
  const currentYear = document.getElementById("currentYear");

  if (!currentYear) {
    return;
  }

  currentYear.textContent = new Date().getFullYear();
}