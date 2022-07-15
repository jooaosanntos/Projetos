// Comentário Aqui
const botao = document.getElementById("submit")

function estudarImc(dados){
    const imc = (dados["Peso"] / dados["Altura"] ** 2).toFixed(2)
    let rsp = ``
    if (imc < 18.5){
        rsp = `${dados["Nome"]}, seu IMC é ${imc} e você está abaixo do peso`
    }else if (imc < 25){
        rsp = `${dados["Nome"]}, seu IMC é ${imc} e você está com o peso ideal`
    }else if (imc < 30){
        rsp = `${dados["Nome"]}, seu IMC é ${imc} e você está levemente acima do peso`
    }else if (imc < 35){
        rsp = `${dados["Nome"]}, seu IMC é ${imc} e você está com obesidade grau I`
    }else{
        rsp = `${dados["Nome"]}, seu IMC é ${imc} e você está com obesidade grau II`
    }
    return rsp
}

botao.addEventListener("click", (event) => {
    event.preventDefault()
    const dados = {}
    const campos = [...event.target.form.children]
    for(let indice1 = 0; indice1 < campos.length - 1; indice1 ++){
        const inputElabel = [...campos[indice1].children]
        for(let indice2 = 0; indice2 < inputElabel.length; indice2 += 2){
            const valor_input = inputElabel[indice2 + 1].value
            dados[inputElabel[indice2].innerHTML] = isNaN(valor_input) ? valor_input : parseFloat(valor_input)
        }
    }
    const rsp = estudarImc(dados)
    const p_destino = document.getElementById("texto_final")
    p_destino.innerHTML = rsp
})