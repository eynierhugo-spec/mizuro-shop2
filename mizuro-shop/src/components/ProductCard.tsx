'use client'

import Link from 'next/link'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

const badgeStyles: Record<string, string> = {
  Populaire: 'bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/30',
  Promo: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  Nouveau: 'bg-green-500/20 text-green-400 border border-green-500/30',
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 h-full flex flex-col transition-all duration-300 hover:border-[#e63946]/50 hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] hover:scale-[1.02] hover:-translate-y-1 cursor-pointer">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Emoji / Icon */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 ${
            product.emojiColor === 'purple'
              ? 'bg-purple-500/20'
              : 'bg-[#e63946]/10 group-hover:bg-[#e63946]/20'
          } transition-colors duration-200`}
        >
          {product.emoji}
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#e63946] transition-colors duration-200 pr-14">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-[#aaaaaa] text-xs mb-4">{product.category}</p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2a2a2a]">
          <div>
            {product.originalPrice && (
              <span className="text-[#aaaaaa] text-xs line-through mr-1">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
            <span className="text-white font-black text-lg">{product.price.toFixed(2)}€</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-[#e63946] hover:bg-[#ff4757] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_15px_rgba(230,57,70,0.4)] active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        </div>
      </div>
    </Link>
  )
}
