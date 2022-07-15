
const images = [
    {"id": "0", "url": "./img/chrono.jpg"},
    {"id": "1", "url": "./img/inuyasha.jpg"},
    {"id": "2", "url": "./img/ippo.png"},
    {"id": "3", "url": "./img/tenchi.jpg"},
    {"id": "4", "url": "./img/tenjhotenge.jpg"},
    {"id": "5", "url": "./img/yuyuhakusho.jpg"}
]

const containerItems = document.querySelector("#container-items")

const loadImages = (images, containerItems) => {
    images.forEach(image => {
        containerItems.innerHTML += `
        <div class="item" id='${image.id}'>
        <img src='${image.url}'>
        </div>
        `
    })
}

loadImages(images, containerItems)

let items = document.querySelectorAll(".item")

var id_processo
var id_timeout
const previous = (user=false) => {
    containerItems.appendChild(items[0])
    items = document.querySelectorAll(".item")
    selecionarBolinha(items, true)
    
    clearInterval(id_processo)
    clearTimeout(id_timeout)
    if (user == false) passarSlide(true)
    else passarSlideTempo()
}

const next = (user=false) => {
    const lastItem = items[items.length - 1]
    containerItems.insertBefore(lastItem, items[0])
    items = document.querySelectorAll(".item")
    selecionarBolinha(items, true)
    
    clearInterval(id_processo)
    clearTimeout(id_timeout)
    if (user == false) passarSlide(true)
    else passarSlideTempo()
}

const buttonLeft = document.querySelector("#button-left")
buttonLeft.addEventListener("click", () => {
    next(true)
})

const buttonRight = document.querySelector("#button-right")
buttonRight.addEventListener("click", () => {
    previous(true)
})

// Adcionando bolinhas do slide
const containerBolinhas = document.querySelector("#container-bolinhas")

const adcionarBolinas = (containerBolinhas, imagens) => {
    imagens.forEach(() => {
        const divBolinha = document.createElement("div")
        divBolinha.classList.add("bolinha")
        containerBolinhas.appendChild(divBolinha)
    })
    containerBolinhas.style.width = `${30 * imagens.length + 20}px`
}

adcionarBolinas(containerBolinhas, images)

var indiceAnterior
const selecionarBolinha = (items, segundaVez=false) => {
    const bolinhas = [...document.querySelectorAll(".bolinha")]
    const indiceAtual = items[0].attributes.id.value
    if(segundaVez){
        bolinhas[indiceAnterior].style.backgroundColor = "transparent"
    }
    bolinhas[indiceAtual].style.backgroundColor = "crimson"
    indiceAnterior = indiceAtual
}

selecionarBolinha(items)

// Adcionando efeito de passar automaticamente o slide
const passarSlide = () => {
    id_processo = setInterval(previous, 3500)
}

const passarSlideTempo = () => {
    id_timeout = setTimeout(passarSlide, 20000)
}

passarSlide()
