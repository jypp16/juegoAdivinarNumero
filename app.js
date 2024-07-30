let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteado = [];
let numeroMaximo = 10;
let numeroMaximoIntentos = 0;
let acertaste = false;

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Ingrese un numero valido entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }
    numeroMaximoIntentos--;
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        acertaste = true;
        deshabilitarHabilitarBotones();
    } else {
        if (numeroMaximoIntentos === 0) {
            asignarTextoElemento('p', 'Lo siento, no acertaste el número');
            listaNumeroSorteado.pop();
            acertaste = true;
            deshabilitarHabilitarBotones();
        } else {
            if (numeroSecreto < numeroDeUsuario) {
                asignarTextoElemento('p', `El número secreto es menor, te ${numeroMaximoIntentos === 1 ? 'queda' : 'quedan'} ${numeroMaximoIntentos} ${numeroMaximoIntentos === 1 ? 'intento' : 'intentos'}`);
            } else {
                asignarTextoElemento('p', `El número secreto es mayor, te ${numeroMaximoIntentos === 1 ? 'queda' : 'quedan'} ${numeroMaximoIntentos} ${numeroMaximoIntentos === 1 ? 'intento' : 'intentos'}`);
            }
            intentos++;
            acertaste = false;
            limpiarCaja();
        }
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;
    if (listaNumeroSorteado.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        deshabilitarTodosBotones();
    }
    else {
        if (listaNumeroSorteado.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteado.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    numeroMaximoIntentos = 5;
    intentos = 1;
    acertaste = false;
    asignarTextoElemento('h1', 'Adivinar número!');
    asignarTextoElemento('p', `Ingresa un número entre 1 y ${numeroMaximo}, tienes ${numeroMaximoIntentos} ${numeroMaximoIntentos === 1 ? 'intento' : 'intentos'}`);
    deshabilitarHabilitarBotones();
    numeroSecreto = generarNumeroSecreto();
}

function deshabilitarHabilitarBotones() {
    document.querySelector('#intentar').removeAttribute('disabled');
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    if (acertaste) {
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        document.querySelector('#reiniciar').removeAttribute('disabled');
    }
}

function deshabilitarTodosBotones() {
    document.querySelector('#intentar').setAttribute('disabled', 'true');
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
}

condicionesIniciales();