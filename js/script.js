if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js')
    .then(registration => {
    console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(error => {
    console.log('Error al registrar el Service Worker:', error);
    });
}
document.getElementById('descargar_app').addEventListener('click', instalarPWA)

function instalarPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt()
        deferredPrompt = null
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e
})