'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/data/products'

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('cat') || 'Tous'
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default')

  const filtered = useMemo(() => {
    let list = [...products]

    // Category filter
    if (activeCategory !== 'Tous') {
      list = list.filter((p) => p.category === activeCategory)
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)

    return list
  }, [activeCategory, search, sortBy])

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-6 bg-[#e63946] rounded-full" />
          <span className="text-[#e63946] text-xs font-bold uppercase tracking-[0.2em]">Catalogue</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Boutique</h1>
        <p className="text-[#aaaaaa] mt-2">
          {filtered.length} produit{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#2a2a2a] focus:border-[#e63946] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#aaaaaa] outline-none transition-colors duration-200"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-[#111111] border border-[#2a2a2a] focus:border-[#e63946] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-200 cursor-pointer"
        >
          <option value="default">Trier par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[#e63946] border-[#e63946] text-white shadow-[0_4px_15px_rgba(230,57,70,0.3)]'
                : 'bg-[#111111] border-[#2a2a2a] text-[#aaaaaa] hover:border-[#e63946]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-white font-bold text-lg mb-2">Aucun produit trouvé</h3>
          <p className="text-[#aaaaaa] text-sm">
            Essayez de modifier votre recherche ou de changer de catégorie.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setActiveCategory('Tous')
            }}
            className="mt-6 text-[#e63946] text-sm font-semibold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BoutiqueContent />
    </Suspense>
  )
}
