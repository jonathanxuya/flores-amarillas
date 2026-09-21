// ==========================================
// FUNCIONES GENERALES
// ==========================================

function mostrarPantalla(id) {

    const pantallas =
        document.querySelectorAll(".pantalla");

    pantallas.forEach(function (pantalla) {
        pantalla.classList.add("oculto");
    });

    const nueva =
        document.getElementById(id);

    nueva.classList.remove("oculto");

    window.scrollTo(0, 0);
}


// ==========================================
// LLUVIA INICIAL
// ==========================================

const lluvia =
    document.getElementById("lluvia");

for (let i = 0; i < 90; i++) {

    const gota =
        document.createElement("div");

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

    corazon.addEventListener(
        "click",
        function () {

            const mensaje =
                corazon.dataset.mensaje;


            mensajeCorazon.style.opacity = "0";


            setTimeout(function () {

                mensajeCorazon.textContent =
                    mensaje;

                mensajeCorazon.style.opacity =
                    "1";

            }, 200);


            // Evita contar dos veces
            // el mismo corazón

            if (
                !corazon.classList
                    .contains("abierto")
            ) {

                corazon.classList
                    .add("abierto");

                corazonesAbiertos++;

            }


            // Al abrir los 5
            // aparece Pikachu

            if (corazonesAbiertos === 5) {

                setTimeout(function () {

                    botonPikachu.style.display =
                        "inline-block";

                    mensajeCorazon.textContent =
                        "Espera... creo que alguien más quiere decirte algo ⚡💛";

                }, 600);

            }

        }
    );

});


// ==========================================
// ENTRAR AL JUEGO
// ==========================================

const pikachu =
    document.getElementById("pikachuJuego");

const zonaJuego =
    document.getElementById("zonaJuego");

const contador =
    document.getElementById("contador");

let intentos = 0;


botonPikachu.addEventListener(
    "click",
    function () {

        mostrarPantalla("juego");

        intentos = 0;

        contador.textContent =
            "Intentos: 0 / 4";

        setTimeout(
            moverPikachu,
            200
        );

    }
);


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


    const margen = 20;

    // Dejamos espacio arriba
    // para que no tape el título

    const espacioTitulo = 180;


    const maxX =
        anchoZona -
        anchoPika -
        margen;


    const maxY =
        altoZona -
        altoPika -
        margen;


    const nuevaX =
        Math.max(
            margen,
            Math.random() *
            (maxX - margen)
        );


    const nuevaY =
        Math.max(
            espacioTitulo,
            espacioTitulo +
            Math.random() *
            (
                maxY -
                espacioTitulo
            )
        );


    pikachu.style.left =
        nuevaX + "px";

    pikachu.style.top =
        nuevaY + "px";
}


// ==========================================
// ATRAPAR PIKACHU
// ==========================================

pikachu.addEventListener(
    "click",
    function (evento) {

        evento.stopPropagation();

        intentos++;

        contador.textContent =
            "Intentos: " +
            intentos +
            " / 4";


        // Primeros tres intentos:
        // Pikachu escapa

        if (intentos < 4) {

            moverPikachu();

            return;
        }


        // CUARTO INTENTO:
        // LO ATRAPA

        contador.textContent =
            "¡Lo atrapaste! ⚡💛";


        setTimeout(function () {

            mostrarPantalla("pika");

        }, 500);

    }
);


// ==========================================
// PIKA → FLORES
// ==========================================

document
    .getElementById("botonFloresPika")
    .addEventListener(
        "click",
        function () {

            mostrarPantalla(
                "pikachuFlores"
            );

        }
    );


// ==========================================
// FLORES → CARTA
// ==========================================

document
    .getElementById("botonCarta")
    .addEventListener(
        "click",
        function () {

            mostrarPantalla("carta");

            iniciarLluviaFinal();

        }
    );


// ==========================================
// LLUVIA DE FLORES Y CORAZONES
// ==========================================

function iniciarLluviaFinal() {

    const contenedor =
        document.getElementById(
            "lluviaFinal"
        );


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
            Math.random() * 100 +
            "vw";


        elemento.style.fontSize =
            (
                Math.random() *
                25 +
                20
            ) +
            "px";


        elemento.style.animationDuration =
            (
                Math.random() *
                4 +
                4
            ) +
            "s";


        contenedor.appendChild(
            elemento
        );


        // eliminar después
        // para no llenar la memoria

        setTimeout(function () {

            elemento.remove();

        }, 9000);


    }, 350);

}