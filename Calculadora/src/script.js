// Função para adcionar som ao click das teclas
const reproduzirSom = () => {
    const audio = new Audio("./sounds/tink.wav")
    audio.play()
}


// Função para os números
const escreverNumero = (event) => {
    reproduzirSom()
    const display = document.querySelector("#display")
    if (display.innerHTML.split("").length < 10) {
        display.innerHTML += event.target.innerHTML
    }
}
document.querySelectorAll(".numero").forEach(botaoNumero => {
    botaoNumero.addEventListener("click", escreverNumero)
})


// Função para os sinais
const escreverSinal = (event) => {
    reproduzirSom()
    const display = document.querySelector("#display")
    const arrayDisplay = display.innerHTML.split("")

    if (!isNaN(arrayDisplay[arrayDisplay.length - 1]) || arrayDisplay[arrayDisplay.length - 1] == ")") {
        display.innerHTML += event.target.innerHTML
    }
}
document.querySelectorAll(".sinal").forEach(botaoSinal => {
    botaoSinal.addEventListener("click", escreverSinal)
})


// Função para valor
const limparAtual = () => {
    reproduzirSom()
    const display = document.querySelector("#display")
    const arrayDisplay = display.innerHTML.split("")
    arrayDisplay.pop()
    display.innerHTML = arrayDisplay.join("")
}
document.querySelector("#limparAtual").addEventListener("click", limparAtual)


// Função para limpar display
const limparDisplay = () => {
    reproduzirSom()
    const display = document.querySelector("#display")
    display.innerHTML = ""
}
document.querySelector("#limparDisplay").addEventListener("click", limparDisplay)


const verificarSinal = (elemento) => {
    return elemento == "+" || elemento == "-" || elemento == "/" || elemento == "*" || elemento == ","
}


// Função para inserir parenteses
const inserirParenteses = (event) => {
    reproduzirSom()

    const display = document.querySelector("#display")
    const arrayDisplay = display.innerHTML.split("")

    const elemento = event.target.innerHTML
    const elementoAnterior = arrayDisplay[arrayDisplay.length - 1]

    // Evita 4(
    if (elemento == "(" && arrayDisplay.length > 0 && !verificarSinal(elementoAnterior) && elementoAnterior != "(") return 0
    // Evita +)
    if (elemento == ")" && arrayDisplay.length > 0 && verificarSinal(elementoAnterior)) return 0
    // Evita ()
    if (elemento == ")" && elementoAnterior == "(") return 0
    
    display.innerHTML += elemento
}
document.querySelectorAll(".parentese").forEach(botaoParentese => {
    botaoParentese.addEventListener("click", inserirParenteses)
})


// Função para fechar modal de erro
document.querySelector("#iconeX").addEventListener("click", () => {
    reproduzirSom()
    document.querySelector("#modalAlerta").style.display = "none"
})


// Função para alertar erro
const alertarErro = (erro) => {
    const modalAlerta = document.querySelector("#modalAlerta")
    modalAlerta.style.display = "block"
    modalAlerta.children[1].innerHTML = erro
}


// Função para verificar se os parênteses estão bem colocados
const verificarParenteses = () => {
    const display = document.querySelector("#display")
    const arrayDisplay = display.innerHTML.split("")

    for (let indice1 = 0; indice1 < arrayDisplay.length; indice1++) {
        if (arrayDisplay[indice1] == ")") {
            return false
        }
        if (arrayDisplay[indice1] == "(") {
            let mais_proximo = -1
            for (let indice2 = arrayDisplay.length - 1; indice2 > indice1; indice2--) {
                if (arrayDisplay[indice2] == ")") {
                    mais_proximo = indice2
                }
            }
            if (mais_proximo != -1) {
                arrayDisplay.splice(mais_proximo, 1, 0)
            } else {
                return false
            }
        }
    }
    return true
}


// Função para submeter resultado e escrevê-lo no display
const calcularResultado = () => {
    reproduzirSom()
    if (verificarParenteses()) {
        const display = document.querySelector("#display")
        const arrayDisplay = display.innerHTML.split("")

        const ultimoElemento = arrayDisplay[arrayDisplay.length - 1]
        if (verificarSinal(ultimoElemento)) {
            arrayDisplay.splice(arrayDisplay.length - 1, 1)
        }
        let resposta = Number(eval(arrayDisplay.join("")))
        if(!Number.isInteger(resposta)){
            resposta = resposta.toFixed(1)
        }
        display.innerHTML = resposta
    } else {
        alertarErro("Erro: parênteses mal colocados!")
    }
}
document.querySelector("#calcular").addEventListener("click", calcularResultado)

