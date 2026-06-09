// Criar cookie
function setCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));

    let expira = "expires=" + data.toUTCString();

    document.cookie =
        nome + "=" + valor + ";" +
        expira + ";path=/";
}

// Ler cookie
function getCookie(nome) {

    let nomeCookie = nome + "=";
    let cookies = document.cookie.split(";");

    for(let i = 0; i < cookies.length; i++){

        let c = cookies[i].trim();

        if(c.indexOf(nomeCookie) === 0){
            return c.substring(nomeCookie.length);
        }
    }

    return "";
}

const botao = document.getElementById("temaBtn");

// Carregar preferência salva
window.onload = function(){

    let tema = getCookie("tema");

    if(tema === "escuro"){
        document.body.classList.add("dark");
        botao.textContent = "☀️ Modo Claro";
    }
}

// Trocar tema
botao.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        setCookie("tema", "escuro", 30);
        botao.textContent = "☀️ Modo Claro";

    }else{

        setCookie("tema", "claro", 30);
        botao.textContent = "🌙 Modo Escuro";
    }
});