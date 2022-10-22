/**
 * Trecho de código responsável por fazer o menu de criação de task aparecer
 */
const mostrarMenuTask = () => $(".menu-task").css("display", "block")
$("#adicionar-task").on("click", () => {
    mostrarMenuTask()
})

/**
 * Trecho de código que gera um id para uma task
 */
/**
 * Função que gera uma id aleatório para uma task
 */
const gerarID = () => "jpTask-" + Math.floor(Date.now() * Math.random()).toString(36) +
    Math.floor(Date.now() * Math.random()).toString(36)

/**
 * Trecho de código responsável por fazer o menu de criação de task desaparecer
 */
const fecharMenuTask = () => $(".menu-task").css("display", "none")

$("#close-menu-task").on("click", fecharMenuTask)

const ehMobile = () => $(window).width() <= 1000

function setChecked(id, valor) {
    const taskInfo = JSON.parse(localStorage.getItem(id))
    taskInfo["checked"] = valor
    localStorage.setItem(id, JSON.stringify(taskInfo))
}

function toggleChecked(task) {
    task.on("click", function(event){
        const id = task.attr("id")
        if (task.hasClass("checked")) {
            task.removeClass("checked")
            task.addClass("no-checked")
            setChecked(id, "false")
        } else {
            task.removeClass("no-checked")
            task.addClass("checked")
            setChecked(id, "true")
        }  
    })
}

/**
 * Trecho de código responsável por criar uma task nova
 * */
function criarTask(titulo, conteudo, checked = "false", id = gerarID()) {
    const tituloElem = $("<h2>").text(titulo)
    const conteudoElem = $("<p>").text(conteudo)
    const task = $("<div>").addClass("task").append(tituloElem, conteudoElem)
    if (checked == "true") {
        task.addClass("checked")
    }
    if (ehMobile()){
        toggleChecked(task)
    }
    task.get(0).draggable = true
    task.attr("id", id)

    task.get(0).ondragstart = event => {
        event.dataTransfer.setData("item-id", event.target.id)
    }
    return task
}

/**
 * Trecho de código responsável por adicionar uma nova task às tasks pendentes
 */
$("#menu-task-adicionar").on("click", (event) => {
    event.preventDefault()

    const titulo = $("#titulo-task").val()
    $("#titulo-task").val("")
    const conteudo = $("#conteudo-task").val()
    $("#conteudo-task").val("")
    const task = criarTask(titulo, conteudo)
    $(".container-left").append(task)

    const id = $(task).attr("id")
    const taskInfo = JSON.stringify({ title: titulo, content: conteudo, checked: "false" })
    localStorage.setItem(id, taskInfo)

    fecharMenuTask()
})

/**
 * Trecho de código responsável por setar o atributo draggable nas tasks e configurar o evento ondragstart
 */
$(".task").each((index, task) => {
    const taskJq = $(task)
    $(taskJq).attr("draggable", true)
    taskJq.attr("id", taskJq.attr("id") ? taskJq.attr("id") : gerarID())

    task.ondragstart = function (event) {
        event.dataTransfer.setData("item-id", $(this).attr("id"))
    }
})

/**
 * Trecho de código responsável pela funcionalidade de arrastar e soltar tasks
 */
$(".dropzone").each((index, dropzone) => {
    /**
     * Trecho de código responsável por fazer o processo de adição de background nas lixeiras
     * obs: é importante manter o preventDefault, ou o ondrop não funcionará corretamente
     */
    $(dropzone).on("dragover", function (event) {
        event.preventDefault()
        const dropzone = $(this)
        
        if (dropzone.hasClass("trash-left")) {
            dropzone.css("background-image", "linear-gradient(to right, rgb(202, 1, 1), transparent)")
        } else if (dropzone.hasClass("trash-right")) {
            dropzone.css("background-image", "linear-gradient(to left, rgb(202, 1, 1), transparent)")
        }
    })
    
    /**
     * Um dos trechos de código responsável por fazer o processo de remoção de background das lixeiras
     */
    $(dropzone).on("dragleave", function (event) {
        event.preventDefault()
        const dropzone = $(this)
        if (dropzone.hasClass("trash")) {
            dropzone.css("background-image", "linear-gradient(to left, transparent, transparent)")
        }
    })

    /**
     * Trecho de código responsável por adicionar elementos às dropzones
     * E um dos trechos de código responsável por fazer o processo de remoção de background das lixeiras
     */
    dropzone.ondrop = function (event) {
        const dropzone = $(this)

        const id = event.dataTransfer.getData("item-id")
        const element = $("#" + id)
        dropzone.append(element)

        if (dropzone.hasClass("trash")) {
            element.remove()
            dropzone.css("background-image", "linear-gradient(to left, transparent, transparent)")
            localStorage.removeItem(id)
        } else if (dropzone.hasClass("container-left")) {
            element.addClass("no-checked")
            element.removeClass("checked")
            setChecked(id, "false")
        } else if (dropzone.hasClass("container-right")) {
            element.removeClass("no-checked")
            element.addClass("checked")
            setChecked(id, "true")
        }
        
    }
})

/**
 * Trecho de código que obtém as tasks salvas no localStorage e adiciona elas à página
 */
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.split("-")[0] == "jpTask") {
        const taskInfo = JSON.parse(localStorage.getItem(key))
        const task = criarTask(taskInfo.title, taskInfo.content, taskInfo.checked, key)
        if (ehMobile()) {
            $(".container-left").append(task)
        } else if (taskInfo["checked"] == "true") {
            $(".container-right").append(task)
        } else if (taskInfo["checked"] == "false") {
            $(".container-left").append(task)
        }
    }
}

const removerContainerLegend = () => $(".container-legend").css("display", "none")

var transicaoMenor = false
var transicaoMaior = false

if (ehMobile()) {
    removerContainerLegend()
    transicaoMaior = true
} else {
    transicaoMenor = true
}

$(window).on("resize", function (event) {
    if (ehMobile() && transicaoMenor) {
        transicaoMenor = false
        transicaoMaior = true
        removerContainerLegend()
        $(".task").each(function(index, task) {
            toggleChecked($(task))
        })
        const taksRight = $(".container-right").children()
        $(".container-left").append(taksRight)
    } else if (!ehMobile() && transicaoMaior) {
        transicaoMaior = false
        transicaoMenor = true
        $(".task").off("click")
        const checkedTaks = $(".checked")
        $(".container-right").append(checkedTaks)
    }
})
