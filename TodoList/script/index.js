
// Fazer menu de criação de task aparecer
$("#adicionar-task").on("click", () => {
    $(".menu-task").css("display", "block")
})

// Trecho de código que gera um id para uma task
const randomValue = {
    _id: 0,
    get id(){
        return this._id++
    }
}

const gerarId = () => "task-" + randomValue.id

// Fazer menu de criação de task desaparecer
const fecharMenuTask = () => $(".menu-task").css("display", "none")

$("#close-menu-task").on("click", fecharMenuTask)

// Criar uma task nova
function criarTask(titulo, conteudo){
    const tituloElem = $("<h2>").text(titulo)
    const conteudoElem = $("<p>").text(conteudo)
    const div = $("<div>").addClass("task").append(tituloElem, conteudoElem)
    div.get(0).draggable = true
    div.attr("id", gerarId())
    
    div.get(0).ondragstart = event => {
        event.dataTransfer.setData("item-id", event.target.id)
    }
    return div
}

$("#menu-task-adicionar").on("click", (event) => {
    event.preventDefault()

    const titulo = $("#titulo-task").val()
    $("#titulo-task").val("")
    const conteudo = $("#conteudo-task").val()
    $("#conteudo-task").val("")
    $(".container-left").append(criarTask(titulo, conteudo))

    fecharMenuTask()
})

$(".task").each((index, task) => {
    task.draggable = true
    task.id = task.id || gerarId()

    task.ondragstart = event => {
        event.dataTransfer.setData("item-id", event.target.id)
    }
})

$(".dropzone").each((index, dropzone) => {
    dropzone.ondragover = event => event.preventDefault()
    dropzone.ondrop = function(event){
        const id = event.dataTransfer.getData("item-id")
        dropzone.appendChild(document.getElementById(id))
    }
})
