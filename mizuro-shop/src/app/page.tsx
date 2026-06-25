import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { featuredProducts } from '@/data/products'

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#e63946 1px, transparent 1px), linear-gradient(90deg, #e63946 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[#e63946]/8 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#aaaaaa] text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:border-[#e63946]/40 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse" />
            ⚡ Livraison instantanée · Paiement sécurisé
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-none">
            <span className="text-white">Miz</span>
            <span className="text-[#e63946]">uro</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#aaaaaa] text-lg sm:text-xl mb-10 font-medium">
            Bots Discord · Nitro · Members · Twitch · Support 24/7
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/boutique"
              className="group flex items-center gap-2 bg-[#e63946] hover:bg-[#ff4757] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-[0_8px_30px_rgba(230,57,70,0.4)] hover:-translate-y-0.5 active:scale-[0.98] text-base"
            >
              Commander maintenant
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <a
              href="https://discord.gg/mizuro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#7289da]/50 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-base"
            >
              <svg className="w-5 h-5 text-[#7289da]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Rejoindre le Discord
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-14 pt-10 border-t border-[#2a2a2a]">
            {[
              { value: '2 500+', label: 'Clients satisfaits' },
              { value: '99.9%', label: 'Disponibilité' },
              { value: '< 1min', label: 'Livraison moy.' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-white font-black text-xl sm:text-2xl">{stat.value}</div>
                <div className="text-[#aaaaaa] text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Paiements ────────────────────────────────────────── */}
      <section className="py-8 border-y border-[#2a2a2a] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <span className="text-[#aaaaaa] text-sm font-semibold uppercase tracking-widest">
              Paiements acceptés
            </span>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {[
                { name: 'PayPal', color: '#003087', bg: '#009cde' },
                { name: 'Stripe', color: '#635bff', bg: '#635bff' },
                { name: 'Paysafecard', color: '#00629b', bg: '#00629b' },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-xl"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: method.bg }}
                  />
                  <span className="text-white text-sm font-bold">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Best sellers ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-[#e63946] rounded-full" />
              <span className="text-[#e63946] text-xs font-bold uppercase tracking-[0.2em]">
                Meilleures ventes
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Nos produits populaires
            </h2>
            <p className="text-[#aaaaaa] mt-2 text-sm">
              Découvrez nos offres les plus appréciées par notre communauté
            </p>
          </div>
          <Link
            href="/boutique"
            className="hidden sm:flex items-center gap-2 text-[#e63946] hover:text-[#ff4757] text-sm font-semibold transition-colors duration-200 group"
          >
            Tout voir
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/boutique"
            className="flex items-center gap-2 text-[#e63946] text-sm font-semibold"
          >
            Voir tous les produits →
          </Link>
        </div>
      </section>

      {/* ── Trust section ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: '⚡',
              title: 'Livraison instantanée',
              desc: 'Vos produits digitaux sont livrés automatiquement en quelques secondes après le paiement.',
              color: 'from-yellow-500/10 to-orange-500/5',
              border: 'hover:border-yellow-500/30',
            },
            {
              icon: '🔒',
              title: 'Paiement 100% sécurisé',
              desc: 'Nous acceptons PayPal, Stripe et Paysafecard. Vos données sont protégées par chiffrement SSL.',
              color: 'from-green-500/10 to-emerald-500/5',
              border: 'hover:border-green-500/30',
            },
            {
              icon: '💬',
              title: 'Support 24/7',
              desc: 'Notre équipe est disponible à toute heure sur Discord pour répondre à toutes vos questions.',
              color: 'from-blue-500/10 to-indigo-500/5',
              border: 'hover:border-blue-500/30',
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`relative bg-gradient-to-br ${item.color} border border-[#2a2a2a] ${item.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-[#aaaaaa] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#e63946]/20 via-[#1a1a1a] to-[#e63946]/10 border border-[#e63946]/30 rounded-3xl p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎮</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Rejoignez la communauté Mizuro
              </h2>
              <p className="text-[#aaaaaa] mb-8 max-w-lg mx-auto">
                Plus de 2 500 membres nous font déjà confiance. Rejoignez notre Discord pour des offres exclusives et un support prioritaire.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://discord.gg/mizuro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#7289da] hover:bg-[#5b6eae] text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(114,137,218,0.4)] hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  Rejoindre le Discord
                </a>
                <Link
                  href="/boutique"
                  className="flex items-center gap-2 bg-[#e63946] hover:bg-[#ff4757] text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(230,57,70,0.4)] hover:-translate-y-0.5"
                >
                  Voir la boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
