if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js')
    .then(registration => {
    console.log('Service Worker registrado con éxito:', registration)
    })
    .catch(error => {
    console.log('Error al registrar el Service Worker:', error)
    })
}
document.getElementById('descargar_app').addEventListener('click', instalarPWA)
document.getElementById('descargar_footer').addEventListener('click', instalarPWA)

function instalarPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt()
        deferredPrompt = null
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e
})

document.addEventListener("DOMContentLoaded", function() {
    const elementosAnimados = document.querySelectorAll('.navegacion_imagenes > img, .compra_imagenes > img');
  
    const opciones = {
      threshold: 0.8
    }

    const animacion = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animada')
            observer.unobserve(entry.target)
          }
        })
      }, opciones)
    
      elementosAnimados.forEach(function(elemento) {
        animacion.observe(elemento)
      })
})