/**
 * Função que verifica se uma task já está salva no localStorage
 * @param {*} task 
 * @returns {boolean} true/false
 */
function taskJaSalva(task) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == task.id){
            return true
        }
    }

    return false
}

/**
 * Função que salva uma task no localStorage
 */
function salvarTaskLocalStora(task) {
    if (!taskJaSalva(task)){
        localStorage.setItem(task.id, JSON.stringify({
            id: task.id,
            conteudo: task.children[1].innerHTML,
            concluida: task.getAttribute("checked-task")
        }))
    }
}

/**
 * Função que gera uma id aleatório para uma task
 */
const gerarID = () => Math.floor(Date.now() * Math.random()).toString(36) +
    Math.floor(Date.now() * Math.random()).toString(36)

/**
 * Função que recebe uma task e marca ela ou não a depender do valor de seu atributo checked-task
 * @param {*} task 
 */
function concluirTask(task) {
    const input = task.children[0].children[0]
    const divTexto = task.children[1]

    if (task.getAttribute("checked-task") == "true") {
        input.checked = false
        divTexto.style.textDecoration = "none"
        task.setAttribute("checked-task", "false")

        const objTask = JSON.parse(localStorage.getItem(task.id))
        objTask["concluida"] = "false"
        localStorage.setItem(task.id, JSON.stringify(objTask))
    }
    else {
        input.checked = true
        divTexto.style.textDecoration = "line-through"
        task.setAttribute("checked-task", "true")

        const objTask = JSON.parse(localStorage.getItem(task.id))
        objTask["concluida"] = "true"
        localStorage.setItem(task.id, JSON.stringify(objTask))
    }
}

/**
 * Função que remove uma task a partir do evento passado
 * @param {*} event 
 */
function removerTask(event) {
    const button = event.target
    const task = button.parentElement.parentElement

    const containerTasks = document.querySelector(".container-tasks")
    containerTasks.removeChild(task)
    localStorage.removeItem(task.id)
}

/**
 * Função responsável por criar uma task a partir dos dados passados e adicionar ela à página
 * @param {Object} dadosTask 
 */
function adicionarTask(dadosTask) {
    // Criar Task
    const task = document.createElement("div")
    task.setAttribute("id", dadosTask.id)
    task.classList.add("task-element")
    task.classList.add("task")
    task.setAttribute("checked-task", "false")
    document.querySelector(".container-tasks").appendChild(task)

    // Criar e adicionar checkbox a um wrapper
    const checkboxWrapper = document.createElement("div")
    checkboxWrapper.classList.add("checkbox-wrapper")

    const checkbox = document.createElement("input")

    checkbox.classList.add("task-completed")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("name", "task-completed")

    checkboxWrapper.appendChild(checkbox)
    task.appendChild(checkboxWrapper)

    // Criar div de texto
    const textoTask = document.createElement("div")
    textoTask.classList.add("task-text")
    textoTask.innerHTML = dadosTask.conteudo
    task.appendChild(textoTask)

    // Criar e adicionar button a um wrapper
    const buttonWrapper = document.createElement("div")
    buttonWrapper.classList.add("button-wrapper")

    const button = document.createElement("button")
    button.classList.add("delete-task")
    button.innerHTML = "X"
    button.addEventListener("click", removerTask)

    buttonWrapper.appendChild(button)
    task.appendChild(buttonWrapper)

    if (dadosTask.concluida == "true") concluirTask(task)
    task.addEventListener("click", function (event) {
        concluirTask(this)
    })

    salvarTaskLocalStora(task)
}

/**
 * Função responsável por pegar dados do usuário para criação de uma nova task. Os dados são obtidos a partir do input
 */
const inputTask = document.getElementById("add-task")
inputTask.addEventListener("keyup", (event) => {
    if (event.key.toLocaleLowerCase() == "enter") {
        const input = event.target
        adicionarTask({
            id: gerarID(),
            conteudo: input.value,
            concluida: "false"
        })
        input.value = ""
    }
})

/**
 * Trecho de código que adiciona as tasks pré-existentes na página
 */
for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i)
    const dadosTask = JSON.parse(localStorage.getItem(key))
    adicionarTask(dadosTask)
}
