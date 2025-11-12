// Labubu Store — script.js (versão completa e com debug)
// Cola inteiro no arquivo js/script.js

console.log("→ script.js carregado (início)");

// Use apenas um DOMContentLoaded para garantir que o HTML já existe
window.addEventListener("DOMContentLoaded", () => {
  console.log("→ DOM carregado");

  // ============ Mensagem de boas-vindas (sempre aparece) ============
  (function mostrarBoasVindas() {
    // Cria o overlay/modal
    const overlay = document.createElement("div");
    overlay.id = "labubu-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
      background: #fff;
      color: #222;
      padding: 2rem 2.5rem;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 420px;
      width: 90%;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      animation: labubu-aparecer 0.28s ease-out;
    `;
    modal.innerHTML = `
      <h2 style="margin-bottom:0.6rem; color: var(--accent, #ff4081);">🌸 Bem-vindo à Labubu Store!</h2>
      <p style="margin-bottom:1rem; color: #444;">Ficamos felizes em te ver por aqui! Dá uma olhada nos nossos produtos em destaque e aproveite as ofertas.</p>
      <div style="display:flex; gap:0.6rem; justify-content:center; margin-top:0.6rem;">
        <button id="fecharBoasVindas" style="background: var(--accent, #ff4081); color:white; border:none; padding:0.6rem 1rem; border-radius:8px; cursor:pointer; font-weight:700;">Começar 🛍️</button>
        <button id="fecharEnaoMostrar" style="background:transparent; color:#666; border:1px solid #ddd; padding:0.6rem 1rem; border-radius:8px; cursor:pointer;">Fechar</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // adiciona keyframes (aparecer)
    const style = document.createElement("style");
    style.textContent = `
      @keyframes labubu-aparecer {
        from { transform: translateY(8px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    // eventos
    document.getElementById("fecharBoasVindas").addEventListener("click", () => {
      overlay.remove();
    });
    document.getElementById("fecharEnaoMostrar").addEventListener("click", () => {
      overlay.remove();
    });
  })();

  // ============ Botão "Voltar ao topo" ============
  (function criarTopBtn() {
    const topBtn = document.createElement("button");
    topBtn.id = "topBtn";
    topBtn.title = "Voltar ao topo";
    topBtn.textContent = "↑";
    topBtn.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      display: none;
      align-items: center;
      justify-content: center;
      background: var(--primary, #4361ee);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      cursor: pointer;
      font-size: 20px;
      z-index: 9999;
      box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    `;
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  // ============ Rolagem suave nos links ============
  (function smoothLinks() {
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
  })();

  // ============ Filtro de produtos (cria o campo automaticamente) ============
  (function criarFiltro() {
    const produtosSecao = document.querySelector("#products");
    if (!produtosSecao) return;
    // evita criar duas vezes
    if (document.getElementById("filtro")) return;

    const filtroDiv = document.createElement("div");
    filtroDiv.style.textAlign = "center";
    filtroDiv.style.marginBottom = "2rem";
    filtroDiv.innerHTML = `
      <input id="filtro" type="text" placeholder="Buscar produto..." 
        style="padding: 0.8rem 1rem; width: 80%; max-width: 420px; border-radius: 8px; border: 1px solid #ddd; font-size: 1rem;">
    `;
    produtosSecao.prepend(filtroDiv);

    const campoFiltro = filtroDiv.querySelector("#filtro");
    campoFiltro.addEventListener("input", () => {
      const texto = campoFiltro.value.toLowerCase();
      document.querySelectorAll(".product-card").forEach(card => {
        const tituloEl = card.querySelector(".product-title");
        const nome = tituloEl ? tituloEl.textContent.toLowerCase() : "";
        card.style.display = nome.includes(texto) ? "block" : "none";
      });
    });
  })();

  // ============ Carrinho de compras (localStorage) ============
  (function carrinhoLocal() {
    // delegação: caso itens sejam adicionados dinamicamente no futuro
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest(".buy-btn");
      if (!btn) return;
      e.preventDefault();
      const card = btn.closest(".product-card");
      if (!card) return;

      const tituloEl = card.querySelector(".product-title");
      const precoEl = card.querySelector(".current-price");
      const nome = tituloEl ? tituloEl.textContent.trim() : "Produto";
      const preco = precoEl ? precoEl.textContent.trim() : "R$ 0,00";
      const produto = { nome, preco, addedAt: Date.now() };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      // feedback visual simples
      btn.textContent = "✔ Adicionado";
      setTimeout(() => btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar Agora', 1200);

      console.log("🛒 Adicionado:", produto);
    });
  })();

  console.log("→ Labubu Store script inicializado");
}); // fim DOMContentLoaded
