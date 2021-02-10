function loginOk() {
    formLogin = document.getElementById("usuario-formulario");
    formLogin.remove();
    itemMenu = document.getElementById("login");
    itemMenu.innerText = "Sair";

    itemMenu.addEventListener('click', () => {
        location.reload();
    })
}

enter = document.getElementById('bnt-submit')

enter.addEventListener('click', (event) => {
    const login = {
        email: document.getElementById('email').value,
        password: document.getElementById('senha').value,
    }
    if (login.email == '') {
        alert("O campo e-mail deve ser preenchido");
    } else {
        event.preventDefault();
        const url = new XMLHttpRequest();

        url.open('POST', 'https://reqres.in/api/login', true);
        url.setRequestHeader("Content-type", "application/json");
        url.onreadystatechange = () => {
            if (url.readyState == 4) {
                if (url.status == 200) {
                    loginOk();
                } else {
                    alert(JSON.parse(url.responseText).error);
                }
            }
        }
        url.send(JSON.stringify(login));
    }
});

const categoriaMenu = document.querySelectorAll('.categoriaMenu a');
const relogios = document.querySelectorAll('.relogios section');

function categoriaAtiva(index) {
    if (categoriaMenu[index].getAttribute("class") === 'ativo') {
        categoriaMenu[index].classList.remove('ativo');
        relogios.forEach((relogio) => {
            relogio.classList.add('ativo');
        });
    } else {
        relogios.forEach((relogio) => {
            relogio.classList.remove('ativo');
        });
        categoriaMenu.forEach((categoria) => {
            categoria.classList.remove('ativo');
        });
        categoriaMenu[index].classList.add('ativo');
        relogios[index].classList.add('ativo');
    }
}

relogios.forEach((relogio) => {
    relogio.classList.add('ativo');
});

categoriaMenu.forEach((categoria, index) => {
    categoria.addEventListener('click', () => {
        categoriaAtiva(index);
    })

});

const relogiosItem = document.querySelectorAll('.relogios-item');
relogiosItem.forEach((relogio) => {
    relogio.addEventListener('click', () => {
        relogio.classList.toggle('clicado')
    })

});

const produtosItemParaOcultar = document.getElementsByClassName('olho-ocultar');
produtosItemOcultar = [...produtosItemParaOcultar];
produtosItemOcultar.forEach((ocultar, index) => {

    ocultar.addEventListener('click', () => {
        relogiosItem[index].remove()
        relogios.forEach((relogio) => {
            const container = relogio.getElementsByClassName('relogios-item')

            if (container.length === 0) {

                var tag = document.createElement("h2");
                var text = document.createTextNode("Os relogios acabaram, infelizmente você apagou todos!");
                tag.appendChild(text);
                relogio.appendChild(tag);
            }

        });
    })

});