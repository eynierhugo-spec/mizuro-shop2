import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { products } from '@/data/products'
import ProductDetailClient from './ProductDetailClient'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return { title: 'Produit introuvable' }
  return {
    title: `${product.name} — Mizuro Shop`,
    description: product.description,
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return <ProductDetailClient product={product} related={related} />
}
