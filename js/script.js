const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const ce = (el) => document.createElement(el);

const modalProdutos = c('.modalProdutos');
const active = 'active';

let qtCar = 1;
const qtProduto = c('.qt');

// Requisitando os produtos
const fetchProdutos = async () => {
  const response = await fetch('js/produtos.json');
  const produtos = await response.json();
  return produtos;
};

async function showProdutos() {
  const produtos = await fetchProdutos();
  const boxCard = c('.box--card');

  produtos.forEach((produto) => {
    const cardProduto = ce('div');
    cardProduto.id = produto.id;
    cardProduto.classList.add('card');

    const cloneProduto = c('.exemplo--card a').cloneNode(true);
    cardProduto.appendChild(cloneProduto);

    const img = cloneProduto.querySelector('img');
    const nomeProduto = cloneProduto.querySelector('h3');
    const precoProduto = cloneProduto.querySelector('.preco--produto p');

    img.src = produto.imagem;
    nomeProduto.innerText = produto.nome;
    precoProduto.innerHTML = `${produto.tempo} min - <span>R$ ${produto.preco}</span>`;

    boxCard.appendChild(cardProduto);
  });
  modalItens();
}

// Função para fechar o modal
function fecharModal() {
  modalProdutos.classList.remove(active);
  qtProduto.innerText = 1;
  qtCar = 1;
}

c('.fechar').addEventListener('click', () => fecharModal());

async function modalItens() {
  const itens = cs('.card a');
  const produtos = await fetchProdutos();

  itens.forEach((item, index) => {
    item.addEventListener('click', () => {
      modalProdutos.classList.add(active);
      c('.box--info').id = index;

      const jsonProdutos = produtos[index];
      c('.modal--itens img').src = jsonProdutos.imagem;
      c('.box--info h3').innerText = jsonProdutos.nome;
      c('.button-add .preco--itens').innerText = `R$ ${jsonProdutos.preco}`;
    });
  });

  //Fechar modal clicando fora
  c('.modalProdutos').addEventListener('click', (e) => {
    if (e.target === modalProdutos) {
      fecharModal();
    }
  });
}

// Adicionar ao carrinho
async function addCar() {
  c('.mais').addEventListener('click', () => {
    qtCar++;
    qtProduto.innerText = qtCar;
  });

  c('.menos').addEventListener('click', () => {
    if (qtCar > 0) {
      qtCar--;
      qtProduto.innerText = qtCar;
    }
  });

  // clicar para adicionar
  const jsonProdutos = await fetchProdutos();
  const produtos = cs('.card a');
  produtos.forEach((produto, index) => {
    produto.addEventListener('click', () => {
      console.log(jsonProdutos[index]);
    });
  });
}

function init() {
  showProdutos();
  addCar();
}
init();
