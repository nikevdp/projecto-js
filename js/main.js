//esta funcion hace que al clikear los botones se les agregue una nueva classe y les saque la que ya tenian
function cambiarBoton(elemento, tipo) {

    let boton = document.getElementById(elemento)

    if (boton.classList.contains("boton-normal")) {
        boton.classList.remove("boton-normal")

        boton.className += " boton-seleccionado" + tipo
    }
    else {
        if (boton.classList.contains("boton-seleccionado" + tipo)) {
            boton.classList.remove("boton-seleccionado" + tipo)
        }
        boton.className += " boton-normal"
    }
}

//esta funcion hace que al apretar filtrar todos los botones vuelvan a la normalidad
function deseleccionador(elemento) {

    let boton = document.getElementById(elemento)

    if (boton.classList.contains("boton-seleccionadoGenero")) {
        boton.classList.remove("boton-seleccionadoGenero")
        boton.className += " boton-normal"
    }
    if (boton.classList.contains("boton-seleccionadoPlataforma")) {
        boton.classList.remove("boton-seleccionadoPlataforma")
        boton.className += " boton-normal"
    }
}

//eventos generos
$("#boton-shoter").click(() => {
    cambiarBoton("boton-shoter", "Genero")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-shoter")
    })
})
$("#boton-mmorpg").click(() => {
    cambiarBoton("boton-mmorpg", "Genero")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-mmorpg")
    })
})
$("#boton-mmo").click(() => {
    cambiarBoton("boton-mmo", "Genero")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-mmo")
    })
})
$("#boton-strategy").click(() => {
    cambiarBoton("boton-strategy", "Genero")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-strategy")
    })
})
$("#boton-survival").click(() => {
    cambiarBoton("boton-survival", "Genero")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-survival")
    })
})

//eventos plataformas
$("#boton-plataforma-1").click(() => {
    cambiarBoton("boton-plataforma-1", "Plataforma")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-plataforma-1")
    })
})
$("#boton-plataforma-2").click(() => {
    cambiarBoton("boton-plataforma-2", "Plataforma")
    $("#boton-filtrador").on(`click`, () => {
        deseleccionador("boton-plataforma-2")
    })
})

// boton filtrador evento
$("#boton-filtrador").on(`click`, () => {
    analizarPreferencias()

})

// boton borrador, elimina los datos del local storage
$("#boton-borrador").on(`click`, () => {
    localStorage.clear()
    $(".juegos").fadeOut("slow", function () {
        let juegosViejos = document.getElementById("juegoElegido");
        juegosViejos.parentNode.removeChild(juegosViejos)
        $("#seccionSeleccionados").append("<div id=juegoElegido></div>")
    })
})

// esta funcion toma los parametros ingresados y genera una lista de los juegos pedidos en base a una api
function analizarPreferencias() {

    //esta funcion soma la api que necestio y itinera los objetos para luego guardarlos en el storage en formato json
    function almacenador(api) {
        const JUEGOS = api;

        $.getJSON(JUEGOS, function (respuesta, estado) {
            if (estado === "success") {

                let lista = respuesta
                
                const juegoJSON = (clave, valor) => {
                    localStorage.setItem(clave, valor);
                    colocador()
                };

                juegoJSON('juego seleccionado', JSON.stringify(lista));
            }
        });
    }

    // esta funcion activa la api en base a la plataforma seleccionada y le coloca el genero en base la la opcion seleccionada
    function clasificador(genero) {
        let plataformas = $(".boton-seleccionadoPlataforma")
        for (const plataforma of plataformas) {
            if (plataforma.value == "PC") {
                almacenador("https://www.freetogame.com/api/games?platform=pc&category=" + genero)
            }
            if (plataforma.value == "Browser") {
                almacenador("https://www.freetogame.com/api/games?platform=browser&category=" + genero)
            }
        }
    }

    //aca los distintos generos aplicandoles la funcion clacificador
    let generos = $(".boton-seleccionadoGenero")
    for (const genero of generos) {
        if (genero.value == "Shooter") {
            clasificador("shooter")
        }
        if (genero.value == "Mmorpg") {
            clasificador("mmorpg")
        }
        if (genero.value == "Mmo") {
            clasificador("mmo")
        }
        if (genero.value == "survival") {
            clasificador("survival")
        }
        if (genero.value == "strategy") {
            clasificador("strategy")
        }
    }
}

// esta funcion toma la lista que genera la api del local y la coloca en el dom
function colocador() {

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let lista = JSON.parse(localStorage.getItem(clave))
        for (let juegos of lista) {
            $("#juegoElegido").append(`<div class="juegos" style="display: none">
        <asside><img src=${juegos.thumbnail} alt=""></asside>
        <asside class="textoJuego">
        <p> Nombre: ${juegos.title}</p>
        <p> Brebe descripcion: ${juegos.short_description}</p>
        <p> Genero: ${juegos.genre}</p>
        <p> Plataforma: ${juegos.platform}</p>
        <p> Link de descarga: <a href="${juegos.game_url}">${juegos.game_url}</a></p>
        </asside></div>`)
            $(".juegos").fadeIn();
        }
    }
}





