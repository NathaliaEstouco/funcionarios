const funcionarios = [
  { nome: "Ana", idade: 30, cargo: "Dev", salario: 6000 },
  { nome: "João", idade: 25, cargo: "Designer", salario: 4000 },
  { nome: "Maria", idade: 35, cargo: "Gerente", salario: 8000 },
  { nome: "Pedro", idade: 28, cargo: "Dev", salario: 5500 }
];

const resultado = document.getElementById("resultado");

function relatorioSalarios() {
  const lista = funcionarios.filter(f => f.salario > 5000);
  resultado.textContent = JSON.stringify(lista, null, 2);
}

function mediaSalarial() {
  const media = funcionarios.reduce((soma, f) => soma + f.salario, 0) / funcionarios.length;
  resultado.textContent = `Média Salarial: R$ ${media.toFixed(2)}`;
}

function cargosUnicos() {
  const cargos = [...new Set(funcionarios.map(f => f.cargo))];
  resultado.textContent = "Cargos únicos: " + cargos.join(", ");
}

function nomesMaiusculo() {
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  resultado.textContent = "Nomes: " + nomes.join(", ");
}
