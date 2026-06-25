// ============================================================
// CONFIG EMAILJS — remplace par tes vraies clés
// Crée un compte sur https://www.emailjs.com (gratuit)
// Puis : Email Services > Add Service (Gmail, Outlook...)
// Puis : Email Templates > Create Template
// ============================================================
const EMAILJS_PUBLIC_KEY  = 'TouemtkaxiCd5AN7G';
const EMAILJS_SERVICE_ID  = 'service_lynqwdb';
const EMAILJS_TEMPLATE_ID = 'template_moev7ya';
const DISCORD_WEBHOOK     = 'https://canary.discord.com/api/webhooks/1519673722863358173/hbWkXn4QXkKi-9CxYT7fbsqtKkLhOZUSW5nP3Q1fN4JOFFm9Oq794EgLguGsd3rUhf3C';

// Affiche le récapitulatif panier
function loadSummary() {
  const cart = JSON.parse(localStorage.getItem('mizuro_cart') || '[]');
  const itemsEl = document.getElementById('summaryItems');
  const totalEl = document.getElementById('summaryTotal');

  if (!cart.length) {
    itemsEl.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;margin-top:12px">Aucun produit.<br><a href="boutique.html" style="color:var(--red)">← Voir la boutique</a></p>';
    totalEl.textContent = '0,00€';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const sub = item.price * item.qty;
    total += sub;
    return `<div class="summary-row">
      <span class="summary-name">${item.name}</span>
      <span class="summary-qty">x${item.qty}</span>
      <span class="summary-price">${fmt(sub)}</span>
    </div>`;
  }).join('');

  totalEl.textContent = fmt(total);
}

function fmt(n) { return n.toFixed(2).replace('.', ',') + '€'; }

// Génère le texte de la facture pour l'email
function buildInvoice(cart, orderId, date) {
  let lines = cart.map(i =>
    `• ${i.name}  x${i.qty}  =  ${fmt(i.price * i.qty)}`
  ).join('\n');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return `Numéro : ${orderId}\nDate : ${date}\n\n${lines}\n\n──────────────\nTOTAL : ${fmt(total)}`;
}

// Soumettre la commande
async function submitOrder(e) {
  e.preventDefault();

  const discord = document.getElementById('fDiscord').value.trim();
  const email   = document.getElementById('fEmail').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked');
  const message = document.getElementById('fMessage').value.trim();
  const cart    = JSON.parse(localStorage.getItem('mizuro_cart') || '[]');

  const psfCode = document.getElementById('fPsfCode') ? document.getElementById('fPsfCode').value.trim() : '';

  if (!payment) { showToast('⚠️ Choisis un moyen de paiement !'); return; }
  if (!cart.length) { showToast('⚠️ Ton panier est vide !'); return; }
  if (payment.value === 'Paysafecard' && !psfCode) { showToast('⚠️ Entre ton code Paysafecard !'); return; }

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  const orderId = 'MIZ-' + Date.now();
  const date    = new Date().toLocaleString('fr-FR');
  const total   = fmt(cart.reduce((s, i) => s + i.price * i.qty, 0));
  const invoice = buildInvoice(cart, orderId, date);

  // Paramètres envoyés au template EmailJS
  const templateParams = {
    to_email   : email,
    to_name    : discord,
    order_id   : orderId,
    order_date : date,
    payment    : payment.value,
    message    : message || '—',
    invoice    : invoice,
    total      : total,
    discord_link: 'https://discord.gg/pu9CcwT7fM',
    psf_code   : psfCode ? psfCode : '—',
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Envoie notification Discord webhook
    const webhookMsg = {
      embeds: [{
        title: '🛒 Nouvelle commande !',
        color: 0xe63946,
        fields: [
          { name: '👤 Discord', value: discord, inline: true },
          { name: '📧 Email', value: email, inline: true },
          { name: '💳 Paiement', value: payment.value, inline: true },
          { name: '🎫 Code PSF', value: psfCode || '—', inline: true },
          { name: '🧾 Commande', value: invoice.replace(/──────────────/g, '───────────'), inline: false },
          { name: '💰 Total', value: total, inline: true },
          { name: '🆔 ID', value: orderId, inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Mizuro Shop' }
      }]
    };
    fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookMsg)
    }).catch(() => {});

    // Sauvegarde locale
      const orders = JSON.parse(localStorage.getItem('mizuro_orders') || '[]');
      orders.push({ id: orderId, date, discord, email, payment: payment.value, cart, total });
      localStorage.setItem('mizuro_orders', JSON.stringify(orders));

      // Vide le panier
      localStorage.removeItem('mizuro_cart');

      // Succès
      if (document.getElementById('successName')) {
        document.getElementById('successName').textContent = discord;
        document.getElementById('successOverlay').style.display = 'flex';
      }

      // Redirige vers Stripe seulement si paiement Stripe
      if (payment.value === 'Stripe') {
        setTimeout(() => { window.location.href = 'https://buy.stripe.com/test_14A7sMeoBbI4fmc4DGabK00'; }, 2000);
      }

  } catch (err) {
    console.error(err);
    showToast('❌ Erreur envoi email. Vérifie ta config EmailJS.');
    btn.textContent = 'Confirmer la commande →';
    btn.disabled = false;
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

loadSummary();
