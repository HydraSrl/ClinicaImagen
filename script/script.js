  // Coordenadas iniciales
  const map = L.map('map').setView([-34.9011, -56.1645], 13);

  // Cargar mapa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);



  // Marcadores

  const clinicas = {

    carrasco: {
      nombre: "Clínica Carrasco",
      coords: [-34.8697728364672, -56.031011681452036],
      marker: null,
      img: "img/Carrasco.jpg",
      desc: ""
    },
    caudillos: {
      nombre: "Clínica Caudillos",
      coords: [-34.90181745884396, -56.16445663068945],
      marker: null,
      img: "img/Caudillos.jpg",
      desc: ""
    },
    mveoshopping: {
      nombre: "Clínica Montevideo Shopping",
      coords: [-34.90428041846159, -56.13711720185326],
      marker: null,
      img: "img/MveoShopping.jpg",
      desc: ""
    },
    nuevocentro: {
      nombre: "Clínica Nuevo Centro",
      coords: [-34.86934015283137, -56.16946944232764],
      marker: null,
      img: "img/NuevoCentro.jpg",
      desc: ""
    },
    lagomar: {
      nombre: "Clínica Lagomar",
      coords: [-34.83108835014081, -55.97627332883617],
      marker: null,
      img: "img/Lagomar.jpg",
      desc: ""
    },
    atlantida: {
      nombre: "Clínica Atlántida",
      coords: [-34.770065727782914, -55.7592431],
      marker: null,
      img: "img/Atlantida.png",
      desc: ""
    },
    colonia: {
      nombre: "Clínica Colonia",
      coords: [-34.471445168857336, -57.845109700751166],
      marker: null,
      img: "img/Colonia.jpg",
      desc: ""
    },
    libertad: {
      nombre: "Clínica Libertad",
      coords: [-34.63053773233517, -56.61749261534472],
      marker: null,
      img: "img/Libertad.jpg",
      desc: ""
    },
    pdeleste: {
      nombre: "Clínica Punta del Este",
      coords: [-34.914410814682434, -54.961037812232945],
      marker: null,
      img: "img/PuntadelEste.jpg",
      desc: ""
    },
    laspiedras: {
      nombre: "Clínica Las Piedras",
      coords: [-34.726824515396295, -56.21471832327639],
      marker: null,
      img: "img/LasPiedrasjpg.jpg",
      desc: ""
    }
  };
  for (let key in clinicas) {
    const c = clinicas[key];
    const marker = L.marker(c.coords).addTo(map).bindPopup(`<b>${c.nombre}</b>`);
    c.marker = marker;
  }

  function centrar(nombre) {
    const c = clinicas[nombre];
    if (!c) return;

    map.setView(c.coords, 14);
    c.marker.openPopup();

    // Referencias
    const img = document.getElementById("clinicaImg");
    const desc = document.getElementById("clinicaDesc");

    // Resetear clases y opacidad
    img.className = "";
    desc.className = "";
    img.style.opacity = 0;
    desc.style.opacity = 0;

    // Actualizar contenido
    img.src = c.img;
    desc.textContent = c.desc;

    // Forzar reflow
    void img.offsetWidth;
    void desc.offsetWidth;

    // Activar animaciones
    img.classList.add("slide-in-R");
    desc.classList.add("fade-in");
  }

/* Login y Register */

// Precargar usuarios solo si no existen aún
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (!usuarios || usuarios.length === 0) {
  usuarios = [
    {
      nombre: "Luciano",
      apellido: "Garcia",
      contraseña: "56157891",
      fechaNacimiento: "2005-09-22",
      tipoDeContacto: "email",
      contacto: "luchi123456789000000@gmail.com",
      rol: "admin",
    },
    {
      nombre: "Carlos",
      apellido: "Gonzales",
      contraseña: "56157891",
      fechaNacimiento: "2005-09-22",
      tipoDeContacto: "email",
      contacto: "carlos",
      rol: "usr",
    }
  ];
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para listar los usuarios registrados
function Listar() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let mensaje = "Usuarios registrados:\n\n";

  if (usuarios.length === 0) {
    alert("No hay usuarios registrados.");
    return;
  }

  usuarios.forEach((usuario, index) => {
    mensaje += `${index + 1}. ${usuario.nombre} ${usuario.apellido}, Nacido: ${usuario.fechaNacimiento}, Contacto (${usuario.tipoDeContacto}): ${usuario.contacto}, Rol: ${usuario.rol}\n`;
  });

  alert(mensaje);
  console.log("Usuarios cargados:", usuarios);
}
function login() {
  const contacto = document.getElementById("contacto").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!contacto || !pass) {
    alert("Completá todos los campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = usuarios.find(u => u.contacto === contacto && u.contraseña === pass);

  if (user) {
    alert("Inicio de sesión exitoso.");
    console.log("Usuario logueado:", user);
    // Redirigir si querés:
    // window.location.href = "pagina-principal.html";
  } else {
    alert("Contacto o contraseña incorrectos.");
  }
}
function Registrar() {
  const nombre = document.getElementById("name").value.trim();
  const sname = document.getElementById("sname").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const fechan = document.getElementById("fechan").value.trim();
  const tipodecontacto = document.getElementById("eot").value.trim();
  const contacto = document.getElementById("contacto").value.trim();

  if (!nombre || !sname || !pass || !fechan || !tipodecontacto || !contacto) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  if (pass.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres");
    return;
  }

  const hoy = new Date();
  const nacimiento = new Date(fechan);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

  if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  if (edad < 18) {
    alert("No podés registrarte porque sos menor de edad.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


  const existeUsuario = usuarios.find(
    (u) => u.contacto === contacto
  );
  if (existeUsuario) {
    alert("Ese contacto ya está registrado.");
    return;
  }

  const nuevoUsuario = {
    nombre: nombre,
    apellido: sname,
    contraseña: pass,
    fechaNacimiento: fechan,
    tipoDeContacto: tipodecontacto,
    contacto: contacto,
    rol: "usr"
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  document.getElementById("name").value = "";
  document.getElementById("sname").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("fechan").value = "";
  document.getElementById("eot").value = "";
  document.getElementById("contacto").value = "";

  alert("Registro exitoso");
}
