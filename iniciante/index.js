// hello world
// console.log('hello world');
// console.log(2);

// Variáveis
// 
//  let mensagem = 'hello world';
// console.log(mensagem);
// 
// const nome = 'João';
// console.log(nome);

// Arrays, Objetos
// let metas = ['meta 1', 'meta 2', 'meta 3'];
// console.log(metas[0] + ' ' + metas[1]);
//
// let meta = {
//     value: "ler um livro por mês",
//     checked: false,
//     log: (info) => {
//       console.log(info);
//     }
// }

// console.log(meta.value);

// function // arrow function
//
// const criarMeta = () => {}
//
// function criarMeta() {
//     console.log('criar meta');
// } 


// let metas = [
//     {
//         value: "ler um livro por mês",
//         checked: false,
//     },
//     {
//         value: "caminhar 20 minutps todos os dias",
//         checked: true,
//     }
// ];

// console.log(metas[0].value);

const { select, input, checkbox } = require('@inquirer/prompts'); 
const fs = require('fs').promises;

let metas;

const carregarMetas = async () => {
  try {
    const metasString = await fs.readFile('metas.json', 'utf-8');
    metas = JSON.parse(metasString);
  } catch (error) {
    metas = [];
  }
}

const salvarMetas = async () => {
  if (metas) {
    await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
  }
}


const cadastrarMeta = async () => {
  const meta = await input({ message: 'Qual a sua meta? ' });

  if (meta.length < 1) {
    showMessage("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });

  showMessage('Meta cadastrada com sucesso');
}


const listarMetas = async () => {
  if (metas.length < 1) {
    showMessage('Nenhuma meta cadastrada');
    return;
  }

  const respostas = await checkbox({
    message: 'Use as setas para selecionar, a barra de espaço para marcar e o enter para confirmar',
    instructions: false,
    choices: [...metas] // Spread Operator
  });

  metas.forEach(m => {m.checked=false});

  if (respostas.length < 1) {
    showMessage('Nenhuma meta selecionada');
    return;
  }

  respostas.forEach(r => {
    const meta = metas.find(m => m.value === r);
    meta.checked = true;
  });

  showMessage('Meta(s) atualizada(s) com sucesso');
}


const listarMetasRealizadas = async () => {
  if (metas.length < 1) {
    showMessage('Nenhuma meta cadastrada');
    return;
  }

  const metasRealizadas = metas.filter(m => m.checked);

  if (metasRealizadas.length < 1) {
    showMessage('Nenhuma meta realizada');
    return;
  }

  await select({
    message: `Metas realizadas (${metasRealizadas.length})`,
    choices: [...metasRealizadas]
  });
}


const listarMetasPendentes = async () => {
  if (metas.length < 1) {
    showMessage('Nenhuma meta cadastrada');
    return;
  }

  const metasPendentes = metas.filter(m => !m.checked);

  if (metasPendentes.length < 1) {
    showMessage('Nenhuma meta pendente');
    return;
  }

  await select({
    message: `Metas pendentes (${metasPendentes.length})`,
    choices: [...metasPendentes]
  });
}


const deletarMetas = async () => {
  if (metas.length < 1) {
    showMessage('Nenhuma meta cadastrada');
    return;
  }

  const metasLocal =  metas.map(m => ({ value: m.value, checked: false }));

  const respostas = await checkbox({
    message: 'Use as setas para selecionar, a barra de espaço para marcar e o enter para confirmar',
    instructions: false,
    choices: metasLocal
  });

  if (respostas.length < 1) {
    showMessage('Nenhuma meta selecionada');
    return;
  }

  respostas.forEach(r => {
    metas = metas.filter(m => m.value !== r);
  });

  showMessage('Meta(s) deletada(s) com sucesso');
}

const showMessage = (message = '') => {
  console.clear();
  console.log('Bem vindo ao sistema de metas');
  console.log('==============================');
  console.log(message);
  console.log('==============================');
  console.log('');
}

const start = async () => {
  await carregarMetas();

  showMessage();
  while(true) {
    await salvarMetas();

    const opcao = await select({
      message: 'Menu >>>',
      choices: [
        { name: 'Cadastrar meta', value: 'cadastrar' },
        { name: 'Listar metas', value: 'listar' },
        { name: 'Metas realizadas', value: 'listarMetasRealizadas' },
        { name: 'Metas pendentes', value: 'listarMetasPendentes' },
        { name: 'Deletar metas', value: 'deletarMetas' },
        { name: 'Sair', value: 'sair' }
      ]
    })

    showMessage();

    switch(opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "listarMetasRealizadas":
        await listarMetasRealizadas();
        break;
      case "listarMetasPendentes":
        await listarMetasPendentes();
        break;
      case "deletarMetas":
        await deletarMetas();
        break;
      case "sair":
        showMessage('Até a próxima\n');
        return;
    }
  }
} 

start();