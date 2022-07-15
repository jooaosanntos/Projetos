const deletarTask = (task) => {
    const array = JSON.parse(localStorage.getItem(0))

    console.log(task)
    array.splice(array.indexOf(task), 1)

    localStorage.setItem(0, JSON.stringify(array))
}

const removerTask = (event) => {
    const elemento = event.target.parentElement.parentElement
    deletarTask(event.target.parentElement.previousSibling.innerHTML)

    const containerTasks = document.querySelector(".container-tasks")
    containerTasks.removeChild(elemento)
}

const concluirTask = (event) => {
    const elemento = event.target
    let elemento1
    let elemento2
    let ehCheckbox = false
    if (elemento.classList.contains("task-completed")) {
        elemento1 = elemento.parentElement.nextSibling
        elemento2 = elemento
        ehCheckbox = true
    } else if (elemento.classList.contains("task-text")) {
        elemento1 = elemento
        elemento2 = elemento.previousSibling.children[0]
    } else if (elemento.classList.contains("checkbox-wrapper")) {
        elemento1 = elemento.nextSibling
        elemento2 = elemento.children[0]
    } else if (elemento.classList.contains("button-wrapper")) {
        elemento1 = elemento.previousSibling
        elemento2 = elemento.previousSibling.previousSibling.children[0]
    } else return

    if (!ehCheckbox) {
        if (elemento2.checked) {
            elemento2.checked = false
            elemento1.style.textDecoration = "none"
        } else {
            elemento2.checked = true
            elemento1.style.textDecoration = "line-through"
        }
    } else {
        if (elemento2.checked) elemento1.style.textDecoration = "line-through"
        else elemento1.style.textDecoration = "none"
    }
}

const salvarTask = (task) => {
    const array = JSON.parse(localStorage.getItem(0))
    
    array.push(task.children[1].innerHTML)
    
    localStorage.setItem(0, JSON.stringify(array))
}

const jaExiste = (texto) => {
    const array  = JSON.parse(localStorage.getItem(0))
    if (array.includes(texto)) return true
    return false
}

const adcionarTask = (texto, inicio=false) => {
    if (!inicio && jaExiste(texto)) return
    // Criar Task
    const task = document.createElement("div")
    task.classList.add("task-element")
    task.classList.add("task")
    
    // Criar e adcionar checkbox a um wrapper
    const checkboxWrapper = document.createElement("div")
    checkboxWrapper.classList.add("checkbox-wrapper")
    
    const checkbox = document.createElement("input")
    
    checkbox.classList.add("task-completed")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("name", "task-completed")
    
    checkboxWrapper.appendChild(checkbox)
    
    // Criar div de texto
    const textoTask = document.createElement("div")
    textoTask.classList.add("task-text")
    textoTask.innerHTML = texto
    
    // Criar e adcionar button a um wrapper
    const buttonWrapper = document.createElement("div")
    buttonWrapper.classList.add("button-wrapper")
    
    const button = document.createElement("button")
    button.classList.add("delete-task")
    button.innerHTML = "X"
    button.addEventListener("click", removerTask)
    
    buttonWrapper.appendChild(button)
    
    // Adcionar tudo à página
    task.appendChild(checkboxWrapper)
    task.appendChild(textoTask)
    task.appendChild(buttonWrapper)
    
    task.addEventListener("click", concluirTask)
    document.querySelector(".container-tasks").appendChild(task)

    if(!inicio) salvarTask(task)
}

if (localStorage.getItem(0) == null) {
    const arrayTask = []
    localStorage.setItem(0, JSON.stringify(arrayTask))
}else{
    const array = JSON.parse(localStorage.getItem(0))
    array.forEach(texto => adcionarTask(texto, true))
}

const verificaDigitacao = (event) => {
    if (event.key == "Enter") {
        const valorInput = event.target.value
        event.target.value = ""
        if (valorInput.length > 0) adcionarTask(valorInput)
    }
}

const input = document.querySelector("#add-task")
input.addEventListener("keyup", verificaDigitacao)
