import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2a2a2a] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-black text-white">Mizuro</span>
              <span className="text-xs font-bold bg-[#e63946] text-white px-2 py-0.5 rounded-full">SHOP</span>
            </Link>
            <p className="text-[#aaaaaa] text-sm leading-relaxed">
              La référence des produits digitaux. Bots Discord, Nitro, Members, Twitch et bien plus encore.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://discord.gg/mizuro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#7289da] hover:bg-[#7289da]/10 text-[#aaaaaa] hover:text-[#7289da] transition-all duration-200"
                aria-label="Discord"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/boutique', label: 'Boutique' },
                { href: '/boutique?cat=Discord', label: 'Discord' },
                { href: '/boutique?cat=Twitch', label: 'Twitch' },
                { href: '/boutique?cat=Bots', label: 'Bots' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#aaaaaa] hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Garanties</h3>
            <div className="space-y-3">
              {[
                { icon: '⚡', title: 'Livraison instantanée', desc: 'La plupart des produits sont livrés immédiatement' },
                { icon: '🔒', title: 'Paiement sécurisé', desc: 'PayPal, Stripe, Paysafecard' },
                { icon: '💬', title: 'Support 24/7', desc: 'Notre équipe est disponible en permanence' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-[#aaaaaa] text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#aaaaaa] text-sm">© 2025 Mizuro Shop — Tous droits réservés</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#aaaaaa] text-xs bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
              ⚡ Instantané
            </span>
            <span className="flex items-center gap-1.5 text-[#aaaaaa] text-xs bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
              🔒 Sécurisé
            </span>
            <span className="flex items-center gap-1.5 text-[#aaaaaa] text-xs bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
              💬 Support 24/7
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
