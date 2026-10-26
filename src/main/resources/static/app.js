// app.js

// Variáveis globais
let corpoTabela, paragrafoMensagem, txtNome, txtPreco, txtId;
let btnNovo, btnSalvar, btnApagar, btnCancelar, tabelaProdutos, tabelaFormulario;
let criandoNovoProduto = false;

// 1. Intercepta cliques nos links para não recarregar a página
document.body.addEventListener('click', e => {
    if (e.target.matches('.nav-link')) {
        e.preventDefault();
        const url = e.target.getAttribute('href');
        window.history.pushState({}, '', url); // Muda a URL no navegador
        router(); // Chama o roteador para renderizar a tela
    }
});

// 2. Escuta o botão "Voltar" e "Avançar" do navegador
window.addEventListener('popstate', router);

// 3. Roteador Principal
function router() {
    const appContainer = document.querySelector('#app-container');
    // Pega o caminho atual da URL (ex: /produtos)
    const path = window.location.pathname; 
    
    appContainer.innerHTML = ''; // Limpa a tela

    if (path === '/' || path === '/index.html') {
        const template = document.getElementById('tpl-home');
        appContainer.appendChild(template.content.cloneNode(true));
        
    } else if (path === '/produtos') {
        const template = document.getElementById('tpl-produtos');
        appContainer.appendChild(template.content.cloneNode(true));
        
        // Como o HTML acabou de ser injetado, precisamos mapear os elementos
        mapearElementosProdutos();
        inicializarProdutos();
        
    } else {
        appContainer.innerHTML = '<h1>404 - Página não encontrada</h1>';
    }
}

// Mapeia os elementos do DOM para as variáveis
function mapearElementosProdutos() {
    tabelaProdutos = document.querySelector('#tabelaProdutos');
    tabelaFormulario = document.querySelector('#tabelaFormulario');
    corpoTabela = document.querySelector('#corpoTabelaProdutos');
    paragrafoMensagem = document.querySelector('#paragrafoMensagem');
    txtNome = document.querySelector('#txtNome');
    txtPreco = document.querySelector('#txtPreco');
    txtId = document.querySelector('#txtId');
    
    btnNovo = document.querySelector('#btnNovo');
    btnSalvar = document.querySelector('#btnSalvar');
    btnApagar = document.querySelector('#btnApagar');
    btnCancelar = document.querySelector('#btnCancelar');
}

// ---------------------------------------------------------
// LÓGICA DE PRODUTOS (Adaptada da sua lógica de professores)
// ---------------------------------------------------------

function inicializarProdutos() {
    criandoNovoProduto = false;
    paragrafoMensagem.textContent = 'Pressione o botão Novo ou selecione um produto da lista:'
    txtId.value = '';
    txtNome.value = '';
    txtPreco.value = '';
    txtNome.disabled = true;
    txtPreco.disabled = true;
    
    btnNovo.disabled = false;
    btnSalvar.disabled = true;
    btnApagar.disabled = true;
    btnCancelar.disabled = true;
    
    tabelaFormulario.style.display = 'none';
    tabelaProdutos.style.display = 'inline';
    
    listarTodosProdutos();            
}

function listarTodosProdutos() {
    const errorHandler = function(error) { 
        paragrafoMensagem.textContent = "Erro ao listar produtos (código " + error.message + ")";
    }
    // Supondo que você criou asyncLerProds no rest.js
    asyncLerProds(preencherTabela, errorHandler);
}

function preencherTabela(produtos) {
    corpoTabela.innerHTML = "";
    var n = produtos.length;
    for (var i = 0; i < n; i++) {
        let p = produtos[i];
        let linha = corpoTabela.insertRow();
        let celulaId = linha.insertCell();
        let celulaNome = linha.insertCell();
        let celulaPreco = linha.insertCell();
        
        let alink = document.createElement('a');
        alink.textContent = p.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function() { selecionarProduto(p.id); };
        celulaId.appendChild(alink);
        
        celulaNome.textContent = p.nome;
        celulaPreco.textContent = "R$ " + p.preco.toFixed(2);
    }
}

function selecionarProduto(id) {
    criandoNovoProduto = false;
    const errorHandler = function(error) { 
        paragrafoMensagem.textContent = "Erro ao selecionar produto (código " + error.message + ")";
    }
    asyncLerProdById(id, preencherFormulario, errorHandler);				
}
    
function preencherFormulario(produto) {
    paragrafoMensagem.textContent = 'Altere e salve os dados do produto, ou apague o registro.'
    txtId.value = produto.id;
    txtNome.value = produto.nome;
    txtPreco.value = produto.preco;
    
    txtNome.disabled = false;
    txtPreco.disabled = false;
    
    btnNovo.disabled = true;
    btnSalvar.disabled = false;
    btnApagar.disabled = false;
    btnCancelar.disabled = false;  
    
    tabelaFormulario.style.display = 'inline';
    tabelaProdutos.style.display = 'none';
}

function novoProduto() {
    paragrafoMensagem.textContent = 'Preencha os dados do novo produto...';
    criandoNovoProduto = true;
    
    txtId.value = '';
    txtNome.value = '';
    txtPreco.value = '';
    
    txtNome.disabled = false;
    txtPreco.disabled = false;
    
    btnNovo.disabled = true;
    btnSalvar.disabled = false;
    btnApagar.disabled = true;
    btnCancelar.disabled = false;
    
    tabelaFormulario.style.display = 'inline';
    tabelaProdutos.style.display = 'none';
}

function salvarProduto() {
    if (criandoNovoProduto) {
        const dados = { 'nome': txtNome.value, 'preco': parseFloat(txtPreco.value) };
        asyncCriarProd(dados, inicializarProdutos, (err) => paragrafoMensagem.textContent = "Erro: " + err.message);
    } else {
        const dados = { 'id': txtId.value, 'nome': txtNome.value, 'preco': parseFloat(txtPreco.value) };
        asyncAlterarProd(dados, inicializarProdutos, (err) => paragrafoMensagem.textContent = "Erro: " + err.message);
    }
}

function cancelarEdicao() { inicializarProdutos(); }

function apagarProduto() {
    asyncApagarProd(txtId.value, inicializarProdutos, (err) => paragrafoMensagem.textContent = "Erro: " + err.message);
}

// Inicializa o roteador ao carregar a página
window.addEventListener('DOMContentLoaded', router);