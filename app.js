// ===== CART =====
let cart = JSON.parse(localStorage.getItem('mizuro_cart') || '[]');

function saveCart() { localStorage.setItem('mizuro_cart', JSON.stringify(cart)); }

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, qty: 1 }); }
  saveCart();
  updateCartUI();
  showToast('✅ ' + name + ' ajouté !');
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (!itemsEl || !totalEl) return;

  if (!cart.length) {
    itemsEl.innerHTML = '<p class="empty-cart">Ton panier est vide</p>';
    totalEl.textContent = '0,00€';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const sub = item.price * item.qty;
    total += sub;
    const safe = item.name.replace(/'/g, "\\'");
    return `<div class="cart-item">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty('${safe}',-1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${safe}',1)">+</button>
      </div>
      <div class="cart-item-price">${fmt(sub)}</div>
    </div>`;
  }).join('');
  totalEl.textContent = fmt(total);
}

function fmt(n) { return n.toFixed(2).replace('.', ',') + '€'; }

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (!cart.length) { showToast('⚠️ Panier vide !'); return; }
  window.location.href = 'commander.html';
}

// ===== TOAST =====
let toastTm;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTm);
  toastTm = setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== CATEGORY FILTER =====
function filterCat(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // fonctionne pour .card (index) et .b-card (boutique) et .prod-group
  document.querySelectorAll('.card, .b-card, .prod-group').forEach(el => {
    if (cat === 'all' || el.dataset.cat === cat) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });
}

// ===== PRODUCTS DATA =====
const products = {
  'mizuro-coins': {
    title: 'Mizuro Coins',
    items: [
      { label: '1 mois',  price: 2.00 },
      { label: '2 mois',  price: 4.00 },
      { label: '3 mois',  price: 6.00 },
      { label: '5 mois',  price: 7.00 },
      { label: '10 mois', price: 10.00 },
      { label: '12 mois', price: 12.30 },
      { label: 'Lifetime',price: 20.00, featured: true },
    ]
  },
  'gestion-v2': {
    title: 'Gestion V2',
    items: [
      { label: '1 mois',  price: 2.00 },
      { label: '2 mois',  price: 4.00 },
      { label: '3 mois',  price: 6.00 },
      { label: '5 mois',  price: 7.00 },
      { label: '10 mois', price: 10.00 },
      { label: '12 mois', price: 12.30 },
      { label: 'Lifetime',price: 20.00, featured: true },
    ]
  },
  'nitro-base': {
    title: 'Nitro De Base',
    items: [
      { label: '1 mois', price: 3.14 },
      { label: '1 an',   price: 31.55, featured: true },
    ]
  },
  'nitro-boost': {
    title: 'Nitro Boost',
    items: [
      { label: '1 mois',  price: 7.29 },
      { label: '3 mois',  price: 31.56 },
      { label: '1 an',    price: 72.14, featured: true },
    ]
  },
  'deco': {
    title: 'Déco Discord',
    note: '📩 Voir dans votre ticket pour les détails',
    items: [
      { label: 'Pack 1', price: 1.98, oldPrice: '4,99€' },
      { label: 'Pack 2', price: 4.16, oldPrice: '8,99€' },
    ]
  },
  'boosts': {
    title: 'Server Boosts',
    note: '📩 Autres quantités disponibles via ticket',
    items: [
      { label: '14 Boosts · 1 mois', price: 4.02, featured: true },
    ]
  },
  'members': {
    title: 'Members Discord',
    note: '📩 Autres quantités disponibles via ticket',
    items: [
      { label: '100 Online',   price: 1.27 },
      { label: '200 Online',   price: 2.80 },
      { label: '300 Online',   price: 3.48 },
      { label: '400 Online',   price: 4.27 },
      { label: '500 Online',   price: 5.64 },
      { label: '600 Online',   price: 7.11 },
      { label: '800 Online',   price: 8.11 },
      { label: '900 Offline',  price: 9.74 },
      { label: '1000 Offline', price: 10.24, featured: true },
      { label: '1500 Online',  price: 12.00 },
      { label: '2500 Offline', price: 15.98 },
      { label: '5000 Online',  price: 37.79 },
      { label: '10000 Online', price: 75.29 },
    ]
  },
  'gung': {
    title: 'Vues Gung.lol',
    items: [
      { label: '1 000 vues',   price: 9.65 },
      { label: '5 000 vues',   price: 46.09 },
      { label: '10 000 vues',  price: 88.93 },
      { label: '25 000 vues',  price: 206.25 },
      { label: '50 000 vues',  price: 376.26 },
      { label: '100 000 vues', price: 650.00, featured: true },
    ]
  },
  'twitch-follow': {
    title: 'Follow Twitch',
    items: [
      { label: '1 000 follows', price: 2.50 },
      { label: '2 000 follows', price: 3.50 },
      { label: '3 000 follows', price: 4.50 },
      { label: '4 000 follows', price: 5.50 },
      { label: '5 000 follows', price: 6.50 },
      { label: '6 000 follows', price: 7.50 },
      { label: '7 000 follows', price: 8.50 },
      { label: '8 000 follows', price: 8.50 },
      { label: '9 000 follows', price: 10.50, featured: true },
    ]
  },
  'twitch-compte': {
    title: 'Comptes Twitch',
    items: [
      { label: 'Compte 2k follow',  price: 3.10 },
      { label: 'Compte 5k follow',  price: 5.10 },
      { label: 'Compte 10k follow', price: 8.10, featured: true },
      { label: 'Compte 20k follow', price: 13.10 },
      { label: 'Compte 30k follow', price: 19.10 },
      { label: 'Compte 50k follow', price: 25.10 },
    ]
  },
};

// ===== MODAL =====
function openModal(id) {
  const product = products[id];
  if (!product) return;

  document.getElementById('modalTitle').textContent = product.title;

  const rows = product.items.map(item => {
    const priceHtml = item.oldPrice
      ? `<s style="color:var(--muted);font-size:0.8rem;margin-right:4px">${item.oldPrice}</s><span class="row-price" style="color:#22c55e">${fmt(item.price)}</span>`
      : `<span class="row-price">${fmt(item.price)}</span>`;

    const safeName = (product.title + ' - ' + item.label).replace(/'/g, "\\'");
    return `<div class="price-row ${item.featured ? 'featured' : ''}" onclick="addToCart('${safeName}', ${item.price})">
      <span class="row-label">${item.label}</span>
      ${priceHtml}
      <button class="add-btn">+</button>
    </div>`;
  }).join('');

  const note = product.note ? `<p class="modal-note">${product.note}</p>` : '';
  document.getElementById('modalBody').innerHTML = `<div class="price-rows">${rows}</div>${note}`;

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== INIT =====
updateCartUI();
