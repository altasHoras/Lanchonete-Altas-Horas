// Slider de Promoções
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
}

// Autoplay do Slider
setInterval(() => {
    changeSlide(1);
}, 5000);

// Variável para contar produtos no carrinho
let contadorCarrinho = 0;

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nomeProduto, preco) {
    // Solicita a observação do usuário
    const observacao = prompt(`Digite uma observação para ${nomeProduto}:`);
    
    contadorCarrinho++;
    document.getElementById("contador-carrinho").innerText = contadorCarrinho;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
        itemExistente.observacoes.push(observacao); // Adiciona a nova observação
    } else {
        carrinho.push({ nome: nomeProduto, preco, quantidade: 1, observacoes: [observacao] }); // Armazena a observação
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nomeProduto} foi adicionado ao carrinho!`);
    atualizarCarrinho();
}

// Atualiza o carrinho
function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    lista.innerHTML = ''; // Limpa a lista de itens
    let total = 0;
    contadorCarrinho = 0; // Resetando o contador para recalcular

    // Cria a estrutura da tabela
    const tabela = document.createElement('table');
    tabela.classList.add('tabela-carrinho');
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    lista.appendChild(tabela);
    const tbody = tabela.querySelector('tbody');

    // Popula a tabela com os itens do carrinho
    carrinho.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>
                <button onclick="ajustarQuantidade(${index}, -1)">-</button>
                <span>${item.quantidade}</span>
                <button onclick="ajustarQuantidade(${index}, 1)">+</button>
            </td>
            <td>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            </td>
        `;
        tbody.appendChild(tr);
        total += item.preco * item.quantidade;
        contadorCarrinho += item.quantidade; // Contando a quantidade total de produtos
    });

    // Atualiza o valor total no HTML
    document.getElementById('valor-total').textContent = total.toFixed(2);
    document.getElementById("contador-carrinho").innerText = contadorCarrinho; // Atualiza contador visível
}

// Inicializa a atualização do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho(); // Atualiza o carrinho ao carregar a página
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function ajustarQuantidade(index, ajuste) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho[index].quantidade + ajuste > 0) {
        carrinho[index].quantidade += ajuste;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}

// Finalizando compra
document.getElementById('btn-finalizar').addEventListener('click', () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert("O carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        return;
    }
    alert("Compra finalizada!");
    carrinho = []; // Limpa o carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    contadorCarrinho = 0;
    document.getElementById("contador-carrinho").innerText = contadorCarrinho; // Atualiza contador visível
    atualizarCarrinho();
});

function enviarMensagem(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Coleta os valores dos campos
    var nome = document.getElementById('nome').value;
    var mensagem = document.getElementById('mensagem').value;

    // Define o número de WhatsApp da lanchonete (inclua o código do país e da área)
    var telefone = "+5511946360315";  // Substitua pelo número da lanchonete

    // Monta o texto da mensagem
    var texto = `Olá, meu nome é _${nome}_. \nMinha mensagem: \n${mensagem}`;

    // Codifica a URL para o WhatsApp
    var url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(texto)}`;

    // Redireciona para o WhatsApp
    window.open(url, '_blank');
}
