// Função para criar/armazenar um cookie com nome, valor e tempo de expiração em dias
function setCookie(nome, valor, dias) {
    // Cria um novo objeto Date com a data/hora atual
    let data = new Date();
    // Define o tempo de expiração adicionando dias (convertendo para milissegundos)
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));

    // Cria uma string com a data de expiração em formato UTC
    let expira = "expires=" + data.toUTCString();

    // Atribui o cookie ao documento com nome, valor, data de expiração e caminho
    document.cookie =
        nome + "=" + valor + ";" +
        expira + ";path=/";
}

// Função para ler/recuperar o valor de um cookie pelo seu nome
function getCookie(nome) {

    // Cria uma string do nome do cookie com o sinal de igual para busca
    let nomeCookie = nome + "=";
    // Obtém todos os cookies do documento e divide em um array
    let cookies = document.cookie.split(";");

    // Faz um loop por todos os cookies armazenados
    for(let i = 0; i < cookies.length; i++){

        // Remove espaços em branco do início e fim de cada cookie
        let c = cookies[i].trim();

        // Verifica se o cookie atual começa com o nome procurado
        if(c.indexOf(nomeCookie) === 0){
            // Retorna apenas o valor do cookie removendo o nome e o "="
            return c.substring(nomeCookie.length);
        }
    }

    // Retorna string vazia se o cookie não foi encontrado
    return "";
}

// Seleciona o elemento do botão de tema pelo seu ID
const botao = document.getElementById("temaBtn");

// Função que executa quando a página termina de carregar
window.onload = function(){

    // Recupera o valor do cookie "tema" que foi salvo anteriormente
    let tema = getCookie("tema");

    // Se o tema salvo era "escuro", aplica a classe dark e muda o texto do botão
    if(tema === "escuro"){
        // Adiciona a classe "dark" ao body para aplicar estilos do modo escuro
        document.body.classList.add("dark");
        // Muda o texto do botão para mostrar a opção de modo claro
        botao.textContent = "☀️ Modo Claro";
    }
}

// Adiciona um ouvinte de evento de clique ao botão de tema
botao.addEventListener("click", () => {

    // Alterna a classe "dark" no body (adiciona se não existe, remove se existe)
    document.body.classList.toggle("dark");

    // Verifica se o body tem a classe "dark" (modo escuro está ativo)
    if(document.body.classList.contains("dark")){

        // Cria um cookie com tema "escuro" válido por 30 dias
        setCookie("tema", "escuro", 30);
        // Muda o texto do botão para a opção de modo claro
        botao.textContent = "☀️ Modo Claro";

    }else{

        // Cria um cookie com tema "claro" válido por 30 dias
        setCookie("tema", "claro", 30);
        // Muda o texto do botão para a opção de modo escuro
        botao.textContent = "🌙 Modo Escuro";
    }
});