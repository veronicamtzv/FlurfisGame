// Variables
var area = document.getElementById("areaDeJuego");
var puntaje = 0;
var vida = 5;
var ciclo;
var ban = true;
var jugoEmpezado = false;

var corazones0;
var corazones1;
var corazones2;
var corazones3;
var corazones4;
var corazones5;

// Funciones
function inicializar() {
    establecerAlturas();

    // Si la ventana cambia de tamaño, volvemos a calcular la altura de área
    window.onresize = establecerAlturas;

    document.getElementById("botonAyuda").onclick = function () {
        alert(
            "Obten el puntaje más alto que puedas.\n\nEstambre: 200 puntos.\nRatón: 100 puntos.\nPez: 50 puntos.\n\nCuidado con las trampas para ratones, u obtendrás 100 puntos negativos. No dejes caer las bolas de estambre, peces ni ratones o perderás un corazón.\n\nToca los corazones rojos para aumentar tu vida, y evita los negros o la perderás."
        );
    };

    document.getElementById("botonInicio").onclick = function () {
        area.removeChild(document.getElementById("botonInicio"));
        jugoEmpezado = true;
        ciclo = setInterval(nuevoItem, 700);
    };
}

// Le asigna una altura al área de juego
function establecerAlturas() {
    area.style.height = window.innerHeight - 149 + "px";

    if (window.innerWidth > 600) {
        corazones0 =
            "<img class='corazonesLinea' src='images/c_linea0.png' alt='Vida: 0' />";
        corazones1 =
            "<img class='corazonesLinea' src='images/c_linea1.png' alt='Vida: 1' />";
        corazones2 =
            "<img class='corazonesLinea' src='images/c_linea2.png' alt='Vida: 2' />";
        corazones3 =
            "<img class='corazonesLinea' src='images/c_linea3.png' alt='Vida: 3' />";
        corazones4 =
            "<img class='corazonesLinea' src='images/c_linea4.png' alt='Vida: 4' />";
        corazones5 =
            "<img class='corazonesLinea' src='images/c_linea5.png' alt='Vida: 5' />";
    } else {
        corazones0 =
            "<img class='corazonGrande' src='images/c_grande0.png' alt='Vida: 0' />";
        corazones1 =
            "<img class='corazonGrande' src='images/c_grande1.png' alt='Vida: 1' />";
        corazones2 =
            "<img class='corazonGrande' src='images/c_grande2.png' alt='Vida: 2' />";
        corazones3 =
            "<img class='corazonGrande' src='images/c_grande3.png' alt='Vida: 3' />";
        corazones4 =
            "<img class='corazonGrande' src='images/c_grande4.png' alt='Vida: 4' />";
        corazones5 =
            "<img class='corazonGrande' src='images/c_grande5.png' alt='Vida: 5' />";
    }

    if (jugoEmpezado) {
        let hearts = document.getElementById("areaCorazones");
        if (vida == 0) {
            hearts.innerHTML = corazones0;
        } else if (vida == 1) {
            hearts.innerHTML = corazones1;
        } else if (vida == 2) {
            hearts.innerHTML = corazones2;
        } else if (vida == 3) {
            hearts.innerHTML = corazones3;
        } else if (vida == 4) {
            hearts.innerHTML = corazones4;
        } else if (vida == 5) {
            hearts.innerHTML = corazones5;
        }
    }
}

// Sirve para obtener un ID único
function getID() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

// Se encarga de la creación de un nuevo objeto en el html
// El objeto tiene la clase item y un ID único
// Dependiendo de un número aleatorio se genera una imgen u otra
// Cada imagen tiene cierto valor de puntaje o de vida
function nuevoItem() {
    let id = getID(); // Obtención del ID único

    // numeroRandom determina el tipo de imagen que va a salir
    // Cada imagen tiene una probabilidad distinta de salir
    let numeroRandom = Math.floor(Math.random() * 20) + 1;

    if (numeroRandom >= 1 && numeroRandom <= 3) {
        // Imagen de corazón bueno
        // Se crea un img para insertar en el HTML
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/corazon.png' alt='corazón' />";
        area.insertAdjacentHTML("beforeend", elemento);
        // LLamamos a la función moverItem()
        // Le pasamos el ID único, si modifca puntaje/vida, valor
        moverItem(id, "vida", 1);
    }

    if (numeroRandom >= 4 && numeroRandom <= 6) {
        // Imagen corazón malo
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/corazonmalo.png' alt='corazón malo' />";
        area.insertAdjacentHTML("beforeend", elemento);
        moverItem(id, "vida", -1);
    }

    if (numeroRandom >= 7 && numeroRandom <= 8) {
        // Imagen estambre
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/estambre.png' alt='estambre' />";
        area.insertAdjacentHTML("beforeend", elemento);
        moverItem(id, "puntaje", 200);
    }

    if (numeroRandom >= 9 && numeroRandom <= 12) {
        // Imagen de ratón
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/raton.png' alt='ratón' />";
        area.insertAdjacentHTML("beforeend", elemento);
        moverItem(id, "puntaje", 100);
    }

    if (numeroRandom >= 13 && numeroRandom <= 16) {
        // Imagen pez
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/pez.png' alt='pez' />";
        area.insertAdjacentHTML("beforeend", elemento);
        moverItem(id, "puntaje", 50);
    }

    if (numeroRandom >= 17 && numeroRandom <= 20) {
        // Imagen resortera
        let elemento =
            "<img class='item' id='" +
            id +
            "' src='images/trampa.png' alt='resortera' />";
        area.insertAdjacentHTML("beforeend", elemento);
        moverItem(id, "puntaje", -100);
    }
}

// Hace que la imagen tenga movimiento (de caida)
// Recibe el ID de la imagen, su grupo y un valor

function moverItem(id, grupo, valor) {
    // Objeto va a ser la imagen con ID único que acabamos de crear
    let objeto = document.getElementById(id);
    let timer;
    // Definimos que hacer al darle click a la imagen
    objeto.onclick = function () {
        console.log("Elemento clickeado: " + id);

        // Si el grupo es puntaje entonces al puntaje se le modifica su valor
        if (grupo == "puntaje") {
            puntaje += valor;
            // Si fue del grupo vida modificamos la vida
        } else if (grupo == "vida") {
            // Si la vida ya está al máximo y dimos click a un corazón bueno
            // En vez de aumentar la vida, nos da puntos extra
            if (vida == 5 && valor == 1) {
                puntaje += 100;
                // Si nos queda solo corazón y dimos click a un corazón malo
                // Aparece una alerta con el mensaje "Perdiste"
            } else {
                vida += valor;
            }
        }

        area.style.cursor = "url(images/pawcursor2.png), auto";

        // Además, eliminamos la función setInterval (Que es la que hace que se mueva la imagen)
        // También quitamos la imagen del área de juego
        clearInterval(timer);
        area.removeChild(objeto);

        setTimeout(() => {
            area.style.cursor = "url(images/pawcursor.png), auto";
        }, 150);
    };

    // Delimitamos el área donde pueden aparecer las imagenes
    let dif = (window.innerWidth - area.offsetWidth) / 2;
    let min = Math.ceil(dif);
    let max = Math.floor(area.offsetWidth + dif - objeto.offsetWidth);
    // Obtenemos una posición al azar dentro del área de juego
    let izquierda = Math.floor(Math.random() * (max - min + 1)) + min;
    // La imagen aparece en esa posición al azar
    objeto.style.left = izquierda + "px";

    // Guardamos el tiempo de aparición de la imagen
    let inicio = Date.now();

    // Cada objeto va a tener una velocidad aleatoria de caída
    let velocidad = Math.floor(Math.random() * 3) + 1;

    // Ejecuta la función cada cierto tiempo
    // La función permite que se mueva la imagen al transcurrir el tiempo
    timer = setInterval(function () {
        // Calculamos el tiempo con respecto al inicio
        let timePassed = Date.now() - inicio;
        // Entre más tiempo pase, el objeto va a aparecer más abajo
        objeto.style.top = timePassed / (4 + velocidad) + "px";
        // Cuando el objeto llega al suelo desaparece
        // Si es estambre, ratón o pez; le quitamos una vida al jugador
        let altura = parseInt(objeto.style.top.replace("px", ""));

        document.getElementById("areaPuntaje").innerHTML =
            "<p class='puntos'>Puntaje: " + puntaje + "</p>";

        let hearts = document.getElementById("areaCorazones");
        if (vida == 0) {
            hearts.innerHTML = corazones0;
            perder();
        } else if (vida == 1) {
            hearts.innerHTML = corazones1;
        } else if (vida == 2) {
            hearts.innerHTML = corazones2;
        } else if (vida == 3) {
            hearts.innerHTML = corazones3;
        } else if (vida == 4) {
            hearts.innerHTML = corazones4;
        } else if (vida == 5) {
            hearts.innerHTML = corazones5;
        }

        if (altura >= area.offsetHeight - objeto.offsetHeight) {
            area.removeChild(objeto);
            if (grupo == "puntaje" && valor >= 0) {
                if (vida > 0) {
                    vida--;
                }
            }
            clearInterval(timer);
        }
    }, 2);
}

function perder() {
    if (ban) {
        ban = false;
        alert("Perdiste :c ");
        clearInterval(ciclo);
        let elemento =
            "<button id='botonReinicio' class='botonGrande'>Reiniciar</button>";
        area.insertAdjacentHTML("beforeend", elemento);
        document.getElementById("botonReinicio").onclick = function () {
            puntaje = 0;
            vida = 5;
            ban = true;
            area.removeChild(document.getElementById("botonReinicio"));
            ciclo = setInterval(nuevoItem, 700);
        };
    }
}

// Main
inicializar();
