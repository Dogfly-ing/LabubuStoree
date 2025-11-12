// ============ Mensagem de boas-vindas ============
window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("visitouLabubu")) {
    alert("👋 Bem-vindo à Labubu Store!");
    localStorage.setItem("visitouLabubu", "sim");
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
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;
    font-size: 20px;
    z-index: 9999;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ============ Rolagem suave nos links ============
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        const alvo = document.querySelector(href);
        if (alvo) alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ============ Filtro de produtos ============
  // (Adiciona um campo automaticamente no topo da seção de produtos)
  const produtosSecao = document.querySelector("#products");
  if (produtosSecao) {
    const filtroDiv = document.createElement("div");
    filtroDiv.style.textAlign = "center";
    filtroDiv.style.marginBottom = "2rem";
    filtroDiv.innerHTML = `
      <input id="filtro" type="text" placeholder="Buscar produto..." 
        style="padding: 0.8rem 1rem; width: 80%; max-width: 400px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;">
    `;
    produtosSecao.prepend(filtroDiv);

    const campoFiltro = filtroDiv.querySelector("#filtro");
    campoFiltro.addEventListener("input", () => {
      const texto = campoFiltro.value.toLowerCase();
      document.querySelectorAll(".product-card").forEach(card => {
        const nome = card.querySelector(".product-title").textContent.toLowerCase();
        card.style.display = nome.includes(texto) ? "block" : "none";
      });
    });
  }

  // ============ Carrinho de compras ============
  const botoesCompra = document.querySelectorAll(".buy-btn");
  botoesCompra.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const card = btn.closest(".product-card");
      const nome = card.querySelector(".product-title").textContent;
      const preco = card.querySelector(".current-price").textContent;
      const produto = { nome, preco };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      alert(`✅ ${nome} foi adicionado ao carrinho 🛒`);
      console.log("🛒 Carrinho atual:", carrinho);
    });
  });

  // ============ Debug ============
  console.log("✅ Labubu Store script carregado!");
});
