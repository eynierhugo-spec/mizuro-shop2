'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-[#e63946] transition-colors duration-200">
              Mizuro
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold bg-[#e63946] text-white px-2 py-0.5 rounded-full">
              SHOP
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/boutique"
              className="text-[#aaaaaa] hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Boutique
            </Link>
            <a
              href="https://discord.gg/mizuro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aaaaaa] hover:text-[#7289da] transition-colors duration-200 text-sm font-medium flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Discord
            </a>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e63946] hover:bg-[#e63946]/10 transition-all duration-200 group"
              aria-label="Ouvrir le panier"
            >
              <svg
                className="w-5 h-5 text-[#aaaaaa] group-hover:text-[#e63946] transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[#e63946] text-white text-[10px] font-bold rounded-full px-1 animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
