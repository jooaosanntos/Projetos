const divImage = document.querySelector(".image-wrapper img")
const botoes = [...document.querySelectorAll(".botoes-wrapper button")]

let carrossel = false
let id_processo

function carrosssel(){
    let ctt = 0
    id_processo = setInterval(() => {

        if(ctt == 0){
            divImage.attributes.src.value = "./img/vermelho.png"    
            ctt += 1
        }else if(ctt == 1){
            divImage.attributes.src.value = "./img/amarelo.png"
            ctt += 1
        }else if(ctt == 2){
            divImage.attributes.src.value = "./img/verde.png"
            ctt = 0
        }
    }, 800)
}

function alterarImagem(id){
    clearInterval(id_processo)
    if (id == "vermelho"){
        divImage.attributes.src.value = "./img/vermelho.png"
        carrossel = true
    }else if(id == "amarelo"){
        divImage.attributes.src.value = "./img/amarelo.png"
        carrossel = true
    }else if(id == "verde"){
        divImage.attributes.src.value = "./img/verde.png"
        carrossel = true
    }else if(id == "automatico"){
        carrossel = false
        carrosssel()
    }
}

botoes.forEach(botao => {
    botao.onclick = () => {
        alterarImagem(botao.getAttribute("id"))
    }
})
