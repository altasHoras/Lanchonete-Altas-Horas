// Função para atualizar o carrinho

function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    lista.innerHTML = ''; // Limpa a lista de itens
    let total = 0;

    // Cria a estrutura da tabela
    const tabela = document.createElement('table');
    tabela.id = 'tabela-carrinho'; // Defina o ID aqui
    tabela.classList.add('tabela-finalizar');
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
            <td>${item.nome} ${item.observacoes.length > 0 ? '(Observação: ' + item.observacoes.join(', ') + ')' : ''}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            </td>
        `;
        tbody.appendChild(tr);
        total += item.preco * item.quantidade;
    });

    // Adiciona o total ao elemento fora da tabela
    document.getElementById('valor-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}


function mostrarOpcao(opcao) {
    const camposEntrega = document.getElementById('campos-entrega');
    const camposRetirada = document.getElementById('retirada-campo');
    const camposConsumo = document.getElementById('consumir-campo'); // Adiciona os campos de consumo
    const mensagem = document.getElementById('opcao-selecionada');

    // Esconde os campos de entrega, retirada e consumo inicialmente
    camposEntrega.style.display = 'none';
    camposRetirada.style.display = 'none';
    camposConsumo.style.display = 'none'; // Esconde os campos de consumo

    // Mostra a opção selecionada e os campos correspondentes
    if (opcao === 'entrega') {
        mensagem.innerHTML = "<p>Você escolheu Entrega.</p>";
        camposEntrega.style.display = 'block'; // Mostra os campos de entrega
    } else if (opcao === 'retirar') {
        mensagem.innerHTML = "<p>Você escolheu Retirar.</p>";
        camposRetirada.style.display = 'block'; // Mostra os campos de retirada
        mostrarAgendamentoRetirada(); // Chama a função para ajustar a exibição dos campos de agendamento
    } else if (opcao === 'consumir') {
        mensagem.innerHTML = "<p>Você escolheu Consumir no local.</p>";
        camposConsumo.style.display = 'block'; // Mostra os campos de consumo
        mostrarAgendamentoConsumo(); // Chama a função para ajustar a exibição dos campos de agendamento, se necessário
    }
}

// Função para mostrar/ocultar campos de agendamento
function mostrarAgendamento() {
    const agendarCampo = document.getElementById('agendar-campo');
    const opcaoSelecionada = document.querySelector('input[name="select-entrega"]:checked').value;

    // Mostra ou esconde os campos de agendamento com base na opção selecionada
    if (opcaoSelecionada === 'agendar') {
        agendarCampo.style.display = 'block'; // Mostra os campos de agendamento
        preencherHorariosAgendamento(); // Chama a função para preencher os horários
    } else {
        agendarCampo.style.display = 'none'; // Esconde os campos de agendamento
    }
}

// Função para preencher o select de horários para agendamento
function preencherHorariosAgendamento() {
    const horarioSelect = document.getElementById('horario-agendamento');
    horarioSelect.innerHTML = ''; // Limpa opções existentes

    // Cria as opções de horários
    const horarios = [
        '19:00 - 19:30',
        '19:30 - 20:00',
        '20:00 - 20:30',
        '20:30 - 21:00',
        '21:00 - 21:30',
        '21:30 - 22:00',
        '22:00 - 22:30',
        '22:30 - 23:00',
        '23:00 - 23:30',
        '23:30 - 00:00',
        '00:00 - 00:30',
        '00:30 - 01:00',
        '01:00 - 01:30',
        '01:30 - 02:00'
    ];

    // Adiciona as opções ao select
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario.split(' - ')[0]; // Adiciona o horário inicial como valor
        option.textContent = horario; // Exibe o horário formatado
        horarioSelect.appendChild(option);
    });
}

function mostrarAgendamentoRetirada() {
    const opcaoSelecionada = document.querySelector('input[name="opcao-retirada"]:checked').value;
    const agendarRetirada = document.getElementById('agendar-retirada');
    const horarioSelect = document.getElementById('horario-retirada');

    // Mostra ou esconde os campos de agendamento com base na opção selecionada
    if (opcaoSelecionada === 'agendar') {
        agendarRetirada.style.display = 'block'; // Mostra os campos de agendamento
        preencherHorariosRetirada(); // Chama a função para preencher os horários
    } else {
        agendarRetirada.style.display = 'none'; // Esconde os campos de agendamento
    }
}

// Função para preencher o select de horários para retirada
function preencherHorariosRetirada() {
    const horarioSelect = document.getElementById('horario-retirada');
    horarioSelect.innerHTML = ''; // Limpa opções existentes

    // Cria as opções de horários
    const horarios = [
        '19:00 - 19:30',
        '19:30 - 20:00',
        '20:00 - 20:30',
        '20:30 - 21:00',
        '21:00 - 21:30',
        '21:30 - 22:00',
        '22:00 - 22:30',
        '22:30 - 23:00',
        '23:00 - 23:30',
        '23:30 - 00:00',
        '00:00 - 00:30',
        '00:30 - 01:00',
        '01:00 - 01:30',
        '01:30 - 02:00'
    ];

    // Adiciona as opções ao select
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario.split(' - ')[0]; // Adiciona o horário inicial como valor
        option.textContent = horario; // Exibe o horário formatado
        horarioSelect.appendChild(option);
    });
}


function validarHorario(horario) {
    const horarioSelecionado = new Date(`1970-01-01T${horario}:00`);
    const horarioAbertura = new Date(`1970-01-01T19:00:00`);

    // Obter a data atual
    const hoje = new Date();
    const horarioFechamento = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 2, 0, 0); // 02:00 do dia atual

    // Se o horário de fechamento já passou, adiciona um dia
    if (hoje.getHours() >= 2) {
        horarioFechamento.setDate(horarioFechamento.getDate() + 1);
    }

    // Verifica se o horário está entre a abertura e o fechamento
    return (
        (horarioSelecionado >= horarioAbertura && horarioSelecionado <= new Date(`1970-01-01T23:59:59`)) ||
        (horarioSelecionado >= new Date(`1970-01-02T00:00:00`) && horarioSelecionado <= horarioFechamento)
    );
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function enviarPedido() {
    const nomeCliente = document.getElementById('nome-cliente').value; 
    const bairro = document.getElementById('bairro').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const formaPagamento = document.getElementById('forma-pagamento').value; 
    const tipoResidencia = document.getElementById('tipo-residencia').value; 
    
    // Verifica se os campos obrigatórios estão preenchidos
    if (!nomeCliente || !bairro || !logradouro || !numero || !formaPagamento || !tipoResidencia) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; 
    }

    const tabelaCarrinho = document.getElementById('lista-carrinho').getElementsByTagName('table')[0];
    const produtos = [];
    const linhas = tabelaCarrinho.getElementsByTagName('tr');
    let total = 0;

    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        const nomeProduto = colunas[0].innerText.split(' (Observação:')[0].trim(); // Ajusta para pegar apenas o nome
        const valorUnitarioTexto = colunas[1].innerText.replace('R$ ', '').replace('.', '').replace(',', '.'); 
        const valorUnitario = parseFloat(valorUnitarioTexto) / 100; 
        const quantidadeTexto = colunas[2].innerText; 
        const quantidade = parseInt(quantidadeTexto); 

        if (isNaN(quantidade) || quantidade <= 0) {
            alert(`Quantidade inválida para o produto: ${nomeProduto}`);
            return; 
        }

        const subtotal = valorUnitario * quantidade; 
        total += subtotal; 

        // Extraindo a observação, se houver
        const observacao = colunas[0].innerText.split(' (Observação:')[1]?.replace(')', '').trim() || ''; // Extraindo a observação

        produtos.push({ 
            nome: nomeProduto, 
            valorUnitario: valorUnitario, 
            quantidade: quantidade, 
            subtotal: subtotal,
            observacao: observacao // Adiciona observação ao produto
        });
    }

    let mensagem = `_*Pedido de Entrega*_\n`;
    mensagem += `Nome do Cliente: ${nomeCliente}\n`; 
    mensagem += `Bairro: ${bairro}\n`;
    mensagem += `Logradouro: ${logradouro}\n`;
    mensagem += `Número: ${numero}\n`;
    mensagem += `Forma de Pagamento: *${formaPagamento}*\n`; 
    mensagem += `Tipo de Residência: *${tipoResidencia}*\n`; 
    
    // Forma de entrega
    const formaEntrega = document.querySelector('input[name="select-entrega"]:checked').value;
    mensagem += `Data de entrega: *${formaEntrega}*\n`;

    if (formaEntrega === "agendar") {
        const dataAgendamento = document.getElementById('data-agendamento').value;
        const horarioAgendamento = document.getElementById('horario-agendamento').value;
        mensagem += `Data de Agendamento: ${dataAgendamento}\n`;
        mensagem += `Horário de Agendamento: ${horarioAgendamento}\n`;
    }

    // Adiciona os produtos e seus valores à mensagem
    mensagem += `\n_*Produtos:*_\n`;
    produtos.forEach(produto => {
        mensagem += `${produto.nome} - ${formatarMoeda(produto.valorUnitario)} (Quantidade: ${produto.quantidade}) - Subtotal: ${formatarMoeda(produto.subtotal)}`;
        if (produto.observacao) {
            mensagem += ` (Observação: _${produto.observacao}_)`; // Inclui a observação se existir
        }
        mensagem += `\n`;
    });

    mensagem += `\n*Total: ${formatarMoeda(total)}*`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '+5511946360315'; 

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;

    window.location.href = urlWhatsApp; 
}

function enviarPedidoRetirada() {
    const nomeCliente = document.getElementById('nome-cliente').value;
    const formaPagamento = document.getElementById('forma-pagamento').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nomeCliente || !formaPagamento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const tabelaCarrinho = document.getElementById('lista-carrinho').getElementsByTagName('table')[0];
    const produtos = [];
    const linhas = tabelaCarrinho.getElementsByTagName('tr');
    let total = 0;

    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        const nomeProduto = colunas[0].innerText.split(' (Observação:')[0].trim(); // Ajuste para pegar o nome
        const valorUnitarioTexto = colunas[1].innerText.replace('R$ ', '').replace('.', '').replace(',', '.'); 
        const valorUnitario = parseFloat(valorUnitarioTexto)/ 100; 
        const quantidadeTexto = colunas[2].innerText; 
        const quantidade = parseInt(quantidadeTexto);

        const subtotal = valorUnitario * quantidade; 
        total += subtotal; 

        // Extraindo a observação, se houver
        const observacao = colunas[0].innerText.split(' (Observação:')[1]?.replace(')', '').trim() || '';

        produtos.push({ 
            nome: nomeProduto, 
            valorUnitario: valorUnitario, 
            quantidade: quantidade, 
            subtotal: subtotal,
            observacao: observacao // Adiciona observação ao produto
        });
    }

    let mensagem = `_*Pedido de Retirada*_\n`;
    mensagem += `Nome do Cliente: ${nomeCliente}\n`;
    mensagem += `Forma de Pagamento: *${formaPagamento}*\n`;

    // Forma de retirada
    const formaRetirada = document.querySelector('input[name="opcao-retirada"]:checked').value;
    mensagem += `Forma de Retirada: *${formaRetirada}*\n`;

    if (formaRetirada === "agendar") {
        const dataRetirada = document.getElementById('data-retirada').value; 
        const horarioRetirada = document.getElementById('horario-retirada').value; 
        mensagem += `Data de Retirada Agendada: ${dataRetirada}\n`;
        mensagem += `Horário de Retirada: ${horarioRetirada}\n`;
    }

    // Adiciona os produtos e seus valores à mensagem
    mensagem += `\n_*Produtos:*_\n`;
    produtos.forEach(produto => {
        mensagem += `${produto.nome} - ${formatarMoeda(produto.valorUnitario)} (Quantidade: ${produto.quantidade}) - Subtotal: ${formatarMoeda(produto.subtotal)}`;
        if (produto.observacao) {
            mensagem += ` (Observação: ${produto.observacao})`; // Inclui a observação se existir
        }
        mensagem += `\n`;
    });

    mensagem += `\n*Total: ${formatarMoeda(total)}*`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '+5511946360315'; 

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;

    window.location.href = urlWhatsApp;
}

function enviarPedidoConsumo() {
    const nomeCliente = document.getElementById('nome-cliente').value;
    const formaPagamento = document.getElementById('forma-pagamento').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nomeCliente || !formaPagamento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const tabelaCarrinho = document.getElementById('lista-carrinho').getElementsByTagName('table')[0];
    const produtos = [];
    const linhas = tabelaCarrinho.getElementsByTagName('tr');
    let total = 0;

    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        const nomeProduto = colunas[0].innerText.split(' (Observação:')[0].trim(); // Ajuste para pegar o nome
        const valorUnitarioTexto = colunas[1].innerText.replace('R$ ', '').replace('.', '').replace(',', '.'); 
        const valorUnitario = parseFloat(valorUnitarioTexto) / 100; 
        const quantidadeTexto = colunas[2].innerText; 
        const quantidade = parseInt(quantidadeTexto);

        const subtotal = valorUnitario * quantidade; 
        total += subtotal; 

        // Extraindo a observação, se houver
        const observacao = colunas[0].innerText.split(' (Observação:')[1]?.replace(')', '').trim() || '';

        produtos.push({ 
            nome: nomeProduto, 
            valorUnitario: valorUnitario, 
            quantidade: quantidade, 
            subtotal: subtotal,
            observacao: observacao // Adiciona observação ao produto
        });
    }

    let mensagem = `_*Pedido para Consumo no Local*_\n`;
    mensagem += `Nome do Cliente: ${nomeCliente}\n`;
    mensagem += `Forma de Pagamento: *${formaPagamento}*\n`;

    // Forma de consumo
    const formaConsumo = document.querySelector('input[name="opcao-consumo"]:checked').value;
    mensagem += `Forma de Consumo: *${formaConsumo}*\n`;

    if (formaConsumo === "agendar") {
        const dataConsumo = document.getElementById('data-consumo').value; 
        const horarioConsumo = document.getElementById('horario-consumo').value; 
        mensagem += `Data de Consumo Agendado: ${dataConsumo}\n`;
        mensagem += `Horário de Consumo: ${horarioConsumo}\n`;
    }

    // Adiciona os produtos e seus valores à mensagem
    mensagem += `\n_*Produtos:*_\n`;
    produtos.forEach(produto => {
        mensagem += `${produto.nome} - ${formatarMoeda(produto.valorUnitario)} (Quantidade: ${produto.quantidade}) - Subtotal: ${formatarMoeda(produto.subtotal)}`;
        if (produto.observacao) {
            mensagem += ` (Observação: ${produto.observacao})`; // Inclui a observação se existir
        }
        mensagem += `\n`;
    });

    mensagem += `\n*Total: ${formatarMoeda(total)}*`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '+5511946360315'; 

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;

    window.location.href = urlWhatsApp;
}





function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Inicializa a atualização do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
});

function selecionarEndereco() {
    // Verifica se a geolocalização está disponível
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Substitua YOUR_API_KEY por uma chave válida da API do Google
            const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=YOUR_API_KEY`;

            // Realiza uma requisição à API para obter o endereço
            fetch(geocodingApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro na requisição para a API de Geocoding");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === "OK") {
                        const endereco = data.results[0];
                        preencherCamposEndereco(endereco);
                    } else {
                        alert(`Erro: ${data.status} - Não foi possível obter o endereço a partir da localização.`);
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar o endereço: ", error);
                    alert("Ocorreu um erro ao tentar buscar o endereço. Verifique o console para mais detalhes.");
                });
        }, function(error) {
            alert("Erro ao obter localização: " + error.message);
        });
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
}

function preencherCamposEndereco(endereco) {
    const bairro = endereco.address_components.find(component => component.types.includes('sublocality') || component.types.includes('neighborhood'));
    const logradouro = endereco.address_components.find(component => component.types.includes('route'));
    const numero = endereco.address_components.find(component => component.types.includes('street_number'));

    document.getElementById('bairro').value = bairro ? bairro.long_name : '';
    document.getElementById('logradouro').value = logradouro ? logradouro.long_name : '';
    document.getElementById('numero').value = numero ? numero.long_name : '';
}



function preencherHorariosConsumo() {
    const selectHorarios = document.getElementById('horario-consumo');
    selectHorarios.innerHTML = ''; // Limpa as opções atuais

    const abertura = new Date('1970-01-01T19:00:00'); // 19:00
    const fechamento = new Date('1970-01-02T02:00:00'); // 02:00 do dia seguinte
    const intervalo = 30; // Intervalo em minutos

    // Preenche as opções de horário
    while (abertura < fechamento) { // Mudei de <= para < para não incluir 02:00
        const horaFormatada = `${abertura.getHours().toString().padStart(2, '0')}:${abertura.getMinutes().toString().padStart(2, '0')}`;
        const proximaHora = new Date(abertura.getTime() + intervalo * 60000); // Adiciona 30 minutos

        const option = document.createElement('option');
        option.value = horaFormatada;
        option.textContent = `${horaFormatada} - ${proximaHora.getHours().toString().padStart(2, '0')}:${proximaHora.getMinutes().toString().padStart(2, '0')}`;
        
        selectHorarios.appendChild(option);
        abertura.setTime(abertura.getTime() + intervalo * 60000); // Atualiza para a próxima hora
    }
}


// Chame a função ao mostrar os campos de agendamento de consumo
function mostrarAgendamentoConsumo() {
    const opcaoSelecionada = document.querySelector('input[name="opcao-consumo"]:checked').value;
    const agendarConsumo = document.getElementById('agendar-consumo');
    const horarioSelect = document.getElementById('horario-consumo');

    // Mostra ou esconde os campos de agendamento com base na opção selecionada
    if (opcaoSelecionada === 'agendar') {
        agendarConsumo.style.display = 'block'; // Mostra os campos de agendamento
        preencherHorarios(); // Chama a função para preencher os horários
    } else {
        agendarConsumo.style.display = 'none'; // Esconde os campos de agendamento
    }
}

// Função para preencher o select de horários
function preencherHorarios() {
    const horarioSelect = document.getElementById('horario-consumo');
    horarioSelect.innerHTML = ''; // Limpa opções existentes

    // Cria as opções de horários
    const horarios = [
        '19:00 - 19:30',
        '19:30 - 20:00',
        '20:00 - 20:30',
        '20:30 - 21:00',
        '21:00 - 21:30',
        '21:30 - 22:00',
        '22:00 - 22:30',
        '22:30 - 23:00',
        '23:00 - 23:30',
        '23:30 - 00:00',
        '00:00 - 00:30',
        '00:30 - 01:00',
        '01:00 - 01:30',
        '01:30 - 02:00'
    ];

    // Adiciona as opções ao select
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario.split(' - ')[0]; // Adiciona o horário inicial como valor
        option.textContent = horario; // Exibe o horário formatado
        horarioSelect.appendChild(option);
    });
}

function formatarTelefone(input) {
    // Remove caracteres não numéricos
    const apenasNumeros = input.value.replace(/\D/g, '');

    // Aplica a formatação
    if (apenasNumeros.length > 0) {
        const formato = apenasNumeros.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2$3-$4');
        input.value = formato;

        // Validação: Verifica se o número tem 10 ou 11 dígitos
        if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
            input.setCustomValidity('Número inválido');
        } else {
            input.setCustomValidity('');
        }
    } else {
        input.setCustomValidity('Preencha esse campo corretamente.');
    }
}