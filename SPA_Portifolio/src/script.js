const hamburguer = document.querySelector('.hamburguer')

hamburguer.addEventListener('click', () => {
    document.querySelector('.container').classList.toggle("show-menu");
    document.querySelector('.container .hamburguer span').classList.toggle("mostrar");
})