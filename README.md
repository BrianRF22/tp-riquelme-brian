# Explorador de Personajes · Rick and Morty

Aplicación web interactiva que consume la API pública de *Rick and Morty* para buscar, filtrar y explorar información detallada de los personajes de la serie en tiempo real, resolviendo la necesidad de consultar datos estructurados de forma rápida y accesible desde cualquier dispositivo.

**Autor:** Brian Riquelme · Fundamentos de Desarrollo Web · UCSA  
**Variante del TP:** A · Personajes (`https://rickandmortyapi.com/api/character`)

## Sitios publicados
- **GitHub Pages:** https://TU-USUARIO.github.io/tp-riquelme-brian/
- **Vercel / Netlify:** https://tp-riquelme-brian.vercel.app

## Captura
![Captura de la aplicación](img/captura.png)

## Funcionalidades
- **Búsqueda y filtrado en tiempo real:** Consulta dinámica por nombre (`name`) y estado (`status`: Vivo, Muerto, Desconocido) mediante construcción segura de parámetros con `URL` y `searchParams`.
- **Manejo integral de estados y errores:** Indicador visual de carga, tratamiento del código HTTP `404` como «Sin resultados», captura de errores de red y control de disponibilidad de botones en bloque `finally`.
- **Renderizado seguro en el DOM:** Creación de tarjetas exclusivamente con `document.createElement` y `textContent`, normalizando valores vacíos o `"unknown"` como «Desconocido».
- **Persistencia local:** Almacenamiento y recuperación automática de la última búsqueda realizada mediante `localStorage` en formato JSON.
- **Diseño responsivo:** Interfaz adaptable desde `375px` sin desplazamiento horizontal utilizando CSS Grid (`repeat(auto-fill, minmax(240px, 1fr))`) y variables CSS en `:root`.

## Tecnologías
- HTML5 semántico
- CSS3 (Variables CSS, Flexbox, CSS Grid, diseño responsivo)
- JavaScript (ES6+, Fetch API, `async/await`, `localStorage`, manipulación segura del DOM)
- API REST pública de Rick and Morty

## Estructura del proyecto
```text
tp-riquelme-brian/
├── index.html          # Estructura semántica principal de la aplicación
├── README.md           # Documentación técnica del proyecto
├── .gitignore          # Exclusión de archivos del sistema, editor y dependencias
├── css/
│   └── estilos.css     # Hojas de estilo, variables de tema y diseño responsivo
├── js/
│   └── app.js          # Lógica de consumo de API, eventos y persistencia
└── img/
    └── captura.png     # Captura de pantalla de la interfaz en producción
```

## Cómo ejecutarlo localmente
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/tp-riquelme-brian.git
   ```
2. Ingresar a la carpeta del proyecto y abrir el archivo `index.html` directamente en el navegador (o ejecutarlo mediante la extensión *Live Server* en VS Code).

## Despliegue
El proyecto utiliza **despliegue continuo (CD)** conectado a la rama `main` del repositorio en GitHub. Cada `git push` hacia `main` dispara automáticamente la actualización en **GitHub Pages** y **Vercel / Netlify** en menos de dos minutos.
