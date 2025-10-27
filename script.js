const funcionarios = [];
const resultado = document.getElementById("resultado");
const listaFuncionarios = document.getElementById("listaFuncionarios");
const form = document.getElementById("formFuncionario");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const cargo = document.getElementById("cargo").value;
  const salario = parseFloat(document.getElementById("salario").value);

  funcionarios.push({ nome, idade, cargo, salario });

  atualizarLista();
  form.reset();
});

function atualizarLista() {
  if (funcionarios.length === 0) {
    listaFuncionarios.textContent = "Nenhum funcionário cadastrado ainda.";
  } else {
    listaFuncionarios.textContent = JSON.stringify(funcionarios, null, 2);
  }
}

function relatorioSalarios() {
  const lista = funcionarios.filter(f => f.salario > 5000);
  resultado.textContent = lista.length > 0
    ? JSON.stringify(lista, null, 2)
    : "Nenhum funcionário com salário acima de 5000.";
}

function mediaSalarial() {
  if (funcionarios.length === 0) {
    resultado.textContent = "Nenhum funcionário cadastrado.";
    return;
  }
  const media = funcionarios.reduce((soma, f) => soma + f.salario, 0) / funcionarios.length;
  resultado.textContent = `Média Salarial: R$ ${media.toFixed(2)}`;
}

function cargosUnicos() {
  if (funcionarios.length === 0) {
    resultado.textContent = "Nenhum funcionário cadastrado.";
    return;
  }
  const cargos = [...new Set(funcionarios.map(f => f.cargo))];
  resultado.textContent = "Cargos: " + cargos.join(", ");
}

function nomesMaiusculo() {
  if (funcionarios.length === 0) {
    resultado.textContent = "Nenhum funcionário cadastrado.";
    return;
  }
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  resultado.textContent = "Nomes: " + nomes.join(", ");
}
