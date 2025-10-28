// script.js

// Classe Funcionario com getters/setters e toString()
class Funcionario {
  constructor(id, nome, idade, cargo, salario) {
    this._id = id;
    this._nome = nome;
    this._idade = Number(idade);
    this._cargo = cargo;
    this._salario = Number(salario);
  }

  get id() { return this._id; }
  get nome() { return this._nome; }
  set nome(v) { this._nome = v; }

  get idade() { return this._idade; }
  set idade(v) { this._idade = Number(v); }

  get cargo() { return this._cargo; }
  set cargo(v) { this._cargo = v; }

  get salario() { return this._salario; }
  set salario(v) { this._salario = Number(v); }

  toString() {
    return `${this._nome} - ${this._cargo} - R$ ${this._salario.toFixed(2)}`;
  }
}

// VARIÁVEIS E ELEMENTOS
let funcionarios = [];

const form = document.getElementById('formCadastro');
const tblBody = document.querySelector('#tblFuncionarios tbody');
const totalSpan = document.getElementById('totalFuncionarios');
const reportDiv = document.getElementById('reportResult');

const btnSal5000 = document.getElementById('relSalarioMaior5000');
const btnMedia = document.getElementById('relMediaSalarial');
const btnCargos = document.getElementById('relCargosUnicos');
const btnNomes = document.getElementById('relNomesMaiusculo');
const btnRelLimpar = document.getElementById('relLimpar');

const inputId = document.getElementById('funcId');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputCargo = document.getElementById('cargo');
const inputSalario = document.getElementById('salario');
const btnLimpar = document.getElementById('btnLimpar');

const geraId = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);

// LOCALSTORAGE
const salvarLocal = () => localStorage.setItem('ec02_funcionarios', JSON.stringify(funcionarios));
const carregarLocal = () => {
  const raw = localStorage.getItem('ec02_funcionarios');
  if(!raw) return [];
  try {
    return JSON.parse(raw).map(a => new Funcionario(a._id, a._nome, a._idade, a._cargo, a._salario));
  } catch { 
    return []; 
  }
};

// RENDERIZAÇÃO DA TABELA
const renderTable = () => {
  tblBody.innerHTML = '';

  funcionarios.forEach(func => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${func.nome}</td>
      <td>${func.idade}</td>
      <td>${func.cargo}</td>
      <td>${func.salario.toFixed(2)}</td>
      <td>
        <button type="button" class="edit">Editar</button>
        <button type="button" class="delete">Excluir</button>
      </td>
    `;

    // Botão Editar — função anônima
    tr.querySelector('.edit').onclick = function() {
      carregarParaEdicao(func.id);
    };

    // Botão Excluir — arrow function
    tr.querySelector('.delete').onclick = () => {
      if (confirm(`Excluir ${func.nome}?`)) excluirFuncionario(func.id);
    };

    tblBody.appendChild(tr);
  });

  totalSpan.textContent = funcionarios.length;
  salvarLocal();
};

// CADASTRO E EDIÇÃO
form.addEventListener('submit', e => {
  e.preventDefault();

  const id = inputId.value;
  const nome = inputNome.value.trim();
  const idade = inputIdade.value;
  const cargo = inputCargo.value.trim();
  const salario = inputSalario.value;

  if (!nome || !idade || !cargo || !salario) {
    alert('Preencha todos os campos.');
    return;
  }

  if (!id) {
    // Novo funcionário
    funcionarios.push(new Funcionario(geraId(), nome, idade, cargo, salario));
  } else {
    // Atualizar existente
    const f = funcionarios.find(f => f.id === id);
    if (f) {
      f.nome = nome;
      f.idade = idade;
      f.cargo = cargo;
      f.salario = salario;
    }
    inputId.value = '';
    document.getElementById('btnCadastrar').textContent = 'Cadastrar';
  }

  form.reset();
  renderTable();
});

// Carregar dados para edição
const carregarParaEdicao = (id) => {
  const f = funcionarios.find(f => f.id === id);
  if (!f) return;
  inputId.value = f.id;
  inputNome.value = f.nome;
  inputIdade.value = f.idade;
  inputCargo.value = f.cargo;
  inputSalario.value = f.salario;
  document.getElementById('btnCadastrar').textContent = 'Salvar';
};

// Excluir funcionário
const excluirFuncionario = (id) => {
  funcionarios = funcionarios.filter(f => f.id !== id);
  renderTable();
};

// Limpar formulário
/*btnLimpar.addEventListener('click', () => {
  form.reset();
  inputId.value = '';
  document.getElementById('btnCadastrar').textContent = 'Cadastrar';
});*/

// RELATÓRIOS (map / filter / reduce / Set)
btnSal5000.addEventListener('click', () => {
  const maiores = funcionarios.filter(f => f.salario > 5000);
  reportDiv.textContent = maiores.length
    ? maiores.map(f => f.toString()).join('\n')
    : 'Nenhum funcionário com salário > R$ 5000.';
});

btnMedia.addEventListener('click', () => {
  if (!funcionarios.length) {
    reportDiv.textContent = 'Sem funcionários cadastrados.';
    return;
  }
  const media = funcionarios.map(f => f.salario).reduce((a,b)=>a+b,0) / funcionarios.length;
  reportDiv.textContent = `Média salarial: R$ ${media.toFixed(2)}`;
});

btnCargos.addEventListener('click', () => {
  const unicos = [...new Set(funcionarios.map(f=>f.cargo))];
  reportDiv.textContent = unicos.length
    ? `Cargos únicos (${unicos.length}):\n- ${unicos.join('\n- ')}`
    : 'Nenhum cargo cadastrado.';
});

btnNomes.addEventListener('click', () => {
  const nomes = funcionarios.map(f=>f.nome.toUpperCase());
  const relatorioHTML = nomes.join('<br>');
  reportDiv.innerHTML = nomes.length ? relatorioHTML : 'Sem funcionários.';
});

btnRelLimpar.addEventListener('click', () => reportDiv.textContent = '');

// INICIALIZAÇÃO
window.addEventListener('DOMContentLoaded', () => {
  funcionarios = carregarLocal();
  renderTable();
});
