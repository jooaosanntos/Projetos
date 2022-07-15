'use strict';

const sons = {
    "A": "boom.wav",
    "S": "clap.wav",
    "D": "hihat.wav",
    "F": "kick.wav",
    "G": "openhat.wav",
    "H": "ride.wav",
    "J": "snare.wav",
    "K": "tink.wav",
    "L": "tom.wav"
}

const criarBotao = (texto) => {
    const botao = document.createElement("div")
    botao.classList.add("key")
    botao.innerHTML = texto
    botao.id = texto
    document.getElementById("container-buttons").appendChild(botao)
}

const distribuirSons = (sons) => Object.keys(sons).forEach(letra => criarBotao(letra))

distribuirSons(sons)

const tocarSom = (letra) => {
    const audio = new Audio(`./sounds/${sons[letra]}`)
    audio.play()
}

const adcionarEfeito = (letraClicada) => document.getElementById(letraClicada).classList.add("active")

const removerEfeito = (letraClicada) => {
    const divClicada = document.getElementById(letraClicada)
    const removerActive = () => divClicada.classList.remove("active")
    divClicada.addEventListener("transitionend", removerActive)
}


const ativarBotao = (evento) => {
    const letraClicada = evento.type == "click" ? evento.target.id : evento.key.toUpperCase()

    const letraPermitida = sons.hasOwnProperty(letraClicada)
    if (letraPermitida) {
        adcionarEfeito(letraClicada)
        tocarSom(letraClicada)
        removerEfeito(letraClicada)
    }
}

document.getElementById("container-buttons")
    .addEventListener("click", ativarBotao)

window.addEventListener("keydown", ativarBotao)
