'use client'

import { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart, closeCart, totalPrice } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeCart])

  // Lock body scroll when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [state.isOpen])

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111111] border-l border-[#2a2a2a] z-50 flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div>
            <h2 className="text-white font-bold text-lg">Mon Panier</h2>
            <p className="text-[#aaaaaa] text-xs mt-0.5">
              {state.items.length === 0
                ? 'Aucun article'
                : `${state.items.reduce((s, i) => s + i.quantity, 0)} article${state.items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e63946] text-[#aaaaaa] hover:text-white transition-all duration-200"
            aria-label="Fermer le panier"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-3xl mb-4">
                🛒
              </div>
              <p className="text-white font-semibold mb-1">Votre panier est vide</p>
              <p className="text-[#aaaaaa] text-sm">Ajoutez des produits depuis la boutique</p>
              <button
                onClick={closeCart}
                className="mt-6 text-[#e63946] text-sm font-semibold hover:underline"
              >
                Continuer mes achats →
              </button>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 group hover:border-[#e63946]/30 transition-colors duration-200"
              >
                {/* Emoji */}
                <div className="w-11 h-11 rounded-xl bg-[#e63946]/10 flex items-center justify-center text-xl flex-shrink-0">
                  {item.product.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{item.product.name}</p>
                  <p className="text-[#e63946] text-sm font-bold mt-0.5">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2a2a2a] hover:bg-[#e63946]/20 text-[#aaaaaa] hover:text-white transition-all duration-150 text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="text-white text-sm font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2a2a2a] hover:bg-[#e63946]/20 text-[#aaaaaa] hover:text-white transition-all duration-150 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#aaaaaa] hover:text-[#e63946] hover:bg-[#e63946]/10 transition-all duration-150"
                  aria-label="Supprimer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#2a2a2a] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#aaaaaa] text-sm">Sous-total</span>
              <span className="text-white font-black text-xl">{totalPrice.toFixed(2)}€</span>
            </div>

            <button className="w-full bg-[#e63946] hover:bg-[#ff4757] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(230,57,70,0.4)] active:scale-[0.98]">
              Commander maintenant →
            </button>

            <button
              onClick={clearCart}
              className="w-full text-[#aaaaaa] hover:text-[#e63946] text-sm font-medium transition-colors duration-200"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  )
}
