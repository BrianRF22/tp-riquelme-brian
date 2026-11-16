const API_ENDPOINT = 'https://rickandmortyapi.com/api/character';
const STORAGE_KEY = 'tp_busqueda_riquelme_brian';

const formBusqueda = document.getElementById('form-busqueda');
const inputNombre = document.getElementById('input-nombre');
const selectEstado = document.getElementById('select-estado');
const btnBuscar = document.getElementById('btn-buscar');
const btnLimpiar = document.getElementById('btn-limpiar');
const estadoMensaje = document.getElementById('estado-mensaje');
const grillaResultados = document.getElementById('grilla-resultados');

document.addEventListener('DOMContentLoaded', () => {
  const ultimaBusqueda = leerUltimaBusqueda();
  if (ultimaBusqueda) {
    inputNombre.value = ultimaBusqueda.nombre || '';
    selectEstado.value = ultimaBusqueda.filtro || '';
  }
  ejecutarBusqueda(inputNombre.value.trim(), selectEstado.value);
});

formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const filtro = selectEstado.value;
  guardarUltimaBusqueda(nombre, filtro);
  ejecutarBusqueda(nombre, filtro);
});

btnLimpiar.addEventListener('click', () => {
  inputNombre.value = '';
  selectEstado.value = '';
  localStorage.removeItem(STORAGE_KEY);
  ejecutarBusqueda('', '');
});

async function ejecutarBusqueda(nombre, filtro) {
  mostrarMensaje('Buscando personajes...', 'cargando');
  grillaResultados.innerHTML = '';
  alternarBotones(true);

  try {
    const personajes = await pedirDatosAPI(nombre, filtro);
    if (personajes.length === 0) {
      mostrarMensaje('Sin resultados para los criterios ingresados.', 'vacio');
      return;
    }
    ocultarMensaje();
    renderizarTarjetas(personajes);
  } catch (error) {
    console.error('Error en la petición:', error);
    mostrarMensaje('Ocurrió un error de conexión al consultar la API. Intenta nuevamente.', 'error');
  } finally {
    alternarBotones(false);
  }
}

async function pedirDatosAPI(nombre, filtro) {
  const url = new URL(API_ENDPOINT);
  if (nombre) {
    url.searchParams.set('name', nombre);
  }
  if (filtro) {
    url.searchParams.set('status', filtro);
  }

  const respuesta = await fetch(url);

  if (respuesta.status === 404) {
    return [];
  }

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  return Array.isArray(datos.results) ? datos.results : [];
}

function renderizarTarjetas(lista) {
  grillaResultados.innerHTML = '';
  lista.forEach((personaje) => {
    const tarjeta = crearTarjeta(personaje);
    grillaResultados.appendChild(tarjeta);
  });
}

function crearTarjeta(personaje) {
  const article = document.createElement('article');
  article.className = 'tarjeta';

  const img = document.createElement('img');
  img.src = personaje.image || '';
  img.alt = `Imagen de ${normalizarValor(personaje.name)}`;
  img.loading = 'lazy';
  article.appendChild(img);

  const cuerpo = document.createElement('div');
  cuerpo.className = 'tarjeta-cuerpo';

  const titulo = document.createElement('h2');
  titulo.className = 'tarjeta-titulo';
  titulo.textContent = normalizarValor(personaje.name);
  cuerpo.appendChild(titulo);

  const especie = document.createElement('p');
  especie.className = 'tarjeta-dato';
  especie.textContent = `Especie: ${normalizarValor(personaje.species)}`;
  cuerpo.appendChild(especie);

  const origen = document.createElement('p');
  origen.className = 'tarjeta-dato';
  const nombreOrigen = personaje.origin ? personaje.origin.name : '';
  origen.textContent = `Origen: ${normalizarValor(nombreOrigen)}`;
  cuerpo.appendChild(origen);

  const estadoTexto = traducirEstado(personaje.status);
  const badge = document.createElement('span');
  const claseEstado = (personaje.status || 'unknown').toLowerCase();
  badge.className = `badge badge-${['alive', 'dead', 'unknown'].includes(claseEstado) ? claseEstado : 'unknown'}`;
  badge.textContent = `Estado: ${estadoTexto}`;
  cuerpo.appendChild(badge);

  article.appendChild(cuerpo);
  return article;
}

function normalizarValor(valor) {
  if (!valor || String(valor).trim() === '' || String(valor).toLowerCase() === 'unknown') {
    return 'Desconocido';
  }
  return String(valor);
}

function traducirEstado(status) {
  const mapa = {
    alive: 'Vivo',
    dead: 'Muerto',
    unknown: 'Desconocido'
  };
  const clave = (status || '').toLowerCase();
  return mapa[clave] || 'Desconocido';
}

function mostrarMensaje(texto, tipo) {
  estadoMensaje.textContent = texto;
  estadoMensaje.className = `estado-mensaje estado-${tipo}`;
}

function ocultarMensaje() {
  estadoMensaje.textContent = '';
  estadoMensaje.className = 'estado-mensaje oculto';
}

function alternarBotones(deshabilitar) {
  btnBuscar.disabled = deshabilitar;
  btnLimpiar.disabled = deshabilitar;
}

function guardarUltimaBusqueda(nombre, filtro) {
  const datos = { nombre, filtro };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
}

function leerUltimaBusqueda() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}
