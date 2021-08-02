async function app() {
  const response = await fetch('js/produtos.json');
  const produtos = await response.json();

  const c = (el) => document.querySelector(el);
  const cs = (el) => document.querySelectorAll(el);
  const containerModal = c('.container--modal');
  const active = 'active';
  const qtItens = c('.qt-itens');
  const buttonQt = c('.button-qt');

  let countItens = 1;

  // Colocando os produtos no dom
  const containerProdutos = c('.container--produtos');
  produtos.forEach((produto, index) => {
    const produtosItens = c('.models .produtos-itens').cloneNode(true);
    produtosItens.id = index;

    const img = produtosItens.querySelector('.produto-itens--img img');
    const nome = produtosItens.querySelector('.produto-itens--name h3');
    const preco = produtosItens.querySelector('.produto-itens--price p');
    const desc = produtosItens.querySelector('.produto-itens--desc p');

    img.src = produto.imagem;
    nome.innerText = produto.nome;
    preco.innerText = `R$ ${produto.preco}`;
    desc.innerText = produto.descricao;

    containerProdutos.appendChild(produtosItens);
  });

  function areaModalProdutos() {
    const itens = cs('.container--produtos .produtos-itens a');

    // Abrir modal com o produto
    itens.forEach((item, index) => {
      const produtosJSON = produtos[index];
      item.addEventListener('click', (e) => {
        e.preventDefault();
        containerModal.classList.add(active);
        c('.modal-img-item img').src = produtosJSON.imagem;
        c('.modal-nome-item h3').innerText = produtosJSON.nome;
        c('.modal-desc-item p').innerText = produtosJSON.descricao;
        c('.modal-preco-item').innerText = `R$ ${produtosJSON.preco}`;

        function calcPrecosItens(qt) {
          qtItens.innerText = qt;
          buttonQt.innerText = qt;

          const precoLimpo = Number(produtosJSON.preco.replace(',', '.'));
          const total = precoLimpo * qt;

          c('.modal-preco-item').innerText = total.toLocaleString('PT-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        }

        // area adicionar ao carrinho
        c('.menos').addEventListener('click', () => {
          if (countItens > 1) {
            countItens--;
            calcPrecosItens(countItens);
          }
        });

        c('.mais').addEventListener('click', () => {
          countItens++;
          calcPrecosItens(countItens);
        });
      });
    });

    // Função para fechar o modal
    function fecharModal() {
      containerModal.classList.remove(active);
      countItens = 1;
      qtItens.innerText = 1;
      buttonQt.innerText = 1;
    }

    // fechar modal
    c('.fechar--modal').addEventListener('click', fecharModal);
    containerModal.addEventListener('click', (e) => {
      if (e.target === containerModal) {
        fecharModal();
      }
    });
  }

  function init() {
    areaModalProdutos();
  }
  init();
}
app();
