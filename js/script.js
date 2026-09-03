// Elementos utilizados no site
const cabecalho = document.getElementById("cabecalho");
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");
const linksMenu = document.querySelectorAll(".menu-link");
const botaoVoltarTopo = document.getElementById("voltar-topo");
const elementosReveal = document.querySelectorAll(".reveal");
const textoDinamico = document.getElementById("texto-dinamico");


// Abrir e fechar menu no celular
botaoMenu.addEventListener("click", () => {
    const menuEstaAberto = menu.classList.toggle("aberto");

    botaoMenu.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
});


// Fechar o menu quando um link for selecionado
linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        botaoMenu.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
    });
});


// Mudar o cabeçalho e mostrar botão de voltar ao topo
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        cabecalho.classList.add("rolado");
    } else {
        cabecalho.classList.remove("rolado");
    }

    if (window.scrollY > 500) {
        botaoVoltarTopo.classList.add("visivel");
    } else {
        botaoVoltarTopo.classList.remove("visivel");
    }

    atualizarLinkAtivo();
});


// Voltar ao topo
botaoVoltarTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Destacar no menu a seção que está aparecendo
function atualizarLinkAtivo() {
    const secoes = document.querySelectorAll("main section");
    let idSecaoAtual = "inicio";

    secoes.forEach((secao) => {
        const topoSecao = secao.offsetTop - 150;

        if (window.scrollY >= topoSecao) {
            idSecaoAtual = secao.getAttribute("id");
        }
    });

    linksMenu.forEach((link) => {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === `#${idSecaoAtual}`) {
            link.classList.add("ativo");
        }
    });
}


// Animação dos elementos ao aparecerem na tela
const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

elementosReveal.forEach((elemento) => {
    observador.observe(elemento);
});


// Texto digitado automaticamente
const palavras = [
    "Desenvolvimento Web",
    "Redes de Computadores",
    "Segurança da Informação"
];

let indicePalavra = 0;
let indiceLetra = 0;
let apagando = false;

function escreverTexto() {
    const palavraAtual = palavras[indicePalavra];

    if (!apagando) {
        indiceLetra++;
        textoDinamico.textContent = palavraAtual.substring(0, indiceLetra);

        if (indiceLetra === palavraAtual.length) {
            apagando = true;
            setTimeout(escreverTexto, 1600);
            return;
        }
    } else {
        indiceLetra--;
        textoDinamico.textContent = palavraAtual.substring(0, indiceLetra);

        if (indiceLetra === 0) {
            apagando = false;
            indicePalavra = (indicePalavra + 1) % palavras.length;
        }
    }

    const velocidade = apagando ? 45 : 85;
    setTimeout(escreverTexto, velocidade);
}

escreverTexto();


// Colocar o ano atual automaticamente no rodapé
const anoAtual = document.getElementById("ano-atual");
anoAtual.textContent = new Date().getFullYear();
// Luz azul acompanhando o mouse

const luzMouse = document.getElementById("luz-mouse");

document.addEventListener("mousemove", (evento) => {
    luzMouse.style.left = `${evento.clientX}px`;
    luzMouse.style.top = `${evento.clientY}px`;
    luzMouse.classList.add("ativa");
});

document.addEventListener("mouseleave", () => {
    luzMouse.classList.remove("ativa");
});
// Alternar entre tema claro e escuro

const botaoTema = document.getElementById("botao-tema");
const pagina = document.documentElement;

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo) {
    aplicarTema(temaSalvo);
}

botaoTema.addEventListener("click", () => {
    const temaAtual = pagina.getAttribute("data-theme");

    const novoTema =
        temaAtual === "escuro" ? "claro" : "escuro";

    aplicarTema(novoTema);
    localStorage.setItem("tema", novoTema);
});

function aplicarTema(tema) {
    pagina.setAttribute("data-theme", tema);

    if (tema === "claro") {
        botaoTema.textContent = "🌙";
        botaoTema.setAttribute(
            "aria-label",
            "Ativar tema escuro"
        );
    } else {
        botaoTema.textContent = "☀️";
        botaoTema.setAttribute(
            "aria-label",
            "Ativar tema claro"
        );
    }
}
// Carrossel dos projetos

const carrosselProjetos = document.getElementById(
    "carrossel-projetos"
);

const botaoProjetoAnterior = document.getElementById(
    "projeto-anterior"
);

const botaoProximoProjeto = document.getElementById(
    "proximo-projeto"
);

function calcularDistanciaProjeto() {
    const primeiroCard =
        carrosselProjetos.querySelector(".projeto-card");

    const estilosCarrossel =
        window.getComputedStyle(carrosselProjetos);

    const espacoEntreCards =
        parseFloat(estilosCarrossel.gap) || 0;

    return primeiroCard.offsetWidth + espacoEntreCards;
}

botaoProximoProjeto.addEventListener("click", () => {
    carrosselProjetos.scrollBy({
        left: calcularDistanciaProjeto(),
        behavior: "smooth"
    });
});

botaoProjetoAnterior.addEventListener("click", () => {
    carrosselProjetos.scrollBy({
        left: -calcularDistanciaProjeto(),
        behavior: "smooth"
    });
});