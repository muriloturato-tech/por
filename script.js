/* ===== Menu responsivo ===== */
const botaoMenu = document.querySelector("#botaoMenu");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
    botaoMenu.textContent = menu.classList.contains("aberto") ? "✕" : "☰";
  });
}

/* ===== Marcar link ativo no menu ===== */
function marcarLinkAtivo() {
  const paginaAtual = window.location.pathname.split("/").pop() || "sobre.html";
  const links = document.querySelectorAll(".menu a");

  links.forEach(function (link) {
    if (link.getAttribute("href") === paginaAtual) {
      link.classList.add("ativo");
    }
  });
}
marcarLinkAtivo();

/* ===== Tema claro / escuro (salvo no navegador) ===== */
const botaoTema = document.querySelector("#botaoTema");

function aplicarTema(tema) {
  document.body.classList.toggle("tema-claro", tema === "claro");
  if (botaoTema) {
    botaoTema.textContent = tema === "claro" ? "🌙" : "☀️";
  }
}

function lerTemaSalvo() {
  try {
    return localStorage.getItem("tema") || "escuro";
  } catch (erro) {
    return "escuro";
  }
}

aplicarTema(lerTemaSalvo());

if (botaoTema) {
  botaoTema.addEventListener("click", function () {
    const novoTema = document.body.classList.contains("tema-claro") ? "escuro" : "claro";
    try {
      localStorage.setItem("tema", novoTema);
    } catch (erro) {
      /* sem armazenamento disponível: o tema vale só nesta página */
    }
    aplicarTema(novoTema);
  });
}

/* ===== Ano automático no rodapé ===== */
const anoRodape = document.querySelector("#anoAtual");
if (anoRodape) {
  anoRodape.textContent = new Date().getFullYear();
}

/* ===== Revelar elementos ao rolar a página ===== */
const elementosRevelar = document.querySelectorAll(".revelar");

const observadorRevelar = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
}, { threshold: 0.15 });

elementosRevelar.forEach(function (elemento) {
  observadorRevelar.observe(elemento);
});

/* ===== Validação do formulário de contato ===== */
const formulario = document.querySelector("#formContato");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    const retorno = document.querySelector("#retornoForm");

    retorno.className = "mensagem-form";

    if (nome === "" || email === "" || mensagem === "") {
      retorno.textContent = "Preencha todos os campos.";
      retorno.classList.add("mensagem-form--erro");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      retorno.textContent = "Digite um e-mail válido.";
      retorno.classList.add("mensagem-form--erro");
      return;
    }

    retorno.textContent = "Obrigado, " + nome + "! Sua mensagem foi enviada com sucesso.";
    retorno.classList.add("mensagem-form--sucesso");
    formulario.reset();
  });
}

/* ===== Barra de progresso de rolagem (criada pelo JS) ===== */
function criarBarraProgresso() {
  const barra = document.createElement("div");
  barra.classList.add("progresso");
  document.body.prepend(barra);

  window.addEventListener("scroll", function () {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    barra.style.width = porcentagem + "%";
  });
}
criarBarraProgresso();

/* ===== Botão voltar ao topo ===== */
const botaoTopo = document.querySelector("#botaoTopo");

if (botaoTopo) {
  window.addEventListener("scroll", function () {
    botaoTopo.classList.toggle("visivel", window.scrollY > 300);
  });

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
} 