class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  atualizar(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }
}

const funcionarios = [];

document.getElementById("formFuncionario").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = nomeInput.value;
  const idade = idadeInput.value;
  const cargo = cargoInput.value;
  const salario = salarioInput.value;
  const indice = indiceEdicao.value;

  if (indice === "") {
    funcionarios.push(new Funcionario(nome, idade, cargo, salario));
  } else {
    funcionarios[indice].atualizar(nome, idade, cargo, salario);
    indiceEdicao.value = "";
  }

  atualizarTabela();
  this.reset();
});

function atualizarTabela() {
  const corpo = document.getElementById("tabelaFuncionarios");
  corpo.innerHTML = "";

  funcionarios.forEach((f, i) => {
    corpo.innerHTML += `
      <tr>
        <td>${f.nome}</td><td>${f.idade}</td><td>${f.cargo}</td><td>${f.salario}</td>
        <td>
          <button onclick="editar(${i})">Editar</button>
          <button onclick="excluir(${i})">Excluir</button>
        </td>
      </tr>`;
  });
}

function editar(i) {
  const f = funcionarios[i];
  nomeInput.value = f.nome;
  idadeInput.value = f.idade;
  cargoInput.value = f.cargo;
  salarioInput.value = f.salario;
  indiceEdicao.value = i;
}

function excluir(i) {
  funcionarios.splice(i, 1);
  atualizarTabela();
}

const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cargoInput = document.getElementById("cargo");
const salarioInput = document.getElementById("salario");
const indiceEdicao = document.getElementById("indiceEdicao");
