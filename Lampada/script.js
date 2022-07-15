const botoes = [...document.querySelectorAll(".acoes-wrapper button")]
const divImg = document.querySelector(".lampada-wrapper img")

let quebrou = false
let ligada = false

function mudarImagem (opcao){
    if (quebrou) return
    if (opcao == "ligar") {
        divImg.attributes.src.value = "./img/ligada.jpg"
        ligada = true
    }
    else if (opcao == "desligar") {
        divImg.attributes.src.value = "./img/desligada.jpg"
        ligada = false
    }
    else divImg.attributes.src.value = "./img/quebrada.jpg"
}

botoes.forEach(botao => {
    botao.onclick = () => {
        mudarImagem(botao.getAttribute("id"))
    }
})

divImg.addEventListener("mouseover", () => {
    if(ligada){
        mudarImagem("desligar")
        ligada = false
    }else{
        mudarImagem("ligar")
        ligada = true
    }
})

divImg.addEventListener("dblclick", () => {
    mudarImagem("quebrada")
    quebrou = true
})