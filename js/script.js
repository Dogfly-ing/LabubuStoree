// ============ Mensagem de boas-vindas ============
if (!localStorage.getItem('visitouLabubu')) {
  alert('👋 Bem-vindo à Labubu Store!');
  localStorage.setItem('visitouLabubu', 'sim');
}

// ============ Botão "Voltar ao topo" ============
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.textContent = "↑";
topBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: none;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  font-size: 20px;
  z-index: 9999;
`;
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============ Rolagem suave nos links ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// ============ Filtro de produtos ============
const campoFiltro = document.getElementById('filtro');
if (campoFiltro) {
  campoFiltro.addEventListener('input', () => {
    const texto = campoFiltro.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const nome = card.querySelector('.product-title').textContent.toLowerCase();
      card.style.display = nome.includes(texto) ? 'block' : 'none';
    });
  });
}

// ============ Carrinho de compras ============
const botoesCompra = document.querySelectorAll('.buy-btn');
botoesCompra.forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.closest('.product-card').querySelector('.product-title').textContent;
    const preco = btn.closest('.product-card').querySelector('.current-price').textContent;
    const produto = { nome, preco };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho 🛒`);
  });
});

// ============ Mostrar carrinho no console (teste) ============
console.log("🛒 Carrinho atual:", JSON.parse(localStorage.getItem('carrinho')) || []);
