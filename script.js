let listaDeConsultas = []; // Variável global para inicializar o array que armazenará as consultas agendadas
let indiceEdicaoConsulta = -1; // Variável global para controlar se está editando ou adicionando consulta nova (-1: nada está sendo editado; editando: o valor do índice da consulta no array será armazenado nessa variável, indicando que está sendo editada
let DataOriginalConsulta; // Variável global para armazenar a data original da consulta

// Função para limpar os campos de entrada de consulta
function limpaCamposConsulta() {
  document.getElementById("paciente").value = "";
  document.getElementById("data").value = "";
  document.getElementById("horario").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
}

// Função para salvar uma nova consulta ou editar uma existente
function salvarConsulta() {
  let paciente = document.getElementById("paciente").value; // Obtém o nome do paciente
  let dataInput = document.getElementById("data").value; // Obtém a data como string no formato AAAA-MM-DD
  let [ano, mes, dia] = dataInput.split("-"); // Divide a string da data em partes
  let data = new Date(ano, mes - 1, dia); // Cria um novo objeto Date com as partes da data
  let horario = document.getElementById("horario").value; // Obtém o horário preenchido
  let email = document.getElementById("email").value; // Obtém o email preenchido
  let telefone = document.getElementById("telefone").value; // Obtém o telefone preenchido

  console.log("Horário selecionado:", horario);

  // Validação de campos, se necessário

  if (indiceEdicaoConsulta >= 0) {
    let obj = listaDeConsultas[indiceEdicaoConsulta];
    obj.paciente = paciente;
    obj.data = data; // Armazena o objeto Date
    obj.horario = horario;
    obj.email = email;
    obj.telefone = telefone;
  } else {
    listaDeConsultas.push({
      paciente: paciente,
      data: data,
      horario: horario,
      email: email,
      telefone: telefone,
    });
  }

  limpaCamposConsulta();
  atualizarTabelaConsultas();

  indiceEdicaoConsulta = -1;
}

// Função para editar uma consulta existente
function editarConsulta(indice) {
  indiceEdicaoConsulta = indice;
  let obj = listaDeConsultas[indice];

  // Armazena a data original da consulta
  dataOriginalConsulta = new Date(obj.data);

  document.getElementById("paciente").value = obj.paciente;
  document.getElementById("data").value = obj.data.toISOString().split("T")[0]; // Define a data no formato AAAA-MM-DD
  document.getElementById("horario").value = obj.horario;
  document.getElementById("email").value = obj.email;
  document.getElementById("telefone").value = obj.telefone;
}

// Função para excluir uma consulta
function excluirConsulta(indice) {
  let obj = listaDeConsultas[indice];

  // Formata a data para exibir na mensagem de confirmação
  let dataFormatada = obj.data.toLocaleDateString("pt-BR");
  if (
    confirm(
      `Tem certeza que deseja excluir a consulta de ${obj.paciente} em ${dataFormatada} às ${obj.horario}?`
    )
  ) {
    listaDeConsultas.splice(indice, 1);
    atualizarTabelaConsultas();
  }
}

// Função para atualizar a tabela de consultas
function atualizarTabelaConsultas() {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  listaDeConsultas.forEach((i, indice) => {
    let tr = document.createElement("tr");

    // Formata a data para o formato DD-MM-AAAA
    let dataFormatada = formatarData(i.data);

    tr.innerHTML = `
        <td> ${i.paciente} </td>
        <td> ${dataFormatada} </td>
        <td> ${i.horario} </td>
        <td> ${i.email} </td>
        <td> ${i.telefone} </td>
        <td>
            <button
                type="button"
                onclick="editarConsulta(${indice})"
                class="material-symbols-outlined btn-icone">Editar
            </button>

            <button 
                type="button"
                onclick="excluirConsulta(${indice})"
                class="material-symbols-outlined btn-icone">Apagar
            </button>

        </td>    
        `;

    tableBody.append(tr);
  });
}

// Função para formatar a data no formato DD-MM-AAAA
function formatarData(data) {
  let dataObj = new Date(data);
  let dia = String(dataObj.getDate()).padStart(2, "0");
  let mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  let ano = dataObj.getFullYear();

  return `${dia}-${mes}-${ano}`;
}
