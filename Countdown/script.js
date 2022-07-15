'use strict'

const formatarDigito = (digito) => `0${digito}`.slice(-2);

const atualizarTempo = (tempo) => {
    const segundos = document.getElementById("segundos");
    const minutos = document.getElementById("minutos");
    const horas = document.getElementById("horas");
    const dias = document.getElementById("dias");

    const quatidadeSegundos = tempo % 60;
    const quantidadeMinutos = Math.floor((tempo % (60 * 60)) / 60);
    const quantidadeHoras = Math.floor((tempo % (60 * 60 * 24)) / 3600);
    const quantidadeDias = Math.floor(tempo / (60 * 60 * 24));

    segundos.textContent = formatarDigito(quatidadeSegundos);
    minutos.textContent = formatarDigito(quantidadeMinutos);
    horas.textContent = formatarDigito(quantidadeHoras);
    dias.textContent = formatarDigito(quantidadeDias);
}

const contagemRegressiva = tempo => {
    const pararContagem = () => clearInterval(idIntervalo);

    const contarTempo = () => {
        if (tempo == 0) pararContagem();
        atualizarTempo(tempo)
        tempo -= 1;
    };
    const idIntervalo = setInterval(contarTempo, 1000);
}

const calcularTempoRestante = () => {
    const dataEvento = new Date("2022-04-07 20:00:00");
    const dataAtual = Date.now()
    return Math.floor((dataEvento - dataAtual) / 1000)
}

contagemRegressiva(calcularTempoRestante());
