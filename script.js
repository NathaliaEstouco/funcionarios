class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  toString() {
    return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$${this.salario}`;
  }
}

const funcionarios = [];

document.getElementById("formFuncionario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  const funcionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(funcionario);

  atualizarTabela();
  this.reset();
});

function atualizarTabela() {
  const corpo = document.getElementById("tabelaFuncionarios");
  corpo.innerHTML = "";

  funcionarios.forEach(f => {
    const linha = `<tr>
      <td>${f.nome}</td>
      <td>${f.idade}</td>
      <td>${f.cargo}</td>
      <td>${f.salario}</td>
    </tr>`;
    corpo.innerHTML += linha;
  });
}
