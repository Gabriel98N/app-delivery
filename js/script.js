const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const ce = (el) => document.createElement(el);

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
    const tempoEntrega = cloneProduto.querySelector('.tempo--entrega p');
    const precoProduto = cloneProduto.querySelector('.preco--produto p');

    img.src = produto.imagem;
    nomeProduto.innerText = produto.nome;
    tempoEntrega.innerText = `${produto.tempo}`;
    precoProduto.innerText = `R$ ${produto.preco}`;

    boxCard.appendChild(cardProduto);
  });
  modalItens();
}

// Função para fechar o modal
function fecharModal() {
  c('.modalProdutos').style.display = 'none';
}

c('.fechar').addEventListener('click', () => fecharModal());

async function modalItens() {
  const itens = cs('.card a');
  const produtos = await fetchProdutos();

  itens.forEach((item, index) => {
    item.addEventListener('click', () => {
      c('.modalProdutos').style.display = 'flex';

      const jsonProdutos = produtos[index];
      c('.modal--itens img').src = jsonProdutos.imagem;
      c('.box--info h3').innerText = jsonProdutos.nome;
      c('.button-add .preco--itens').innerText = `R$ ${jsonProdutos.preco}`;
    });
  });
}

function init() {
  showProdutos();
}
init();
