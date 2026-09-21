// ==========================================
// MOSTRAR PANTALLAS
// ==========================================

function mostrarPantalla(id) {

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach(function (pantalla) {
        pantalla.classList.add("oculto");
    });

    const nuevaPantalla = document.getElementById(id);

    nuevaPantalla.classList.remove("oculto");

    // Siempre comenzar arriba
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
}


// ==========================================
// LLUVIA INICIAL
// ==========================================

const lluvia = document.getElementById("lluvia");

for (let i = 0; i < 90; i++) {

    const gota = document.createElement("div");

    gota.classList.add("gota");

    gota.style.left =
        Math.random() * 100 + "%";

    gota.style.animationDuration =
        (Math.random() * 1 + 0.6) + "s";

    gota.style.animationDelay =
        Math.random() * 3 + "s";

    lluvia.appendChild(gota);
}


// ==========================================
// INICIO → FLORES
// ==========================================

document
    .getElementById("botonSorpresa")
    .addEventListener("click", function () {

        mostrarPantalla("flores");

    });


// ==========================================
// FLORES → CORAZONES
// ==========================================

document
    .getElementById("botonRazones")
    .addEventListener("click", function () {

        mostrarPantalla("razones");

    });


// ==========================================
// CORAZONES
// ==========================================

const corazones =
    document.querySelectorAll(".corazon-carta");

const mensajeCorazon =
    document.getElementById("mensajeCorazon");

const botonPikachu =
    document.getElementById("botonPikachu");

let corazonesAbiertos = 0;


corazones.forEach(function (corazon) {

    corazon.addEventListener("click", function () {

        const mensaje =
            corazon.dataset.mensaje;

        mensajeCorazon.style.opacity = "0";

        setTimeout(function () {

            mensajeCorazon.textContent = mensaje;
            mensajeCorazon.style.opacity = "1";

        }, 200);


        if (!corazon.classList.contains("abierto")) {

            corazon.classList.add("abierto");

            corazonesAbiertos++;
        }


        if (corazonesAbiertos === 5) {

            setTimeout(function () {

                botonPikachu.style.display =
                    "inline-block";

                mensajeCorazon.textContent =
                    "Espera... creo que alguien más quiere decirte algo ⚡💛";

            }, 500);
        }

    });

});


// ==========================================
// JUEGO PIKACHU
// ==========================================

const pikachu =
    document.getElementById("pikachuJuego");

const zonaJuego =
    document.getElementById("zonaJuego");

const contador =
    document.getElementById("contador");

let intentos = 0;


botonPikachu.addEventListener("click", function () {

    mostrarPantalla("juego");

    intentos = 0;

    contador.textContent =
        "Intentos: 0 / 4";

    setTimeout(moverPikachu, 150);

});


// ==========================================
// MOVER PIKACHU
// ==========================================

function moverPikachu() {

    const anchoZona =
        zonaJuego.clientWidth;

    const altoZona =
        zonaJuego.clientHeight;

    const anchoPika =
        pikachu.offsetWidth;

    const altoPika =
        pikachu.offsetHeight;

    const margen = 15;

    // Espacio reservado para el título
    const espacioTitulo =
        window.innerWidth <= 600 ? 190 : 180;

    const maxX =
        Math.max(
            margen,
            anchoZona - anchoPika - margen
        );

    const maxY =
        Math.max(
            espacioTitulo,
            altoZona - altoPika - margen
        );

    const rangoX =
        Math.max(0, maxX - margen);

    const rangoY =
        Math.max(0, maxY - espacioTitulo);

    const nuevaX =
        margen + Math.random() * rangoX;

    const nuevaY =
        espacioTitulo + Math.random() * rangoY;

    pikachu.style.left =
        nuevaX + "px";

    pikachu.style.top =
        nuevaY + "px";
}


// ==========================================
// ATRAPAR PIKACHU
// ==========================================

pikachu.addEventListener("click", function (evento) {

    evento.stopPropagation();

    intentos++;

    contador.textContent =
        "Intentos: " + intentos + " / 4";


    if (intentos < 4) {

        moverPikachu();

        return;
    }


    contador.textContent =
        "¡Lo atrapaste! ⚡💛";


    setTimeout(function () {

        mostrarPantalla("pika");

    }, 450);

});


// Si cambia el tamaño de la pantalla,
// recolocamos a Pikachu.

window.addEventListener("resize", function () {

    if (
        !document
            .getElementById("juego")
            .classList
            .contains("oculto")
    ) {

        moverPikachu();
    }

});


// ==========================================
// PIKA → FLORES
// ==========================================

document
    .getElementById("botonFloresPika")
    .addEventListener("click", function () {

        mostrarPantalla("pikachuFlores");

    });


// ==========================================
// FLORES → MENSAJE FINAL
// ==========================================

document
    .getElementById("botonCarta")
    .addEventListener("click", function () {

        mostrarPantalla("carta");

        iniciarLluviaFinal();

    });


// ==========================================
// LLUVIA FINAL
// ==========================================

let lluviaFinalIniciada = false;

function iniciarLluviaFinal() {

    if (lluviaFinalIniciada) {
        return;
    }

    lluviaFinalIniciada = true;

    const contenedor =
        document.getElementById("lluviaFinal");

    const elementos = [
        "🌻",
        "💛",
        "🌼",
        "✨"
    ];


    setInterval(function () {

        const elemento =
            document.createElement("div");

        elemento.classList.add(
            "elemento-final"
        );

        elemento.textContent =
            elementos[
                Math.floor(
                    Math.random() *
                    elementos.length
                )
            ];

        elemento.style.left =
            Math.random() * 100 + "vw";

        elemento.style.fontSize =
            (Math.random() * 25 + 20) + "px";

        elemento.style.animationDuration =
            (Math.random() * 4 + 4) + "s";

        contenedor.appendChild(elemento);


        setTimeout(function () {

            elemento.remove();

        }, 9000);

    }, 350);
}
