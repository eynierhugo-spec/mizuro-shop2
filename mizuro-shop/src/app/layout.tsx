import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Cart from '@/components/Cart'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mizuro Shop — Produits Digitaux',
  description:
    'Boutique de produits digitaux : Discord Bots, Nitro, Members, Twitch followers et plus encore. Livraison instantanée, paiement sécurisé.',
  keywords: 'discord, nitro, bot discord, twitch, followers, members, produits digitaux',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        <CartProvider>
          <Navbar />
          <Cart />
          <main className="pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
